import styled from 'styled-components'
import { Color, ShadowColor } from '../../../utils/Assets/CSSProps'

export const ModalBG = styled.div<{open?:boolean}>`
    opacity: ${({open})=>open? 1 : 0};
    visibility: ${({open})=>open? "visible" : "hidden"};
    transition: 0.2s all ease; 
    z-index: 500;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
`

export const ModalCard = styled.div<{open?:boolean}>`
    transform: ${({open})=>open?"scale(1)":"scale(0)"};
    transition: 0.5s transform cubic-bezier(0.075, 0.62, 0.56, 1.4);
    transition-delay: 1s;
    box-shadow: 0 0 10px ${ShadowColor.primaryShadow};
    width: 90%;
    max-width: 30rem;
    background-color: ${Color.secondaryBackground};
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    padding: 10px;
    `

export const ModalHeader = styled.div<{error?:boolean}>`
    color: ${({error})=>error? Color.primaryRed: Color.primaryGreen};
    display: flex;
    width: 100%;
    padding: 0 10px;
    text-align: center;
    position: relative;
    top: 0;
    align-items: center;
`

export const ModalBody = styled.div<{error?:boolean}>`
    text-align: justify;
    margin: 10px;
    color: ${({error})=>error?Color.secondaryRed: Color.secondaryGreen}
`

export const CloseButton = styled.button`
    margin-left: auto;
    margin-right: 20px;
    background-color: none;
    font-size: 1.6rem;
    border: none;
    transition: 0.2s all cubic-bezier(0.075, 0.82, 0.165, 1);
    &:hover{
        filter: brightness(0.9);
    }
    &:active{
        transform: scale(0.96);
    }
`