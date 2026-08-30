
const OpenAI = require('openai');
const pdfParse = require('pdf-parse');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.analyzeResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload a PDF' });
    const data = await pdfParse(req.file.buffer);
    const resumeText = data.text;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an expert technical recruiter. Analyze this resume and return JSON with: score (0-100), strengths (array), weaknesses (array), suggestions (array), atsScore (0-100), recommendedRoles (array)." },
        { role: "user", content: resumeText }
      ],
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(completion.choices[0].message.content);
    res.json({ success: true, analysis });
  } catch (error) {
    res.status(500).json({ message: 'Analysis failed', error: error.message });
  }
};
