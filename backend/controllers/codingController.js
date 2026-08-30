const axios = require('axios');
const Problem = require('../models/Problem');
const PISTON_API = 'https://emkc.org/api/v2/piston/execute';
const LANGUAGE_VERSIONS = { python: '3.10.0', javascript: '18.15.0', java: '15.0.2', cpp: '10.2.0', c: '10.2.0' };
exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find().select('-testCases -starterCode');
    res.json({ success: true, problems });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch problems' });
  }
};
exports.getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id).select('-testCases');
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.json({ success: true, problem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch problem' });
  }
};
exports.executeCode = async (req, res) => {
  try {
    const { problemId, code, language } = req.body;
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    const version = LANGUAGE_VERSIONS[language] || LANGUAGE_VERSIONS['python'];
    let passedCount = 0;
    const testResults = [];
    for (const testCase of problem.testCases) {
      const response = await axios.post(PISTON_API, {
        language: language, version: version,
        files: [{ content: code }],
        stdin: testCase.input, compile_timeout: 10000, run_timeout: 5000
      });
      const output = response.data.run.stdout.trim();
      const passed = output === testCase.expectedOutput.trim();
      if (passed) passedCount++;
      testResults.push({
        input: testCase.input, expectedOutput: testCase.expectedOutput,
        actualOutput: output, stderr: response.data.run.stderr.trim(), passed
      });
    }
    res.json({
      success: true, allPassed: passedCount === problem.testCases.length,
      passedCount, totalTests: problem.testCases.length,
      score: Math.round((passedCount / problem.testCases.length) * problem.points),
      points: problem.points, testResults
    });
  } catch (error) {
    res.status(500).json({ message: 'Code execution failed', error: error.message });
  }
};
