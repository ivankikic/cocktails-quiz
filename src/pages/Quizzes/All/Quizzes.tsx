import { Container, QuizHeader, QuizzesCard, QuizzesFlex } from "./QuizzesStyles"
import { useState, useEffect } from "react"
import db from '../../../server/firebase'
import { collection, query, onSnapshot } from "firebase/firestore";


type Quiz = {
    id: string;
    name: string;
    result: string;
    createdAt: string;
}

const Quizzes = () => { 
    const [quizzes, setQuizzes] = useState<Quiz[]>([])


    const handleFetchQuizzes = async () => {
        const q = query(collection(db, "quizzes"));
        const unSubscribe = onSnapshot(q, (querySnapshot) => {
            const quizzes: any = [];
            querySnapshot.forEach((doc) => {
                quizzes.push({ ...doc.data(), id: doc.id });
            });
            setQuizzes(quizzes);
        });
        return unSubscribe;
    }

    useEffect(() => {
        handleFetchQuizzes();
    }, [])


  return (
    <Container>
        <QuizHeader>
            <h2>All quizzes</h2>
        </QuizHeader>
        <QuizzesFlex>
                {quizzes.map((quiz: Quiz) => (
                    <QuizzesCard key={quiz.id}>
                        
                    </QuizzesCard>
                ))}
        </QuizzesFlex>
    </Container>
  )
}

export default Quizzes

