# OffPeak - Complete Setup Guide

This guide will help you set up and run the complete OffPeak MVP prototype on localhost.

## Project Structure

```
OffPeak/
├── mobile/                 # React Native frontend
│   ├── src/
│   │   ├── screens/       # UI screens (Origin, Flexibility, Results)
│   │   └── services/      # API client
│   ├── App.js
│   ├── package.json
│   └── README.md
│
├── backend/               # Node.js/Express API
│   ├── src/
│   │   ├── routes/        # API endpoints
│   │   ├── services/      # Business logic
│   │   └── data/          # Destination & seasonality data
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── README.md              # MVP specification
```

## Prerequisites

- Node.js 18+ and npm
- Expo CLI (for React Native development)
- Optional: OpenAI API key for enhanced recommendations

## Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment (optional)
cp .env.example .env
# Edit .env and add your OpenAI API key if you have one

# Start the server
npm run dev
```

The backend will start on `http://localhost:3001`

Verify it's running: `curl http://localhost:3001/health`

### 2. Mobile App Setup

```bash
# Open a new terminal
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Start Expo development server
npm start
```

This will open the Expo DevTools in your browser.

### 3. Running the App

**Option A: iOS Simulator (macOS only)**
```bash
npm run ios
```

**Option B: Android Emulator**
```bash
npm run android
```

**Option C: Physical Device**
1. Install "Expo Go" app from App Store / Play Store
2. Scan the QR code shown in terminal/browser
3. App will load on your device

**Option D: Web (for testing)**
```bash
npm run web
```

## How It Works

### User Flow

1. **Screen 1: Origin & Timing**
   - Enter departure city
   - Select travel month
   - Set flexibility (± weeks) and trip length

2. **Screen 2: Preferences**
   - Adjust weather risk tolerance
   - Set crowd tolerance
   - Review trip summary

3. **Screen 3: Results**
   - View top 5 destinations ranked by value
   - See savings percentage vs peak season
   - Review trade-offs (rain risk, crowds, flights)
   - Tap to explore booking options

### Core Algorithm

The backend implements the first-principles approach from the MVP:

```
Value Score = (Peak Cost - Window Cost) / Peak Cost

Risk Penalty = 
  (Weather Risk × (1 - User Weather Tolerance) × 0.2) +
  (Crowd Level × (1 - User Crowd Tolerance) × 0.1)
  
Adjusted Value = Value Score × (1 - Risk Penalty)
```

Destinations are:
- Filtered to show only >20% savings
- Sorted by adjusted value score
- Limited to top 5 recommendations

## API Configuration

The mobile app connects to the backend via the API service.

**For local development:**
- iOS Simulator: `http://localhost:3001/api`
- Android Emulator: `http://10.0.2.2:3001/api`
- Physical Device: `http://YOUR_IP:3001/api`

Edit `mobile/src/services/api.js` to change the backend URL:

```javascript
const API_BASE_URL = 'http://localhost:3001/api';
```

## Optional: OpenAI Integration

To enable AI-enhanced destination explanations:

1. Get an OpenAI API key from https://platform.openai.com/
2. Add to `backend/.env`:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```
3. Restart the backend server

The backend will automatically use AI to generate more contextual explanations for destinations when the API key is present.

## Data Customization

### Adding Destinations

Edit `backend/src/data/destinations.js`:

```javascript
{
  id: 'country-city',
  country: 'Country Name',
  city: 'City Name',
  baseCost: 1000,      // Base trip cost in EUR
  peakCost: 1800,      // Peak season cost in EUR
  region: 'Region',
}
```

### Customizing Seasonality

Edit `backend/src/data/seasonality.js`:

```javascript
'country-city': {
  January: {
    season: 'offpeak',        // 'peak' | 'shoulder' | 'offpeak'
    priceMultiplier: 0.65,    // Multiplier vs baseCost
    rainRisk: 0.25,           // 0-1 probability
    crowdLevel: 0.3,          // 0-1 density
    flightReliability: 'Good',
    reason: 'Explanation of seasonality'
  },
  // ... more months
}
```

## Troubleshooting

### Backend won't start
- Check Node.js version: `node --version` (should be 18+)
- Ensure port 3001 is available
- Check for syntax errors in .env file

### Mobile app can't connect to backend
- Verify backend is running: `curl http://localhost:3001/health`
- Check API_BASE_URL in `mobile/src/services/api.js`
- For Android emulator, use `http://10.0.2.2:3001/api`
- For physical device, ensure phone and computer are on same WiFi
- Use your computer's IP address: `http://192.168.x.x:3001/api`

### Expo issues
- Clear cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Update Expo: `npm install expo@latest`

### OpenAI integration not working
- Verify API key is correct in `.env`
- Check OpenAI account has credits
- Review backend console for error messages
- Backend will fall back to default explanations if AI fails

## Development Tips

### Hot Reload
- Backend: Using nodemon, changes auto-reload
- Mobile: Shake device or press `r` in terminal to reload

### Debugging
- Backend logs appear in terminal
- Mobile: Shake device and select "Debug Remote JS"
- Use React Native Debugger for better dev experience

### Testing API Directly

```bash
curl -X POST http://localhost:3001/api/destinations \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "Berlin",
    "month": "September",
    "flexWeeks": 2,
    "tripLength": 7,
    "weatherRisk": 0.5,
    "crowdTolerance": 0.5
  }'
```

## Next Steps

### Immediate Enhancements
1. Add more destinations to the database
2. Refine seasonality data based on research
3. Implement deep linking to booking platforms
4. Add loading states and error handling

### Phase 2 Features (from MVP)
- User accounts and saved searches
- Price alerts
- Real-time flight API integration
- Hotel price scraping
- Weather API integration
- Analytics and usage tracking

## Production Deployment

### Backend
- Deploy to Railway, Render, or AWS
- Set environment variables in hosting platform
- Enable CORS for your mobile app domain
- Use production Node.js settings

### Mobile App
- Build with EAS Build: `eas build`
- Submit to App Store / Play Store
- Update API_BASE_URL to production endpoint
- Configure app signing and provisioning

## Support & Documentation

- Backend API docs: `backend/README.md`
- Mobile app docs: `mobile/README.md`
- MVP specification: `README.md`

## License

MIT
