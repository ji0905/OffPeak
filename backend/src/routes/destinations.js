const express = require('express');
const router = express.Router();
const destinationService = require('../services/destinationService');
const aiService = require('../services/aiService');

router.post('/destinations', async (req, res) => {
  try {
    const { origin, month, flexWeeks, tripLength, weatherRisk, crowdTolerance } = req.body;

    // Validate input
    if (!origin || !month) {
      return res.status(400).json({ 
        error: 'Missing required parameters: origin and month are required' 
      });
    }

    console.log('Processing request:', { origin, month, flexWeeks, tripLength });

    // Get destinations with value scores
    let destinations = await destinationService.getDestinations({
      origin,
      month,
      flexWeeks: flexWeeks || 2,
      tripLength: tripLength || 7,
      weatherRisk: weatherRisk || 0.5,
      crowdTolerance: crowdTolerance || 0.5,
    });

    // Optionally enhance with AI insights if OpenAI is configured
    if (process.env.OPENAI_API_KEY && destinations.length > 0) {
      try {
        destinations = await aiService.enhanceDestinations(destinations, {
          origin,
          month,
          preferences: { weatherRisk, crowdTolerance },
        });
      } catch (aiError) {
        console.warn('AI enhancement failed, continuing without:', aiError.message);
      }
    }

    res.json(destinations);
  } catch (error) {
    console.error('Error processing destinations request:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      message: error.message 
    });
  }
});

module.exports = router;
