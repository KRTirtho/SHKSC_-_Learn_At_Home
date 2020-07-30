import styled from "styled-components"
import { Color } from "../../utils/Assets/CSSProps"

export const CommonContainer = styled.div`
display: flex;
padding: 10px 0;
flex-direction: column;
background-color: ${Color.primaryBackground};
width: 100%;
&:first-child{
    border-top: 1px solid ${Color.cardBorder};
}
border-bottom: 1px solid ${Color.cardBorder};
@media (min-width: 500px){
    margin: 2rem 0;
    border-radius: 10px;
    width: 30rem;
    border: 1px solid ${Color.cardBorder};
}
`

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export const FlexCenterContainer = styled.pattern`
    display: flex;
    justify-content: center;
    align-items: center;
`