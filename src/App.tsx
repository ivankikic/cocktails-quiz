import { GlobalStyles } from './global';
import Home from './pages/Home/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cocktails from './pages/Cocktails/Cocktails';
import Header from './components/Header/Header'
import Quizzes from './pages/Quizzes/All/Quizzes';
import NewQuiz from './pages/Quizzes/New/NewQuiz';


function App() {

  return (
    <>
      <Router>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-cocktails" element={<Cocktails />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/new-quiz" element={<NewQuiz />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
