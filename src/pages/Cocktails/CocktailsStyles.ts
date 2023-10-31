import styled from "@emotion/styled";

export const Container = styled.div`
    .loader {
        svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
`;


export const ContainerHeader = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 20px 0;
`;

export const ContainerHeaderLeft = styled.div`
`;

export const ContainerHeaderRight = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    h4 {
        margin: 0;
    }
`;

export const ContainerSubHeader = styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 20px 0;
    input {
        width: 100%;
        height: 40px;
        padding: 0 10px;
        border: 1px solid #333;
        border-radius: 5px;
        outline: none;
    }
    label {
        margin-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        font-size: 20px;
        input.checkbox {
            width: 40px;
            height: 40px;   
        }
    }

`;


export const CocktailFilters = styled.div`
    width: 85%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 20px 0;
    gap: 20px;
`;

export const CocktailFilterFavouriteNot = styled.div`
    padding: 10px 20px;
    border-radius: 25px;
    border: 1px solid #333;
    cursor: pointer;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

export const CocktailFilterFavourite = styled.div`
    padding: 10px 20px;
    border-radius: 25px;
    border: 1px solid #333;
    cursor: pointer;
    background-color: #333;
    color: #fff;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

export const CocktailSort = styled.div`
    padding: 10px 20px;
    border-radius: 25px;
    border: 1px solid #333;
    cursor: pointer;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    svg {
        rotate: 180deg;
    }
    p {
        margin: 0;
    }
    .rotate {
        transform: rotate(180deg);
    }
`;

export const CocktailGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
    width: 70%;
    margin: 0 auto;
    padding: 20px 0;
`;

export const CocktailCard = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    border: 1px solid #33333355;
    border-radius: 5px;
    
    p {
        padding: 0;
        text-align: left;
        margin: 0;
    }
`;


export const CocktailCardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    h3 {
        margin: 0;
    }
`;
