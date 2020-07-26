import styled from "styled-components"
import { Color, TransitionTime, ShadowColor } from '../../utils/Assets/CSSProps'
import { HoverActive } from "./HoverActive";

export const Button = styled(HoverActive)`
        padding: 5px 10px;
        border-radius: 5px;
        transition: ${TransitionTime.short} all ease;
        border: none;
        `;
        
    // Primary Button
export const PrimaryButton = styled(Button)`
        background: ${Color.primaryBlue};
        color: white;
        `
    // Secondary Button  
export const SecondaryButton = styled(Button)`
        background: ${Color.secondaryBlue};
    `
export const CancelButton = styled(Button)`
        background: ${Color.primaryRed};
`
export const CircularButton = styled(HoverActive)`
        border-radius: 50%;
        background: ${Color.primaryBackground};
        box-shadow: 0 0 7px ${ShadowColor.primaryShadow};
        border: none;
        width: 40px;
        height: 40px;
        outline: none;   
`

export const SemiCircularButton = styled(HoverActive)`
        border-radius: 50px;
        border: none;
        outline: none;
        padding: 5px 15px;
`