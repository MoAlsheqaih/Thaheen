import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ContinueLearning from "../components/ContinueLearning";
import WelcomeBack from "../components/WelcomeBack";
import Leaderboard from "../components/Leaderboard";
import Header from "../components/Header";
import Footer from "../components/Footer";

// TODO: Replace with actual data
const userData = {
  id: 1,
  name: "Usama",
  points: 174,
  streak: 13,
  questionsSolved: 51,
  courseProgress: [
    { id: 1, questionsSolved: 25 },
    { id: 2, questionsSolved: 32 },
    { id: 3, questionsSolved: 14 },
    { id: 4, questionsSolved: 5 },
    { id: 5, questionsSolved: 9 },
    { id: 6, questionsSolved: 25 },
    { id: 7, questionsSolved: 32 },
    { id: 8, questionsSolved: 14 },
    { id: 9, questionsSolved: 5 },
    { id: 10, questionsSolved: 9 },
  ]
}

function User() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState({ rows: [] });
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        navigate("/");
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/status`, {
          headers: {
            "x-auth-token": token,
          },
        });

        const data = await response.json();

        if (response.status === 200 && (data.role === "regular" || data.role === "master")) {
          setIsAuthenticated(true);

          // Fetch leaderboard data
          const leaderboardResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/leaderboard`, {
            headers: {
              "x-auth-token": token,
            },
          });

          if (leaderboardResponse.ok) {
            const { leaderboardData, userId } = await leaderboardResponse.json();
            // Transform the data to match the expected format
            const transformedData = {
              rows: leaderboardData.map((user, index) => ({
                id: index + 1,
                userId: user.userId,
                name: user.name,
                streak: user.streak,
                points: user.totalPoints,
                questionsSolved: user.questionsSolved
              }))
            };

            setLeaderboardData(transformedData);
            setUserId(userId);
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#006F6A] dark:border-[#FD7B06]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate("/");
  }

  return (
    <>
      <Header />
      {leaderboardData.rows.length > 0 && <WelcomeBack userData={leaderboardData.rows.find(user => user.userId === userId)} />}
      <ContinueLearning userData={userData} />
      {leaderboardData.rows.length > 0 && <Leaderboard leaderboardData={leaderboardData} userId={userId} />}
      <Footer />
    </>
  );
}

export default User; 