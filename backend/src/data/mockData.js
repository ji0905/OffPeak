/**
 * Mock Travel Data
 * In production, this would be replaced with real APIs:
 * - Skyscanner/Kiwi for flights
 * - Booking.com ADR for hotels
 * - NOAA/Meteostat for weather
 */

const destinationsFromEurope = [
  {
    name: 'Thailand · Phuket',
    bestWindow: '5–22 Sept',
    peakCost: 2030,
    offPeakCost: 1180,
    weather: 'Moderate',
    rainRisk: '18% of days',
    crowds: 'Low',
    flightReliability: 'Normal',
    whyThisWorks: 'Monsoon season lowers hotel demand while flight frequency remains stable. Beach activities still viable with strategic timing.'
  },
  {
    name: 'Greece · Santorini',
    bestWindow: '1–20 Oct',
    peakCost: 1850,
    offPeakCost: 980,
    weather: 'Good',
    rainRisk: '8% of days',
    crowds: 'Low',
    flightReliability: 'Good',
    whyThisWorks: 'Post-summer exodus creates massive price drops while weather remains excellent. Sea temperature still warm (22°C).'
  },
  {
    name: 'Portugal · Algarve',
    bestWindow: '15 Nov–10 Dec',
    peakCost: 1200,
    offPeakCost: 650,
    weather: 'Good',
    rainRisk: '12% of days',
    crowds: 'Very Low',
    flightReliability: 'Excellent',
    whyThisWorks: 'Mild winter climate with 17°C averages. Hotel occupancy drops 60% creating arbitrage opportunity for golf/hiking travelers.'
  },
  {
    name: 'Morocco · Marrakech',
    bestWindow: '10–28 Feb',
    peakCost: 980,
    offPeakCost: 580,
    weather: 'Excellent',
    rainRisk: '5% of days',
    crowds: 'Low',
    flightReliability: 'Good',
    whyThisWorks: 'Perfect climate window (20-25°C) between winter and hot season. Low European vacation demand creates pricing inefficiency.'
  },
  {
    name: 'Spain · Barcelona',
    bestWindow: '1–20 Nov',
    peakCost: 1100,
    offPeakCost: 720,
    weather: 'Good',
    rainRisk: '10% of days',
    crowds: 'Medium',
    flightReliability: 'Excellent',
    whyThisWorks: 'Post-cruise season gap. Museums and attractions fully operational with 40% shorter queues. Pleasant 18°C weather.'
  },
  {
    name: 'Croatia · Dubrovnik',
    bestWindow: '20 Sept–15 Oct',
    peakCost: 1400,
    offPeakCost: 750,
    weather: 'Excellent',
    rainRisk: '6% of days',
    crowds: 'Low',
    flightReliability: 'Good',
    whyThisWorks: 'Game of Thrones tourism fades post-summer. Sea still warm (21°C), dramatic price compression in accommodation.'
  },
  {
    name: 'Iceland · Reykjavik',
    bestWindow: '1–25 May',
    peakCost: 1650,
    offPeakCost: 980,
    weather: 'Moderate',
    rainRisk: '15% of days',
    crowds: 'Low',
    flightReliability: 'Normal',
    whyThisWorks: 'Shoulder season before midnight sun crowds. Northern lights still possible, spring awakening of nature. 40% hotel savings.'
  }
];

const destinationsFromUSA = [
  {
    name: 'Japan · Tokyo',
    bestWindow: '1–20 Feb',
    peakCost: 2800,
    offPeakCost: 1650,
    weather: 'Good',
    rainRisk: '7% of days',
    crowds: 'Low',
    flightReliability: 'Excellent',
    whyThisWorks: 'Pre-cherry blossom gap. Cold but clear weather (10°C). Hotel rates 45% below spring peak, ski season access intact.'
  },
  {
    name: 'Mexico · Tulum',
    bestWindow: '1–20 Oct',
    peakCost: 1850,
    offPeakCost: 1050,
    weather: 'Moderate',
    rainRisk: '20% of days',
    crowds: 'Very Low',
    flightReliability: 'Good',
    whyThisWorks: 'Post-hurricane season tail end. Brief rain showers don\'t disrupt beach time. Cenotes and ruins unaffected, hotels desperate for bookings.'
  },
  {
    name: 'Italy · Rome',
    bestWindow: '10 Nov–15 Dec',
    peakCost: 2200,
    offPeakCost: 1250,
    weather: 'Good',
    rainRisk: '11% of days',
    crowds: 'Low',
    flightReliability: 'Excellent',
    whyThisWorks: 'Between fall foliage and Christmas markets. Vatican and Colosseum accessible without 2-hour queues. Mild 15°C temps ideal for walking.'
  }
];

const getDestinationsData = (origin) => {
  // Simple origin detection
  const originLower = origin.toLowerCase();
  
  if (originLower.includes('us') || originLower.includes('america') || 
      originLower.includes('new york') || originLower.includes('los angeles')) {
    return destinationsFromUSA;
  }
  
  // Default to Europe
  return destinationsFromEurope;
};

module.exports = {
  getDestinationsData
};