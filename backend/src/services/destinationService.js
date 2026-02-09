/**
 * Destination Service
 * Core logic for calculating value scores and generating destination recommendations
 */

const destinations = require('../data/destinations');
const seasonality = require('../data/seasonality');

class DestinationService {
  /**
   * Get recommended destinations based on user inputs
   */
  async getDestinations(params) {
    const { origin, month, flexWeeks, tripLength, weatherRisk, crowdTolerance } = params;

    // Get all possible destinations
    const allDestinations = this.getAllDestinations();

    // Calculate value scores for each destination
    const scoredDestinations = allDestinations.map(dest => {
      const score = this.calculateValueScore(dest, {
        month,
        flexWeeks,
        tripLength,
        weatherRisk,
        crowdTolerance,
      });

      return {
        ...dest,
        valueScore: score.adjustedValue,
        rawSavings: score.rawSavings,
        riskPenalty: score.riskPenalty,
      };
    });

    // Filter out destinations below minimum savings threshold (20%)
    const filteredDestinations = scoredDestinations
      .filter(dest => dest.rawSavings >= 0.20)
      .sort((a, b) => b.valueScore - a.valueScore)
      .slice(0, 5); // Top 5 destinations

    // Format for frontend
    return filteredDestinations.map(dest => this.formatDestination(dest, month, tripLength));
  }

  /**
   * Calculate value score using first-principles approach from MVP
   */
  calculateValueScore(destination, params) {
    const { month, weatherRisk, crowdTolerance } = params;
    
    // Get seasonality data for this destination and month
    const season = this.getSeasonality(destination.id, month);

    // Calculate base value score: (Peak Cost - Window Cost) / Peak Cost
    const peakCost = destination.peakCost;
    const offPeakCost = destination.baseCost * season.priceMultiplier;
    const rawSavings = (peakCost - offPeakCost) / peakCost;

    // Calculate risk penalty based on weather and crowds
    const weatherPenalty = season.rainRisk * (1 - weatherRisk) * 0.2; // Max 20% penalty
    const crowdPenalty = season.crowdLevel * (1 - crowdTolerance) * 0.1; // Max 10% penalty
    const totalPenalty = Math.min(weatherPenalty + crowdPenalty, 0.3); // Cap at 30%

    // Adjusted Value = Value Score × (1 - Risk Penalty)
    const adjustedValue = rawSavings * (1 - totalPenalty);

    return {
      rawSavings,
      riskPenalty: totalPenalty,
      adjustedValue,
      seasonData: season,
    };
  }

  /**
   * Get seasonality data for a destination and month
   */
  getSeasonality(destinationId, monthName) {
    const destSeasonality = seasonality[destinationId];
    if (!destSeasonality) {
      // Default seasonality if not found
      return {
        season: 'shoulder',
        priceMultiplier: 0.75,
        rainRisk: 0.15,
        crowdLevel: 0.4,
        temperature: 'moderate',
      };
    }

    return destSeasonality[monthName] || destSeasonality.default;
  }

  /**
   * Get all available destinations
   */
  getAllDestinations() {
    return destinations;
  }

  /**
   * Format destination for frontend display
   */
  formatDestination(dest, month, tripLength) {
    const season = dest.valueScore ? dest.seasonData : this.getSeasonality(dest.id, month);
    
    const offPeakCost = Math.round(dest.baseCost * season.priceMultiplier);
    const savingsPercent = Math.round(dest.rawSavings * 100);

    // Calculate date window (simplified)
    const monthIndex = this.getMonthIndex(month);
    const startDate = this.formatDateWindow(monthIndex, 5);
    const endDate = this.formatDateWindow(monthIndex, 22);

    return {
      destination: dest.country,
      location: dest.city,
      bestWindow: `${startDate}–${endDate}`,
      savingsPercent,
      estimatedCost: `€${offPeakCost.toLocaleString()}`,
      peakCost: `€${dest.peakCost.toLocaleString()}`,
      tradeOffs: {
        rainRisk: season.rainRisk,
        rainDays: `${Math.round(season.rainRisk * 100)}% of days`,
        crowds: season.crowdLevel,
        flightReliability: season.flightReliability || 'Normal',
      },
      explanation: this.generateExplanation(dest, season, savingsPercent),
      valueScore: dest.valueScore,
    };
  }

  /**
   * Generate explanation for why this destination is a good value
   */
  generateExplanation(dest, season, savingsPercent) {
    const explanations = {
      offpeak: `${season.reason || 'Off-peak season lowers hotel demand while flights remain frequent.'} Great value with ${savingsPercent}% savings.`,
      shoulder: `Shoulder season offers excellent balance: lower prices (${savingsPercent}% off) with still-pleasant conditions.`,
      peak: `Even in peak season, this destination offers good value due to competitive market conditions.`,
    };

    return explanations[season.season] || explanations.offpeak;
  }

  /**
   * Helper: Get month index (0-11)
   */
  getMonthIndex(monthName) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months.indexOf(monthName);
  }

  /**
   * Helper: Format date window
   */
  formatDateWindow(monthIndex, day) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${months[monthIndex]}`;
  }
}

module.exports = new DestinationService();
