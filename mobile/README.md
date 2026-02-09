# OffPeak Mobile App

React Native mobile application for OffPeak - Travel Intelligence Platform

## Setup

1. Install dependencies:
```bash
cd mobile
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on iOS:
```bash
npm run ios
```

4. Run on Android:
```bash
npm run android
```

## Configuration

- Update the API endpoint in `src/services/api.js` to point to your backend server
- For local development, ensure your backend is running on `http://localhost:3001`

## Features

- Origin and date selection
- Flexibility customization (weather risk, crowd tolerance)
- Destination recommendations with savings calculations
- Trade-off visualization
- Deep linking to booking platforms
