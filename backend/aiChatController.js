
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// AI Doubt Solver - Ask any placement-related question
exports.solveDoubt = async (req, res) => {
  try {
    const { question, topic } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a friendly placement preparation mentor. Explain concepts clearly with examples. If asked about coding, provide code snippets. Keep answers concise but complete." },
        { role: "user", content: topic ? "Topic: " + topic + "\n\nQuestion: " + question : question }
      ]
    });
    res.json({ success: true, answer: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: 'Failed to solve doubt' });
  }
};

// AI Study Roadmap Generator
exports.generateRoadmap = async (req, res) => {
  try {
    const { targetRole, daysAvailable, currentSkills } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a career coach. Create a detailed week-by-week study roadmap as JSON with this structure: { weeks: [{ week: 1, focus: 'topic', topics: ['list'], tasks: ['daily tasks'], resources: ['links'] }], tips: ['advice'] }." },
        { role: "user", content: "Target Role: " + targetRole + "\nDays Available: " + daysAvailable + "\nCurrent Skills: " + currentSkills }
      ],
      response_format: { type: "json_object" }
    });
    const roadmap = JSON.parse(completion.choices[0].message.content);
    res.json({ success: true, roadmap });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate roadmap' });
  }
};

// AI Mock Interview with Feedback
exports.mockInterview = async (req, res) => {
  try {
    const { question, userAnswer, role } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a strict but fair interviewer. Evaluate the candidate's answer. Return JSON: { score: 0-10, feedback: 'detailed feedback', improvedAnswer: 'better version', keyPoints: ['missed points'] }." },
        { role: "user", content: "Role: " + role + "\nQuestion: " + question + "\nCandidate's Answer: " + userAnswer }
      ],
      response_format: { type: "json_object" }
    });
    const feedback = JSON.parse(completion.choices[0].message.content);
    res.json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ message: 'Interview feedback failed' });
  }
};
