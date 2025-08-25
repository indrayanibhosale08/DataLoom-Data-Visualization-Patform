// const OpenAI = require('openai');

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// exports.getInsights = async (req, res) => {
//   const { data } = req.body; // Expects JSON data from the Excel file
//   const dataString = JSON.stringify(data.slice(0, 10)); // Use a sample of the data to save tokens

//   const prompt = `
//     Analyze the following dataset and provide three key business insights.
//     The data is: ${dataString}.
//     Respond with a simple JSON object like {"insights": ["Insight 1", "Insight 2", "Insight 3"]}.
//   `;

//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//     });

//     const insights = JSON.parse(completion.choices[0].message.content);
//     res.json(insights);
//   } catch (error) {
//     console.error('OpenAI Error:', error);
//     res.status(500).json({ error: 'Failed to get AI insights.' });
//   }
// };