import { Container } from "./QuizzesStyles"
import { useState, useEffect } from "react"
import db from '../../server/firebase'
import { collection, query, onSnapshot } from "firebase/firestore";




const Quizzes = () => { 
    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false);
    const [attempts, setAttempts] = useState()

    const handleFetchCocktails = async () => {
        const q = query(collection(db, "attempts"));
        const unSubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc) {
                    setAttempts(doc.data().value)
                }
            });
        });
        return unSubscribe;
    }

    useEffect(() => {
        handleFetchCocktails();
    }, [])

    useEffect(() => {
        let intervalId: any;
        if (isRunning) {
          intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
      }, [isRunning, time]);
    
      const minutes = Math.floor((time % 360000) / 6000);
      const seconds = Math.floor((time % 6000) / 100);

      const startAndStop = () => {
        setIsRunning(!isRunning);
      };
    
      const reset = () => {
        setIsRunning(!isRunning);
        setTime(0);
      };


  return (
    <Container>
        <div className="header">
            <h1>Quiz - {attempts}</h1>
            <div className="stopwatch-container">
                <p className="stopwatch-time">
                    {minutes.toString().padStart(2, "0")}:
                    {seconds.toString().padStart(2, "0")}
                </p>
                <div className="stopwatch-buttons">
                    <button className="stopwatch-button" onClick={startAndStop}>
                    {isRunning ? "Stop" : "Start"}
                    </button>
                    <button className="stopwatch-button" onClick={reset}>
                    Reset
                    </button>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default Quizzes

