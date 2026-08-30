exports.getCompanies = async (req, res) => {
  const companies = [
    { id: 'tcs', name: 'TCS NQT', logo: '🏢', color: 'from-blue-500 to-cyan-500', description: 'Tata Consultancy Services National Qualifier Test', stats: { packages: '3.5-7 LPA', duration: '3 hours', rounds: 4 }, topics: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Coding'], tips: ['Focus on speed', 'Practice TCS patterns'] },
    { id: 'infosys', name: 'Infosys', logo: '💼', color: 'from-purple-500 to-pink-500', description: 'Infosys recruitment drive', stats: { packages: '3.6-9 LPA', duration: '2.5 hours', rounds: 3 }, topics: ['Quantitative', 'Logical', 'Verbal', 'Pseudocode', 'Coding'], tips: ['Practice pseudocode', 'Focus on data structures'] },
    { id: 'wipro', name: 'Wipro', logo: '🚀', color: 'from-orange-500 to-red-500', description: 'Wipro Elite/Turbo hiring', stats: { packages: '3.5-8 LPA', duration: '2 hours', rounds: 3 }, topics: ['Aptitude', 'Logical', 'Verbal', 'Essay Writing', 'Coding'], tips: ['Essay writing is mandatory', 'Practice previous papers'] },
    { id: 'amazon', name: 'Amazon', logo: '📦', color: 'from-yellow-500 to-orange-500', description: 'Amazon SDE interview preparation', stats: { packages: '12-45 LPA', duration: '4-5 rounds', rounds: 5 }, topics: ['DSA (Advanced)', 'System Design', 'OOD', 'Behavioral'], tips: ['Master trees, graphs, DP', 'Prepare STAR format stories'] },
    { id: 'microsoft', name: 'Microsoft', logo: '🪟', color: 'from-blue-600 to-indigo-600', description: 'Microsoft software engineer interview', stats: { packages: '15-50 LPA', duration: '4-6 rounds', rounds: 6 }, topics: ['DSA (Expert)', 'System Design', 'OOD', 'Behavioral'], tips: ['Focus on problem-solving approach', 'Practice whiteboard coding'] }
  ];
  res.json({ success: true, companies });
};
