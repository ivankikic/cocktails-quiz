import { Container, QuizAnswer, QuizBody, QuizHeader, QuizQuestion } from "./NewQuizStyles"
import { collection, query, onSnapshot } from "firebase/firestore";
import db from '../../../server/firebase'
import {useState, useEffect} from 'react'
import { Button } from "react-bootstrap";

type cocktailType = { id: string, name: any, ingredients: [], glass: [], method: [], ice: [], garnish:[] }

type answerType = { 
    ingredients: string[], 
    glass: string[], 
    method: string[], 
    ice: string[], 
    garnish: string[]
}

const NewQuiz = () => {
    const [cocktails, setCocktails] = useState<cocktailType[] | any>([]);
    const [favCocktails, setFavCocktails] = useState<cocktailType[] | any>([]);
    const [gameStarted, setGameStarted] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<answerType[]>([])
    const [correctAnswers, setCorrectAnswers] = useState<answerType[]>([]);
    const [results, setResults] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const getCocktails = async () => {
            const q = query(collection(db, "cocktails"));
            const unSubscribe = onSnapshot(q, (querySnapshot) => {
            let cocktails: cocktailType[] = [];
            querySnapshot.forEach((doc) => {
                if(doc.data().favourite === true) {
                    cocktails.push({ id: doc.id, name: doc.data().name, ingredients: doc.data().ingredients, glass: doc.data().glass, method: doc.data().method, ice: doc.data().ice, garnish: doc.data().garnish });
                }
            });
            setFavCocktails(cocktails);
            cocktails = cocktails.sort(() => Math.random() - 0.5);
            cocktails = cocktails.slice(0, 10);
    
            setCocktails(cocktails);
        });
        return unSubscribe;
            
        }
        getCocktails();
    }, []);

    const startGame = () => {
        const shuffledCocktails = cocktails.sort(() => Math.random() - 0.5);
        setCocktails(shuffledCocktails);
        setCorrectAnswers(shuffledCocktails.map((cocktail: cocktailType) => ({ ingredients: cocktail.ingredients, glass: cocktail.glass, method: cocktail.method, ice: cocktail.ice, garnish: cocktail.garnish })));
        setGameStarted(true)
        setCurrentQuestion(0)
        setResults([])
        setAnswers([])
    }


    const endGame = () => {
        let correctCount = 0;
        const newResults: JSX.Element[] = [];
        answers.forEach((answer, index) => {
            const correctAnswer = correctAnswers[index];
            let isCorrect = true;
            const result: JSX.Element[] = [
                <span key="question">Question {index + 1}: <b className="cocktailName">{cocktails[index].name}</b> </span>
            ];
            const arraysEqual = (a: any[], b: any[]) => {
                if (a.length !== b.length) return false;
                let sortedA = a.map(i => String(i).toLowerCase()).sort();
                let sortedB = b.map(i => String(i).toLowerCase()).sort();
                return JSON.stringify(sortedA) === JSON.stringify(sortedB);
            }
            Object.keys(answer).forEach((key: any) => {
                const answerKey = key as keyof answerType;
                if (Array.isArray(answer[answerKey]) && Array.isArray(correctAnswer[answerKey])) {
                    if (!arraysEqual(answer[answerKey], correctAnswer[answerKey])) {
                        isCorrect = false;
                    }
                } else if (answer[answerKey] !== correctAnswer[answerKey]) {
                    isCorrect = false;
                }
                result.push(
                    <QuizAnswer key={index}>
                        <span>
                            <span style={{color: answer[answerKey] === correctAnswer[answerKey] ? 'green' : 'red'}}>Your answer: </span>
                            {Array.isArray(answer[answerKey]) ? ((answer[answerKey] as unknown) as string[]).join(', ') : answer[answerKey]}
                        </span>
                        <span>Correct answer: {Array.isArray(correctAnswer[answerKey]) ? ((correctAnswer[answerKey] as unknown) as string[]).join(', ') : correctAnswer[answerKey]}</span>
                    </QuizAnswer>
                );
            });
            result.push(<div key="result">{isCorrect ? " Correct" : " Incorrect"}</div>);
            if (isCorrect) {
                correctCount++;
            }
            newResults.push(<pre key={index} style={{margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}>{result}</pre>);
        });
        newResults.push(<div key={answers.length}>You answered correctly {correctCount} out of {answers.length} questions.</div>);
        setResults(newResults);
        setGameStarted(false);
    }

    return (
        <Container>
            <QuizHeader>
                <h2>New quiz</h2>
                <p>You have chosen: {favCocktails.length} cocktails.</p>
            </QuizHeader>
            <QuizBody>
                {!gameStarted ? (
                    <div className="startGame">

                        {favCocktails.length > 0 ? <Button variant="primary" onClick={startGame}>New Game</Button> : <p>You have no favourite cocktails.</p>}
                    </div>
                ) : (
                    <>
                        {currentQuestion < cocktails.length ? (
                            <QuizQuestion key={cocktails[currentQuestion].id}>
                                <h2>{cocktails[currentQuestion].name}</h2>
                                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.currentTarget);

                                    const formatInput = (input: string) => {
                                        return input.split(/[\/,]|\sor\s/).map(item => item.trim().toLowerCase());
                                    }

                                    const formattedDataIngredients = formatInput(formData.get('ingredients') as string);
                                    const formattedDataGlass = formatInput(formData.get('glass') as string);
                                    const formattedDataMethod = formatInput(formData.get('method') as string);
                                    const formattedDataIce = formatInput(formData.get('ice') as string);
                                    const formattedDataGarnish = formatInput(formData.get('garnish') as string);

                                    const NewAnswer: answerType = {
                                        ingredients: formattedDataIngredients,
                                        glass: formattedDataGlass,
                                        method: formattedDataMethod,
                                        ice: formattedDataIce,
                                        garnish: formattedDataGarnish,
                                    };
                                        setAnswers([...answers, NewAnswer]);
                                        setCurrentQuestion(currentQuestion + 1);
                                    }}>
                                    <input autoComplete="off" aria-autocomplete="none" name="ingredients" placeholder="Ingredients" />
                                    <input autoComplete="off" aria-autocomplete="none" name="glass" placeholder="Glass" />
                                    <input autoComplete="off" aria-autocomplete="none" name="method" placeholder="Method" />
                                    <input autoComplete="off" aria-autocomplete="none" name="ice" placeholder="Ice" />
                                    <input autoComplete="off" aria-autocomplete="none" name="garnish" placeholder="Garnish" />
                                    <Button variant="primary" type="submit">Next Question</Button>
                                </form>
                            </QuizQuestion>
                        ) : (
                            <div className="endGame">
                                <Button variant="danger" onClick={endGame}>End Game</Button>
                            </div>
                        )}
                    </>
                )}
                {results}
            </QuizBody>
        </Container>
    )
}

export default NewQuiz