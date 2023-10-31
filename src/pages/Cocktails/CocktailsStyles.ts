import styled from "@emotion/styled";

export const Container = styled.div`
::selection {
    color: #000001;
    background: #000000;
}
    
`;

export const CocktailCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    border: 1px solid #333;
    p {
        padding: 0;

        margin: 0;
    }
    ::selection {
        color: #000001;
        background: #000000;
    }
`;
