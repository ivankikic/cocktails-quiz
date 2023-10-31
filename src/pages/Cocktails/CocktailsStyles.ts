import styled from "@emotion/styled";

export const Container = styled.div`

    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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
