import express from "express";
import axios from "axios";

const router = express.Router();

// Replace with your LeetCode username
const LEETCODE_USERNAME = "sachin0614";
// /dsa/leetcode-stats
router.get("/leetcode-stats", async (req, res) => {
  const query = {
    query: `
      {
        matchedUser(username: "${LEETCODE_USERNAME}") {
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
      }
    `
  };

  try {
    const response = await axios.post("https://leetcode.com/graphql", query, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const stats = response.data.data.matchedUser.submitStats.acSubmissionNum;

    const formatted = {
      all: stats.find(d => d.difficulty === "All")?.count || 0,
      easy: stats.find(d => d.difficulty === "Easy")?.count || 0,
      medium: stats.find(d => d.difficulty === "Medium")?.count || 0,
      hard: stats.find(d => d.difficulty === "Hard")?.count || 0
    };

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error.message);
    res.status(500).json({ error: "Failed to fetch LeetCode stats" });
  }
});

export default router;
