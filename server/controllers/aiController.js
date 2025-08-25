// server/controllers/aiController.js
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @desc    Generate insights from data using AI
// @route   POST /api/ai/generate-insights
// @access  Private
const generateInsights = async (req, res) => {
  const { jsonData } = req.body;

  // Basic validation
  if (!jsonData || !Array.isArray(jsonData) || jsonData.length === 0) {
    return res.status(400).json({ msg: 'Valid JSON data is required.' });
  }

  // Convert a sample of the JSON data to a string for the prompt
  // We'll use a sample to avoid hitting token limits for very large files
  const dataSample = JSON.stringify(jsonData.slice(0, 20), null, 2);

  const prompt = `
    You are a helpful data analyst. Based on the following sample JSON data from an Excel file, provide 3-5 brief, actionable insights. 
    Focus on potential trends, outliers, or interesting relationships between the columns. 
    Present the insights as a bulleted list. Do not just describe the data; interpret it.

    Data Sample:
    ${dataSample}
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or "gpt-4" if you have access
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7, // A little creativity
      max_tokens: 250, // Limit the response length
    });

    const insights = completion.choices[0].message.content;
    res.json({ insights });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ msg: 'Failed to generate insights from AI.' });
  }
};

module.exports = {
  generateInsights,
};