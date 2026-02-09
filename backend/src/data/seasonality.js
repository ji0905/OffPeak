/**
 * Seasonality Data
 * Month-by-month seasonality information for each destination
 * 
 * Structure:
 * - season: 'peak' | 'shoulder' | 'offpeak'
 * - priceMultiplier: cost multiplier vs base (0.6 = 60% of base)
 * - rainRisk: probability (0-1)
 * - crowdLevel: crowd density (0-1)
 * - flightReliability: descriptive status
 * - reason: why this period has this pricing
 */

module.exports = {
  'thailand-phuket': {
    January: { season: 'peak', priceMultiplier: 1.0, rainRisk: 0.05, crowdLevel: 0.9, flightReliability: 'Excellent', reason: 'Peak dry season with perfect weather' },
    February: { season: 'peak', priceMultiplier: 0.95, rainRisk: 0.05, crowdLevel: 0.85, flightReliability: 'Excellent', reason: 'Still peak season, slight price drop' },
    March: { season: 'shoulder', priceMultiplier: 0.8, rainRisk: 0.08, crowdLevel: 0.6, flightReliability: 'Excellent', reason: 'End of high season, good weather continues' },
    April: { season: 'shoulder', priceMultiplier: 0.75, rainRisk: 0.12, crowdLevel: 0.5, flightReliability: 'Good', reason: 'Hot season begins, fewer tourists' },
    May: { season: 'offpeak', priceMultiplier: 0.65, rainRisk: 0.25, crowdLevel: 0.3, flightReliability: 'Good', reason: 'Pre-monsoon, significant savings' },
    June: { season: 'offpeak', priceMultiplier: 0.6, rainRisk: 0.3, crowdLevel: 0.25, flightReliability: 'Normal', reason: 'Monsoon starts, lowest prices' },
    July: { season: 'offpeak', priceMultiplier: 0.6, rainRisk: 0.32, crowdLevel: 0.3, flightReliability: 'Normal', reason: 'Mid-monsoon, very low demand' },
    August: { season: 'offpeak', priceMultiplier: 0.6, rainRisk: 0.35, crowdLevel: 0.3, flightReliability: 'Normal', reason: 'Monsoon continues, exceptional value' },
    September: { season: 'offpeak', priceMultiplier: 0.58, rainRisk: 0.35, crowdLevel: 0.25, flightReliability: 'Normal', reason: 'Peak monsoon, maximum savings' },
    October: { season: 'shoulder', priceMultiplier: 0.7, rainRisk: 0.22, crowdLevel: 0.4, flightReliability: 'Good', reason: 'Monsoon ending, prices still low' },
    November: { season: 'shoulder', priceMultiplier: 0.85, rainRisk: 0.1, crowdLevel: 0.65, flightReliability: 'Excellent', reason: 'Weather improving, demand rising' },
    December: { season: 'peak', priceMultiplier: 1.0, rainRisk: 0.05, crowdLevel: 0.95, flightReliability: 'Excellent', reason: 'Peak holiday season' },
  },
  'portugal-lisbon': {
    January: { season: 'offpeak', priceMultiplier: 0.65, rainRisk: 0.25, crowdLevel: 0.3, flightReliability: 'Good', reason: 'Winter tourism low, mild weather' },
    February: { season: 'offpeak', priceMultiplier: 0.68, rainRisk: 0.22, crowdLevel: 0.35, flightReliability: 'Good', reason: 'Still winter, warming up' },
    March: { season: 'shoulder', priceMultiplier: 0.75, rainRisk: 0.18, crowdLevel: 0.45, flightReliability: 'Excellent', reason: 'Spring begins, pleasant weather' },
    April: { season: 'shoulder', priceMultiplier: 0.82, rainRisk: 0.15, crowdLevel: 0.6, flightReliability: 'Excellent', reason: 'Beautiful spring weather' },
    May: { season: 'shoulder', priceMultiplier: 0.88, rainRisk: 0.1, crowdLevel: 0.7, flightReliability: 'Excellent', reason: 'Pre-summer, excellent conditions' },
    June: { season: 'peak', priceMultiplier: 0.95, rainRisk: 0.05, crowdLevel: 0.85, flightReliability: 'Excellent', reason: 'Summer starts, peak demand begins' },
    July: { season: 'peak', priceMultiplier: 1.0, rainRisk: 0.02, crowdLevel: 0.95, flightReliability: 'Excellent', reason: 'Peak summer season' },
    August: { season: 'peak', priceMultiplier: 1.0, rainRisk: 0.02, crowdLevel: 0.95, flightReliability: 'Excellent', reason: 'Hottest month, maximum tourism' },
    September: { season: 'shoulder', priceMultiplier: 0.85, rainRisk: 0.08, crowdLevel: 0.65, flightReliability: 'Excellent', reason: 'Summer ending, still warm' },
    October: { season: 'shoulder', priceMultiplier: 0.78, rainRisk: 0.15, crowdLevel: 0.5, flightReliability: 'Excellent', reason: 'Mild autumn, fewer tourists' },
    November: { season: 'offpeak', priceMultiplier: 0.7, rainRisk: 0.22, crowdLevel: 0.35, flightReliability: 'Good', reason: 'Autumn, cooler and wetter' },
    December: { season: 'offpeak', priceMultiplier: 0.72, rainRisk: 0.25, crowdLevel: 0.45, flightReliability: 'Good', reason: 'Winter, holiday visitors' },
  },
  'greece-athens': {
    January: { season: 'offpeak', priceMultiplier: 0.62, rainRisk: 0.28, crowdLevel: 0.25, flightReliability: 'Good', reason: 'Winter low season' },
    February: { season: 'offpeak', priceMultiplier: 0.65, rainRisk: 0.25, crowdLevel: 0.28, flightReliability: 'Good', reason: 'Still winter, beginning to warm' },
    March: { season: 'shoulder', priceMultiplier: 0.72, rainRisk: 0.18, crowdLevel: 0.4, flightReliability: 'Excellent', reason: 'Spring arrives, pleasant temperatures' },
    April: { season: 'shoulder', priceMultiplier: 0.8, rainRisk: 0.12, crowdLevel: 0.55, flightReliability: 'Excellent', reason: 'Perfect spring weather' },
    May: { season: 'shoulder', priceMultiplier: 0.88, rainRisk: 0.08, crowdLevel: 0.7, flightReliability: 'Excellent', reason: 'Late spring, ideal conditions' },
    June: { season: 'peak', priceMultiplier: 0.95, rainRisk: 0.05, crowdLevel: 0.85, flightReliability: 'Excellent', reason: 'Summer season begins' },
    July: { season: 'peak', priceMultiplier: 1.0, rainRisk: 0.02, crowdLevel: 0.98, flightReliability: 'Excellent', reason: 'Peak summer, very hot and crowded' },
    August: { season: 'peak', priceMultiplier: 1.0, rainRisk: 0.02, crowdLevel: 0.98, flightReliability: 'Excellent', reason: 'Hottest month, maximum crowds' },
    September: { season: 'shoulder', priceMultiplier: 0.85, rainRisk: 0.06, crowdLevel: 0.65, flightReliability: 'Excellent', reason: 'Still warm, crowds decrease' },
    October: { season: 'shoulder', priceMultiplier: 0.75, rainRisk: 0.12, crowdLevel: 0.45, flightReliability: 'Excellent', reason: 'Autumn, comfortable weather' },
    November: { season: 'offpeak', priceMultiplier: 0.68, rainRisk: 0.22, crowdLevel: 0.3, flightReliability: 'Good', reason: 'Off-season begins' },
    December: { season: 'offpeak', priceMultiplier: 0.65, rainRisk: 0.28, crowdLevel: 0.3, flightReliability: 'Good', reason: 'Winter season, fewer visitors' },
  },
  // Add default for destinations not explicitly defined
  default: {
    season: 'shoulder',
    priceMultiplier: 0.75,
    rainRisk: 0.15,
    crowdLevel: 0.5,
    flightReliability: 'Good',
    reason: 'Moderate season with balanced conditions',
  },
};
