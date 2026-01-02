import { Injectable } from '@angular/core';

export interface WeatherData {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
}

export interface WeatherForDate {
  temperature: number;
  weathercode: number;
  emoji: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private weatherData: WeatherData | null = null;
  private currentLocation: string = '';

  constructor() { }

  async fetchWeather(location?: string): Promise<void> {
    try {
      let latitude = 48.11;  // Rennes par défaut
      let longitude = -1.68;
      this.currentLocation = 'Rennes (défaut)';

      // Si un lieu est fourni, essayer de le géocoder
      if (location && location.trim()) {
        const geocodeResult = await this.geocodeLocation(location);
        if (geocodeResult) {
          latitude = geocodeResult.latitude;
          longitude = geocodeResult.longitude;
          this.currentLocation = geocodeResult.name;
        }
      }

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max&timezone=auto`
      );
      const data = await response.json();
      this.weatherData = data.daily;
    } catch (error) {
      console.error('Erreur lors de la récupération de la météo:', error);
    }
  }

  async geocodeLocation(location: string): Promise<{latitude: number, longitude: number, name: string} | null> {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=fr&format=json`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        return {
          latitude: result.latitude,
          longitude: result.longitude,
          name: result.name
        };
      }
    } catch (error) {
      console.error('Erreur lors du géocodage:', error);
    }
    return null;
  }

  getCurrentLocation(): string {
    return this.currentLocation;
  }

  getWeatherForDate(date: Date): WeatherForDate | null {
    if (!this.weatherData) return null;

    // Convertir la date en format YYYY-MM-DD en local (pas UTC)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const index = this.weatherData.time.indexOf(dateStr);
    if (index === -1) return null;

    const weathercode = this.weatherData.weathercode[index];
    return {
      temperature: Math.round(this.weatherData.temperature_2m_max[index]),
      weathercode: weathercode,
      emoji: this.getWeatherEmoji(weathercode)
    };
  }

  private getWeatherEmoji(code: number): string {
    if (code === 0) return '☀️';
    if (code <= 3) return '☁️';
    if (code <= 48) return '🌫️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '❄️';
    if (code <= 82) return '🌧️';
    if (code <= 86) return '🌨️';
    return '⛈️';
  }
}
