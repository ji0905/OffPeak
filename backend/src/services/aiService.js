/**
 * AI Service
 * Optional OpenAI integration for enhanced destination insights
 */

const OpenAI = require('openai');

class AIService {
  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      this.enabled = true;
    } else {
      this.enabled = false;
      console.log('OpenAI not configured - AI enhancements disabled');
    }
  }

  /**
   * Enhance destination recommendations with AI-generated insights
   */
  async enhanceDestinations(destinations, context) {
    if (!this.enabled || destinations.length === 0) {
      return destinations;
    }

    try {
      const prompt = this.buildEnhancementPrompt(destinations, context);
      
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a travel intelligence assistant. Provide concise, insightful explanations for why specific travel windows offer great value. Focus on seasonality, local events, and market dynamics. Keep each explanation under 30 words.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const enhancedExplanations = this.parseAIResponse(completion.choices[0].message.content);
      
      // Merge AI explanations with destinations
      return destinations.map((dest, index) => ({
        ...dest,
        explanation: enhancedExplanations[index] || dest.explanation,
        aiEnhanced: true,
      }));
    } catch (error) {
      console.error('AI enhancement error:', error.message);
      return destinations; // Return original data if AI fails
    }
  }

  /**
   * Build prompt for AI enhancement
   */
  buildEnhancementPrompt(destinations, context) {
    const destList = destinations
      .map((d, i) => `${i + 1}. ${d.destination} - ${d.location} (${d.savingsPercent}% savings in ${context.month})`)
      .join('\n');

    return `Generate brief explanations for why these destinations offer great value in ${context.month}:

${destList}

For each destination, explain in one concise sentence (max 30 words) why this specific time offers good value, considering seasonality, weather patterns, or local factors.

Format: Just list the explanations numbered 1-${destinations.length}, one per line.`;
  }

  /**
   * Parse AI response into array of explanations
   */
  parseAIResponse(response) {
    const lines = response.split('\n').filter(line => line.trim());
    return lines.map(line => {
      // Remove numbering and clean up
      return line.replace(/^\d+\.\s*/, '').trim();
    });
  }

  /**
   * Generate personalized trip insights (future feature)
   */
  async generateTripInsights(destination, userPreferences) {
    if (!this.enabled) {
      return null;
    }

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable travel advisor. Provide practical, specific tips for travelers.',
          },
          {
            role: 'user',
            content: `Give 3 brief, practical tips for visiting ${destination.location}, ${destination.destination} during off-peak season. Consider weather, activities, and local insights. Keep each tip under 20 words.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Insight generation error:', error.message);
      return null;
    }
  }
}

module.exports = new AIService();
