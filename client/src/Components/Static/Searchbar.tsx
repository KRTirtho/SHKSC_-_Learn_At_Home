import styled from "styled-components";
import { HoverActive } from "./HoverActive";
import { ShadowColor, Color } from "../../utils/Assets/CSSProps";

export const Searchbox = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 2.5rem;
    transition: 0.2s all cubic-bezier(0.445, 0.05, 0.55, 0.95);
`

export const Searchbar = styled.input`
    transition: .2s all ease;
    width: 5rem;
    padding: 13px;
    border: none;
    box-shadow: 0 0 7px ${ShadowColor.primaryShadow};
    outline: none;
    border-radius: 50px;
    &:focus{
        width: 10rem;
    }
`
export const Searchbtn = styled(HoverActive)`
    position: absolute;
    right: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background-color: ${Color.primaryBackground};
    color: ${Color.primaryBlue};
    box-shadow: 0 0 5px  ${ShadowColor.primaryShadow};
    transition: 0.2s all cubic-bezier(0.175, 0.885, 0.32, 1.275);
    outline: none;
    svg{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`