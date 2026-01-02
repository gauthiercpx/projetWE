# Tlcfront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.7.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

---

## 📦 Projet Web - Ajout de fonctionnalité Météo

### 🎯 Objectif du projet

Ajout d'une fonctionnalité météo sur l'application Doodle existante, permettant d'afficher les prévisions météorologiques pour chaque date de sondage.

### ✨ Fonctionnalités implémentées

#### 1. Service Météo (`weather.service.ts`)
- **API utilisée** : [Open-Meteo](https://open-meteo.com/) (API gratuite, sans clé requise)
- **Géocodage** : Utilisation de l'API de géocodage Open-Meteo pour convertir les noms de lieux en coordonnées GPS
- **Prévisions** : Récupération des prévisions météo sur 7 jours
- **Fonctionnalités** :
  - `fetchWeather(location?: string)` : Charge les données météo pour un lieu donné (Rennes par défaut)
  - `getWeatherForDate(date: Date)` : Retourne la météo pour une date spécifique
  - `geocodeLocation(location: string)` : Convertit un nom de lieu en coordonnées
  - `getCurrentLocation()` : Retourne le lieu actuel de la météo

#### 2. Affichage dans la page de réponse (`answer-poll.component`)

**Vue Tableau** :
- Affichage de la météo dans l'en-tête de chaque colonne
- Format : Emoji météo + Température (ex: "☀️ 14°C")
- Indication du lieu : "📍 Météo : [Lieu]"

**Vue Calendrier** :
- Météo affichée dans les en-têtes des jours
- Mise à jour dynamique lors du changement de semaine
- Format identique à la vue tableau

#### 3. Affichage dans la création de sondage (`create-poll-component`)

- Chargement de la météo dès la validation du lieu (étape 1)
- Affichage dans les en-têtes du calendrier de sélection des dates
- Indication du lieu utilisé pour les prévisions

#### 4. Codes météo et emojis

| Code météo | Description | Emoji |
|------------|-------------|-------|
| 0 | Ciel dégagé | ☀️ |
| 1-3 | Partiellement nuageux | ☁️ |
| 4-48 | Brouillard | 🌫️ |
| 49-67 | Pluie | 🌧️ |
| 68-77 | Neige | ❄️ |
| 78-82 | Pluie | 🌧️ |
| 83-86 | Neige | 🌨️ |
| 87+ | Orage | ⛈️ |

### 📂 Fichiers modifiés/créés

**Nouveaux fichiers** :
- `front/src/app/services/weather.service.ts` - Service de gestion de la météo
- `front/src/app/services/weather.service.spec.ts` - Tests unitaires

**Fichiers modifiés** :
- `front/src/app/answer-poll/answer-poll.component.ts` - Intégration météo (vue réponse)
- `front/src/app/answer-poll/answer-poll.component.html` - Affichage météo
- `front/src/app/create-poll-component/create-poll-component.component.ts` - Intégration météo (création)
- `front/src/app/create-poll-component/create-poll-component.component.html` - Affichage météo

### 🚀 Installation et lancement

```bash
# Installation des dépendances
cd front
npm install

# Lancement du frontend
npm start

# Lancement du backend (dans un autre terminal)
cd api
docker-compose up -d
.\mvnw.cmd quarkus:dev -Dnet.bytebuddy.experimental=true
```

### 🌐 APIs utilisées

1. **Open-Meteo Forecast API**
   - Endpoint : `https://api.open-meteo.com/v1/forecast`
   - Paramètres : latitude, longitude, daily (weathercode, temperature_2m_max)
   - Gratuit, sans clé API

2. **Open-Meteo Geocoding API**
   - Endpoint : `https://geocoding-api.open-meteo.com/v1/search`
   - Paramètres : name (lieu à rechercher)
   - Gratuit, sans clé API

### 🎨 Choix techniques

- **Pas de dépendances externes** : Utilisation de l'API Fetch native
- **Gestion du cache** : Les données météo sont stockées en mémoire dans le service
- **Géolocalisation intelligente** : Utilise le lieu du sondage, sinon Rennes par défaut
- **Gestion des erreurs** : Affichage silencieux en cas d'échec (pas de météo = pas d'affichage)
- **Prévisions limitées** : Seuls les 7 prochains jours sont affichés (limitation API gratuite)
- **Fuseau horaire local** : Utilisation des dates locales pour éviter les décalages

### 📊 Exemples d'utilisation

**Cas 1 : Sondage avec lieu spécifique**
- Lieu : "Paris"
- Résultat : Météo de Paris affichée, "📍 Météo : Paris"

**Cas 2 : Sondage sans lieu ou lieu invalide**
- Lieu : "" ou "VilleInexistante123"
- Résultat : Météo de Rennes, "📍 Météo : Rennes (défaut)"

**Cas 3 : Dates lointaines**
- Date : Dans 2 mois
- Résultat : Pas de météo affichée (au-delà de 7 jours)

### 📝 Notes importantes

- **Limitation 7 jours** : L'API gratuite ne fournit des prévisions que pour les 7 prochains jours
- **Géocodage** : Le nom du lieu doit être reconnu par l'API (villes, régions, pays)
- **Performance** : Un seul appel API par chargement de page
- **Compatibilité** : Fonctionne avec tous les navigateurs modernes supportant Fetch API

### 👤 Auteur

Projet réalisé dans le cadre du cours de Web Engineering - M1 2025-26

### 📄 Licence

Ce projet est une extension de l'application Doodle Student (https://github.com/barais/doodlestudent)

