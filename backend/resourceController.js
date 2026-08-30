
exports.getAllResources = async (req, res) => {
  const resources = [
    // Web Development
    { id: 1, title: "HTML Tutorial", subject: "Web Development", category: "HTML", level: "Beginner", url: "https://www.w3schools.com/html/", description: "Complete HTML tutorial with examples", duration: "4 hours", rating: 4.8 },
    { id: 2, title: "CSS Tutorial", subject: "Web Development", category: "CSS", level: "Beginner", url: "https://www.w3schools.com/css/", description: "Learn CSS from scratch", duration: "5 hours", rating: 4.7 },
    { id: 3, title: "JavaScript Tutorial", subject: "Web Development", category: "JavaScript", level: "Beginner", url: "https://www.w3schools.com/js/", description: "Interactive JavaScript lessons", duration: "8 hours", rating: 4.9 },
    { id: 4, title: "React Official Docs", subject: "Web Development", category: "React", level: "Intermediate", url: "https://react.dev/learn", description: "Learn React from the official team", duration: "10 hours", rating: 4.9 },
    { id: 5, title: "Node.js Tutorial", subject: "Web Development", category: "Node.js", level: "Intermediate", url: "https://nodejs.org/en/learn", description: "Server-side JavaScript", duration: "6 hours", rating: 4.6 },
    { id: 6, title: "MongoDB University", subject: "Web Development", category: "Database", level: "Beginner", url: "https://learn.mongodb.com/", description: "Free MongoDB courses", duration: "12 hours", rating: 4.8 },
    
    // DSA (Data Structures & Algorithms)
    { id: 7, title: "Striver's DSA Sheet", subject: "DSA", category: "Problem Solving", level: "Intermediate", url: "https://takeuforward.org/strivers-a2z-dsa-course/", description: "Complete DSA course by Striver", duration: "60 hours", rating: 5.0 },
    { id: 8, title: "LeetCode", subject: "DSA", category: "Practice", level: "All Levels", url: "https://leetcode.com/", description: "Practice coding problems", duration: "Ongoing", rating: 4.8 },
    { id: 9, title: "GeeksforGeeks DSA", subject: "DSA", category: "Theory", level: "Beginner", url: "https://www.geeksforgeeks.org/data-structures/", description: "Comprehensive DSA tutorials", duration: "40 hours", rating: 4.7 },
    { id: 10, title: "Abdul Bari Algorithms", subject: "DSA", category: "Algorithms", level: "Intermediate", url: "https://www.youtube.com/@abdul_bari", description: "Best algorithms playlist on YouTube", duration: "30 hours", rating: 4.9 },
    
    // Aptitude
    { id: 11, title: "IndiaBIX Aptitude", subject: "Aptitude", category: "Quantitative", level: "Beginner", url: "https://www.indiabix.com/aptitude/", description: "Aptitude questions with solutions", duration: "20 hours", rating: 4.6 },
    { id: 12, title: "Logical Reasoning", subject: "Aptitude", category: "Logical", level: "Beginner", url: "https://www.geeksforgeeks.org/logical-reasoning/", description: "Logical reasoning practice", duration: "15 hours", rating: 4.5 },
    
    // AI/ML
    { id: 13, title: "Andrew Ng's ML Course", subject: "AI/ML", category: "Machine Learning", level: "Intermediate", url: "https://www.coursera.org/learn/machine-learning", description: "Stanford ML course by Andrew Ng", duration: "40 hours", rating: 5.0 },
    { id: 14, title: "Fast.ai", subject: "AI/ML", category: "Deep Learning", level: "Intermediate", url: "https://www.fast.ai/", description: "Practical deep learning", duration: "30 hours", rating: 4.8 },
    
    // System Design
    { id: 15, title: "System Design Primer", subject: "System Design", category: "Fundamentals", level: "Advanced", url: "https://github.com/donnemartin/system-design-primer", description: "Learn system design", duration: "25 hours", rating: 4.9 },
    
    // Core Subjects
    { id: 16, title: "OS Tutorial - GFG", subject: "Core Subjects", category: "Operating Systems", level: "Intermediate", url: "https://www.geeksforgeeks.org/operating-systems/", description: "Operating system concepts", duration: "20 hours", rating: 4.7 },
    { id: 17, title: "DBMS Tutorial", subject: "Core Subjects", category: "Database", level: "Intermediate", url: "https://www.geeksforgeeks.org/dbms/", description: "Database management systems", duration: "18 hours", rating: 4.6 },
    { id: 18, title: "Computer Networks", subject: "Core Subjects", category: "Networking", level: "Intermediate", url: "https://www.geeksforgeeks.org/computer-network-tutorials/", description: "Networking fundamentals", duration: "22 hours", rating: 4.5 },
    
    // Interview Prep
    { id: 19, title: "Behavioral Interview Tips", subject: "Interview Prep", category: "HR", level: "Beginner", url: "https://www.indeed.com/career-advice/interviewing/behavioral-interview-questions", description: "Ace HR interviews", duration: "3 hours", rating: 4.4 },
    { id: 20, title: "Mock Interview Platform", subject: "Interview Prep", category: "Practice", level: "All Levels", url: "https://www.pramp.com/", description: "Free peer mock interviews", duration: "Ongoing", rating: 4.7 }
  ];
  res.json({ success: true, resources, total: resources.length });
};
