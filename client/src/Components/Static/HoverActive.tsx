import styled from "styled-components";


export const HoverActive = styled.div`
    cursor: pointer;
    user-select: none;
    transition: 0.2s all ease;
    @media (hover:hover){
    &:hover{
       filter: brightness(0.9) 
    }
    }
    &:active{
        filter: brightness(0.96);
        transform: scale(0.96);
    }
`