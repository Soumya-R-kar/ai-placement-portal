exports.getAllResources = async (req, res) => {
  const resources = [
    { id: 1, title: "HTML Tutorial", subject: "Web Development", category: "HTML", level: "Beginner", url: "https://www.w3schools.com/html/", description: "Complete HTML tutorial with examples", duration: "4 hours", rating: 4.8 },
    { id: 2, title: "CSS Tutorial", subject: "Web Development", category: "CSS", level: "Beginner", url: "https://www.w3schools.com/css/", description: "Learn CSS from scratch", duration: "5 hours", rating: 4.7 },
    { id: 3, title: "JavaScript Tutorial", subject: "Web Development", category: "JavaScript", level: "Beginner", url: "https://www.w3schools.com/js/", description: "Interactive JavaScript lessons", duration: "8 hours", rating: 4.9 },
    { id: 4, title: "React Official Docs", subject: "Web Development", category: "React", level: "Intermediate", url: "https://react.dev/learn", description: "Learn React from the official team", duration: "10 hours", rating: 4.9 },
    { id: 7, title: "Striver's DSA Sheet", subject: "DSA", category: "Problem Solving", level: "Intermediate", url: "https://takeuforward.org/strivers-a2z-dsa-course/", description: "Complete DSA course by Striver", duration: "60 hours", rating: 5.0 },
    { id: 8, title: "LeetCode", subject: "DSA", category: "Practice", level: "All Levels", url: "https://leetcode.com/", description: "Practice coding problems", duration: "Ongoing", rating: 4.8 },
    { id: 11, title: "IndiaBIX Aptitude", subject: "Aptitude", category: "Quantitative", level: "Beginner", url: "https://www.indiabix.com/aptitude/", description: "Aptitude questions with solutions", duration: "20 hours", rating: 4.6 },
    { id: 15, title: "System Design Primer", subject: "System Design", category: "Fundamentals", level: "Advanced", url: "https://github.com/donnemartin/system-design-primer", description: "Learn system design", duration: "25 hours", rating: 4.9 },
    { id: 16, title: "OS Tutorial - GFG", subject: "Core Subjects", category: "Operating Systems", level: "Intermediate", url: "https://www.geeksforgeeks.org/operating-systems/", description: "Operating system concepts", duration: "20 hours", rating: 4.7 }
  ];
  res.json({ success: true, resources, total: resources.length });
};