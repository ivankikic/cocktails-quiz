import { Container, ContainerTitle, StartButton } from './HomeStyles'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    const handleStart = () => {
        navigate('/quiz')
    }

  return (
    <Container>
        <ContainerTitle>
            <h1>Cocktail Quiz</h1>
        </ContainerTitle>

        <StartButton onClick={handleStart}>
            Start Quiz
        </StartButton>
    </Container>
  )
}

export default Home