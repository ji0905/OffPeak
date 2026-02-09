const OpenAI = require('openai');

let openai = null;

// Initialize OpenAI client only if API key is available
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

const generateInsight = async (destination) => {
  if (!openai) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = `You are a travel economics expert. Analyze this off-peak travel opportunity:

Destination: ${destination.name}
Best Window: ${destination.bestWindow}
Savings: ${destination.savings}% cheaper than peak (€${destination.offPeakCost} vs €${destination.peakCost})
Weather: ${destination.weather} (${destination.rainRisk})
Crowds: ${destination.crowds}
Flight Reliability: ${destination.flightReliability}

Provide a concise 2-sentence insight explaining:
1. WHY this timing offers value (supply/demand dynamics)
2. ONE key consideration for travelers

Keep it analytical and practical. No fluff.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.7
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API error:', error.message);
    throw error;
  }
};

module.exports = {
  generateInsight
};