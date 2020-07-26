import React, { FC, ButtonHTMLAttributes, ImgHTMLAttributes, InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { Color } from "../../utils/Assets/CSSProps";
import { HoverActive } from "./HoverActive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "../../utils/Assets/fontawesome";

type CommonInputProps<T extends{}> = T& {
    error?: string|boolean,
    touched?:boolean,
}

export const Input = styled.input<CommonInputProps<{icon?:boolean}>>`
    width: 90%;
    margin: 10px 0;
    padding: 10px;
    padding-left: ${({icon})=>icon? "2rem": "10px"};
    border: ${({error, touched})=>error&&touched?"1px solid "+Color.primaryRed:"none"};
    border-radius: 10px;
    background-color: ${Color.secondaryBackground};
    &:focus{
        &::placeholder{
            transition: 0.2s all ease;
            font-size: 0.8rem;
        }
    }
`
export const InputErrorMessage = styled.p`
    position: absolute;
    left: 50%;
    bottom: -25%;
    transform: translateX(-50%);
    color: ${Color.primaryRed};
    font-size: 0.7rem;
    width: 90%;
` 
  const IconContainer = styled.div`
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      svg{
          font-size: 0.8rem;
          color: transparent;
          stroke: ${Color.placeholder};
          stroke-width: 5rem;
      }
  `  

interface InputWithErrorProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string|boolean,
    touched?: boolean,
    icon?: JSX.Element
}
  

export const InputWithError: FC<InputWithErrorProps> = ({error, touched, icon, ...rest})=>{
    return (
        <div style={{position: "relative"}}>
            <IconContainer>
                {icon}
            </IconContainer>
            <Input error={error} icon={icon?true:false} touched={touched} {...rest}/>
            {
                error&&touched&&<InputErrorMessage>{error}</InputErrorMessage>
            }
        </div>
    )
}

export const SubmitButtonStyle = styled(HoverActive)`
    background-color: ${Color.primaryGreen};
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    transition: 0.2s all ease;
    color: ${Color.primaryBackground};
    margin: 10px;
`
export const SubmitButton: FC<InputHTMLAttributes<HTMLInputElement>> = ({...rest})=>{
    return (
        <SubmitButtonStyle {...rest} as="input"/>
    )
}

export const FormContainer = styled.div`
  max-width: 30rem;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CommonForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InputWithLabelContainer = styled.div<CommonInputProps<{}>>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    label{
        color: ${({error, touched})=>error&&touched?Color.primaryRed:Color.primaryBlue};
        font-weight: 600;
    }
`
type InputWithLabelProps<T> =  React.InputHTMLAttributes<HTMLInputElement> & CommonInputProps<T>

export const InputWithLabels:FC<InputWithLabelProps<{label?: string}>> = ({label, error, touched, ...rest})=>{
    const random = Date.now()/Math.random();
    return (
        <InputWithLabelContainer error={error} touched={touched}>
        <label htmlFor={"input-with-label"+random}>{label}</label>
            <InputWithError
                autoComplete="off"
                spellCheck="true"
                id={"input-with-label"+random}
                error={error}
                touched={touched}
                {...rest}
            />
        </InputWithLabelContainer>
    )
}

export const HorizontalContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
    @media(min-width: 500px){
        flex-direction: row;
        width: 100%;
        justify-content: space-evenly;
        align-items: center;
    }
`

const BackButtonStyle = styled(HoverActive)`
    margin: 0 10px;
    margin-right: auto;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: none;
    background-color: ${Color.secondaryBackground};
`
export const BackButton:FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({onClick})=>{
    return (
        <BackButtonStyle type="button" onClick={onClick} as="button" ><FontAwesomeIcon icon={faLongArrowAltLeft}/></BackButtonStyle>
    )
}

export const TransitionWrapper = styled.div`
    width: 100%;
`

const BrandImageContainer = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1, h4{
        color: ${Color.primaryBlue};
        margin: 5px;
    }
`
const BrandLogoImage = styled.img`
    height: auto;
    width: 7rem;
    border-radius: 50%;
`
type BrandProps<T={}> = T & {
    brand?: string;
    subTitle?: string;
}

export const Brand:FC<BrandProps<ImgHTMLAttributes<HTMLImageElement>>> = ({brand, subTitle, ...rest})=>{
    return(
        <BrandImageContainer>
            <BrandLogoImage {...rest}/>
            <h1>{brand}</h1>
            <h4>{subTitle}</h4>
        </BrandImageContainer>
    )
}

/* This is a wrapper component which can be used to wrap the form elements inside & use
    only to wrap the component & center them for sliding transition. This all with full 
    height & width of the view & will get moved by transition. So don't need to worry about 
    descendent positioning. Descendent will be free to move as it won't effect the transition.
    TODO: Need to change the position property in App.css slide-(...) & slide-second-(...)
  */

export const TransitionSlideParent = styled.div<{noVerticalCenter?:boolean, minHeight?: number}>`
    /* For self */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    margin: 0;
    box-sizing: border-box;
    overflow-x: hidden;
    /* For Descendants */
    display: flex;
    justify-content: center;
    ${({noVerticalCenter: noHorizontalCenter, minHeight: maxHeight})=>{
        return (
            noHorizontalCenter&&maxHeight?
            css`
                    align-items: center;
                @media(max-height: ${maxHeight}px){
                    align-items: flex-start;
                }
            `:noHorizontalCenter&&!maxHeight?
            css`
                align-items: flex-start;
            `:
            css`
                align-items: center;
            `
            )
    }}
` 

