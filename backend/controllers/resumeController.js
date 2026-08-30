exports.analyzeResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload a PDF' });
    
    // Mock AI response
    const analysis = {
      score: 85,
      atsScore: 78,
      strengths: [
        "Strong technical skills in JavaScript and React",
        "Good project experience with full-stack development",
        "Clear education section with relevant degree"
      ],
      weaknesses: [
        "Missing quantifiable achievements in work experience",
        "No mention of cloud technologies (AWS/Azure)",
        "Skills section could be more specific"
      ],
      suggestions: [
        "Add metrics to your project descriptions (e.g., 'improved performance by 40%')",
        "Include a link to your GitHub and LinkedIn",
        "Add a professional summary at the top",
        "Mention specific frameworks and tools you've used"
      ],
      recommendedRoles: [
        "Frontend Developer",
        "Full Stack Developer",
        "React Developer",
        "JavaScript Engineer"
      ]
    };
    
    res.json({ success: true, analysis });
  } catch (error) {
    res.status(500).json({ message: 'Analysis failed', error: error.message });
  }
};