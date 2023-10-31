import { GlobalStyles } from './global';
import Home from './pages/Home/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cocktails from './pages/Cocktails/Cocktails';
import Header from './components/Header/Header'
import Quizzes from './pages/Quizzes/Quizzes';


function App() {

  return (
    <>
      <Router>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-cocktails" element={<Cocktails />} />
          <Route path="/quiz" element={<Quizzes />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
