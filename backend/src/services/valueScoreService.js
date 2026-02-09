/**
 * Core Value Score Calculation Engine
 * Based on first-principles approach from MVP spec
 */

const calculateValueScore = (destination, weatherTolerance, crowdTolerance) => {
  const { peakCost, offPeakCost, weather, crowds, flightReliability } = destination;

  // 1. Raw Value Score: (Peak Cost - Window Cost) / Peak Cost
  const rawValue = (peakCost - offPeakCost) / peakCost;
  const savingsPercent = Math.round(rawValue * 100);

  // 2. Calculate Risk Penalty (0 - 0.3 range)
  const weatherRisk = calculateWeatherRisk(weather, weatherTolerance);
  const crowdRisk = calculateCrowdRisk(crowds, crowdTolerance);
  const reliabilityRisk = calculateReliabilityRisk(flightReliability);

  // Combined risk penalty (weighted)
  const riskPenalty = Math.min(
    0.3, // Maximum penalty
    weatherRisk * 0.5 + crowdRisk * 0.3 + reliabilityRisk * 0.2
  );

  // 3. Adjusted Value Score
  const adjustedValue = rawValue * (1 - riskPenalty);

  return {
    rawValue,
    savingsPercent,
    riskPenalty,
    adjustedValue,
    breakdown: {
      weatherRisk,
      crowdRisk,
      reliabilityRisk
    }
  };
};

const calculateWeatherRisk = (weatherLevel, tolerance) => {
  const riskMap = {
    'Excellent': 0,
    'Good': 0.05,
    'Moderate': 0.15,
    'Poor': 0.25
  };

  const baseRisk = riskMap[weatherLevel] || 0.1;
  // Tolerance reduces perceived risk (0 = risk-averse, 1 = risk-tolerant)
  return baseRisk * (1 - tolerance * 0.6);
};

const calculateCrowdRisk = (crowdLevel, tolerance) => {
  const riskMap = {
    'Very Low': 0,
    'Low': 0.02,
    'Medium': 0.08,
    'High': 0.15
  };

  const baseRisk = riskMap[crowdLevel] || 0.05;
  return baseRisk * (1 - tolerance * 0.5);
};

const calculateReliabilityRisk = (reliabilityLevel) => {
  const riskMap = {
    'Excellent': 0,
    'Good': 0.02,
    'Normal': 0.05,
    'Variable': 0.12
  };

  return riskMap[reliabilityLevel] || 0.05;
};

module.exports = {
  calculateValueScore
};