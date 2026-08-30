exports.solveDoubt = async (req, res) => {
  try {
    const { question } = req.body;
    
    // Mock AI response
    const answer = `Great question! Here's what you need to know about "${question}":

This is a fundamental concept in placement preparation. Let me explain it simply:

1. **Key Point 1**: This concept is frequently asked in technical interviews
2. **Key Point 2**: Understanding this will help you solve related problems
3. **Key Point 3**: Practice with real examples to master it

**Example**: 
Here's a simple example to illustrate the concept.

**Tip**: Focus on understanding the "why" behind this concept, not just the "how".

Would you like me to explain any specific part in more detail?`;
    
    res.json({ success: true, answer });
  } catch (error) {
    res.status(500).json({ message: 'Failed to solve doubt' });
  }
};

exports.generateRoadmap = async (req, res) => {
  try {
    const { targetRole, daysAvailable } = req.body;
    
    // Mock roadmap
    const roadmap = {
      weeks: [
        {
          week: 1,
          focus: "Foundation Building",
          topics: ["Data Structures Basics", "Problem Solving Approach", "Time Complexity"],
          tasks: [
            "Day 1-2: Learn Arrays and Strings",
            "Day 3-4: Practice 10 easy problems",
            "Day 5-6: Learn Linked Lists",
            "Day 7: Revision and mock test"
          ],
          resources: ["GeeksforGeeks DSA", "Striver's A2Z Course"]
        },
        {
          week: 2,
          focus: "Core DSA",
          topics: ["Trees", "Graphs", "Dynamic Programming Basics"],
          tasks: [
            "Day 1-3: Binary Trees and BST",
            "Day 4-5: Graph traversal algorithms",
            "Day 6-7: DP introduction with 5 problems"
          ],
          resources: ["LeetCode Medium", "Abdul Bari Algorithms"]
        },
        {
          week: 3,
          focus: "Advanced Topics & System Design",
          topics: ["Advanced DSA", "System Design Basics", "Mock Interviews"],
          tasks: [
            "Day 1-2: Advanced tree/graph problems",
            "Day 3-4: System design fundamentals",
            "Day 5-7: Daily mock interviews"
          ],
          resources: ["System Design Primer", "Pramp Mock Interviews"]
        }
      ],
      tips: [
        "Practice consistently for 2-3 hours daily",
        "Focus on understanding patterns, not memorizing solutions",
        "Give at least 2 mock interviews per week",
        "Revise previous topics every weekend",
        "Stay updated with company-specific interview patterns"
      ]
    };
    
    res.json({ success: true, roadmap });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate roadmap' });
  }
};

exports.mockInterview = async (req, res) => {
  try {
    const { userAnswer } = req.body;
    
    // Mock feedback
    const feedback = {
      score: 7,
      feedback: "Good attempt! You covered the basic concepts well. Your explanation was clear and structured. However, you could have mentioned more real-world applications and edge cases.",
      improvedAnswer: "A stronger answer would include: 1) Clear definition with an analogy, 2) Real-world use cases, 3) Advantages and disadvantages, 4) Code example if applicable, 5) Common interview follow-up questions you should be prepared for.",
      keyPoints: [
        "Mention practical applications",
        "Include time/space complexity if relevant",
        "Discuss trade-offs",
        "Provide a concrete example"
      ]
    };
    
    res.json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ message: 'Interview feedback failed' });
  }
};