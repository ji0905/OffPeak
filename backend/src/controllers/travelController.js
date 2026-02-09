const valueScoreService = require('../services/valueScoreService');
const openaiService = require('../services/openaiService');
const { getDestinationsData } = require('../data/mockData');

const analyzeDestinations = async (req, res) => {
  try {
    const { origin, dateFlexibility, tripLength, weatherTolerance, crowdTolerance } = req.body;

    // Validate inputs
    if (!origin) {
      return res.status(400).json({ error: 'Origin is required' });
    }

    console.log(`\n📍 Analyzing destinations from: ${origin}`);
    console.log(`⏱️  Flexibility: ${dateFlexibility || 'Standard'}`);
    console.log(`🎚️  Tolerances - Weather: ${weatherTolerance}, Crowds: ${crowdTolerance}\n`);

    // Get mock destinations data
    const destinations = getDestinationsData(origin);

    // Calculate value scores for each destination
    const analyzedDestinations = destinations.map(dest => {
      const valueScore = valueScoreService.calculateValueScore(
        dest,
        weatherTolerance || 0.5,
        crowdTolerance || 0.5
      );

      return {
        ...dest,
        valueScore: valueScore.adjustedValue,
        savings: valueScore.savingsPercent,
        rawValue: valueScore.rawValue,
        riskPenalty: valueScore.riskPenalty
      };
    });

    // Filter and sort by value score
    const topDestinations = analyzedDestinations
      .filter(d => d.savings >= 20) // Minimum 20% savings
      .sort((a, b) => b.valueScore - a.valueScore)
      .slice(0, 5); // Top 5

    // Enhance with AI insights if API key is available
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
      for (let dest of topDestinations) {
        try {
          dest.aiInsight = await openaiService.generateInsight(dest);
        } catch (error) {
          console.log(`⚠️  AI insight generation failed for ${dest.name}:`, error.message);
          dest.aiInsight = dest.whyThisWorks; // Fallback to static explanation
        }
      }
    } else {
      console.log('ℹ️  OpenAI API key not configured, using static insights');
      topDestinations.forEach(dest => {
        dest.aiInsight = dest.whyThisWorks;
      });
    }

    res.json({
      success: true,
      origin,
      destinations: topDestinations,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error analyzing destinations:', error);
    res.status(500).json({ 
      error: 'Failed to analyze destinations',
      message: error.message 
    });
  }
};

module.exports = {
  analyzeDestinations
};