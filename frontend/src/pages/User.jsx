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

// TODO: Replace with actual data
const leaderboardData = {
  rows: [
    { id: 1, name: "Usama", streak: 13, points: 174, questionsSolved: 51 },
    { id: 2, name: "Sarah", streak: 21, points: 315, questionsSolved: 78 },
    { id: 3, name: "Mohammed", streak: 8, points: 145, questionsSolved: 41 },
    { id: 4, name: "Fatima", streak: 12, points: 198, questionsSolved: 55 },
    { id: 5, name: "Omar", streak: 19, points: 287, questionsSolved: 71 },
    { id: 6, name: "Noor", streak: 7, points: 134, questionsSolved: 38 },
    { id: 7, name: "Khalid", streak: 16, points: 245, questionsSolved: 64 },
    { id: 8, name: "Layla", streak: 11, points: 178, questionsSolved: 49 },
    { id: 9, name: "Hassan", streak: 14, points: 212, questionsSolved: 58 },
    { id: 10, name: "Aisha", streak: 23, points: 342, questionsSolved: 85 },
    { id: 11, name: "Yusuf", streak: 9, points: 156, questionsSolved: 44 },
    { id: 12, name: "Zainab", streak: 17, points: 267, questionsSolved: 68 },
    { id: 13, name: "Ali", streak: 13, points: 201, questionsSolved: 53 },
    { id: 14, name: "Mariam", streak: 10, points: 167, questionsSolved: 46 },
    { id: 15, name: "Ibrahim", streak: 18, points: 278, questionsSolved: 69 }
  ]
}

function User() {
  return (
    <>
      <Header />
      <WelcomeBack userData={userData} />
      <ContinueLearning userData={userData} />
      <Leaderboard leaderboardData={leaderboardData} userData={userData} />
      <Footer />
    </>
  );
}

export default User; 