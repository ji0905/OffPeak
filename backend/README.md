# OffPeak Backend API

Node.js/Express backend for the OffPeak Travel Intelligence platform.

## Features

- **Destination Recommendations**: Value-based destination ranking using first-principles seasonality arbitrage
- **Smart Scoring**: Calculates value scores based on price differentials, weather risk, and crowd tolerance
- **OpenAI Integration**: Optional AI-enhanced destination explanations
- **RESTful API**: Clean API for mobile/web frontend consumption

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env and add your OpenAI API key (optional)
```

3. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:3001`

## API Endpoints

### POST /api/destinations

Get destination recommendations based on user preferences.

**Request Body:**
```json
{
  "origin": "Berlin",
  "month": "September",
  "flexWeeks": 2,
  "tripLength": 7,
  "weatherRisk": 0.5,
  "crowdTolerance": 0.5
}
```

**Response:**
```json
[
  {
    "destination": "Thailand",
    "location": "Phuket",
    "bestWindow": "5-22 Sept",
    "savingsPercent": 42,
    "estimatedCost": "€1,180",
    "peakCost": "€2,030",
    "tradeOffs": {
      "rainRisk": 0.35,
      "rainDays": "35% of days",
      "crowds": 0.25,
      "flightReliability": "Normal"
    },
    "explanation": "Peak monsoon lowers hotel demand while flights remain frequent. Great value with 42% savings.",
    "valueScore": 0.378
  }
]
```

### GET /health

Health check endpoint.

## Architecture

### Core Algorithm

Follows the MVP first-principles approach:

```
Value Score = (Peak Cost - Window Cost) / Peak Cost
Risk Penalty = Weather Penalty + Crowd Penalty (max 30%)
Adjusted Value = Value Score × (1 - Risk Penalty)
```

### Data Structure

- **destinations.js**: Base destination data with pricing
- **seasonality.js**: Month-by-month seasonality data for each destination
- **destinationService.js**: Core business logic for value calculations
- **aiService.js**: Optional OpenAI integration for enhanced insights

## Environment Variables

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `OPENAI_API_KEY`: OpenAI API key for AI enhancements (optional)

## Future Enhancements

- Real-time flight price integration (Skyscanner/Amadeus)
- Hotel price scraping
- Weather API integration
- User accounts and saved searches
- Alert system for price drops
