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
`;

export const QuizHeader = styled.div`   
    width: 70%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 auto;
    padding: 20px 0;
`;

export const QuizzesFlex = styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 20px;
`;

export const QuizzesCard = styled.div`
    width: 60%;
    height: 100px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    padding: 5px 10px;
    border: 1px solid #333;
    border-radius: 5px;
    cursor: pointer;
    p {
        font-size: 12px;
        color: #aaa;
        margin: 0;
        margin-bottom: 15px;
    }
    div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        gap: 10px;
        p {
            margin: 0;
        }
    }
`;