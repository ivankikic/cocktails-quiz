import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    * {
        margin: 0;
    }
    .endGame {
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 40px auto;
        margin-bottom: 70px;
    }
    .startGame {
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 40px auto;
        margin-bottom: 70px;
    }

    .cocktailName {
        text-transform: capitalize;
        font-size: 18px;
    }
`;

export const QuizHeader = styled.div`   
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 20px 0;
    p {
        color: #777;
    }
`;

export const QuizBody = styled.div`
    width: 70%;
    margin: 0 auto;
`;

export const QuizQuestion = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 20px 0;
    gap: 10px;
    h2 {
        margin-bottom: 20px;
        text-transform: capitalize;
    }
    input {
        padding: 10px;
        border: 1px solid #333;
        border-radius: 5px;
        outline: none;
        width: 100%;
        margin: 5px 0;
    }
    button {
        margin-top: 30px;
    }
`;

export const QuizAnswer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-bottom: 1px solid #333;
    margin-bottom: 10px;
    gap: -2px;
`;