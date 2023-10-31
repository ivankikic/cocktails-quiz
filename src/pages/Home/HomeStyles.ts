import styled from "@emotion/styled";

export const Container = styled.div`
    height: 90vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
`;

export const ContainerTitle = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #333;
`;

export const StartButton = styled.div`
margin-top: 100px;
    height: 60px;
    width: 250px;
    background-color: #333;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
    font-size: 20px;
    &:hover {
        background-color: #fff;
        color: #333;
        border: 1px solid #333;
    }
`;