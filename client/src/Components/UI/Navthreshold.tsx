import React, {FunctionComponent, useState, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// eslint-disable-next-line
import {faPlus, faBookOpen, faQuestion, faUser, faWrench} from "../../utils/Assets/fontawesome"
import styled, { css } from 'styled-components'
import { CircularButton } from '../Static/Buttons'
import "./Navthreshold.css"
import { Link } from 'react-router-dom'
import { Color } from '../../utils/Assets/CSSProps'
import useOnClickOutSide from '../../utils/Hooks/useOnClickOutSide'

const NavThreshold: FunctionComponent = () => {
    const [open, setOpen] = useState<boolean>(false);
    const thresholdRef:any = useRef();

    useOnClickOutSide(["click", "mousedown", "touchstart"], thresholdRef, ()=>{
        setOpen(false)
    })
    
    return (
        <div>
            {/* Menu Items */}
            <MenuSkeleton ref={thresholdRef}>
            <div className={open?"circular-menu active": "circular-menu"}>
            <ThresholdButton onClick={()=>setOpen(!open)}>
                <FontAwesomeIcon icon={faBookOpen} />
            </ThresholdButton>

            <menu className="items-wrapper">
            <Link to={`/${"someUserId"}/profile`}>
            <MenuItem className="menu-item menu-item-1">
                <FontAwesomeIcon icon={faUser}/>
            </MenuItem>
            </Link>
            <Link to="/questions">
            <MenuItem className="menu-item menu-item-2">
                <FontAwesomeIcon icon={faQuestion}/>
            </MenuItem>
            </Link>
            <Link to="/examination">
            <MenuItem className="menu-item menu-item-3">
                {/* <FontAwesomeIcon/> */}
            </MenuItem>
            </Link>
            <Link to="/settings">
            <MenuItem className="menu-item menu-item-4">
                <FontAwesomeIcon icon={faWrench}/>
            </MenuItem>
            </Link>
            <Link to="/post/select-post_type">
            <MenuItem className="menu-item menu-item-5">
                <FontAwesomeIcon icon={faPlus}/>
            </MenuItem>
            </Link>
            </menu>

            </div>
            </MenuSkeleton>
        </div>
    )
}


export default NavThreshold


const ThresholdButton = styled(CircularButton)`
position: relative;
transform: translateY(-10px);
transition: .2s transform ease;
z-index: 5;
${css`
    svg{
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -60%); 
    }
`}
`;

const MenuSkeleton = styled.div`
    position: absolute;
    top: -350%;
    right: 0;
    width: 10rem;
    margin-right: 10px;
`

const MenuItem = styled(CircularButton)`
    position: absolute;
    /* right: 50%;
    transform: translate(-50% -100%); */
    /* z-index: -1; */
    display: block;
    text-decoration: none;
    font-size: 1em;
    ${css`
    svg{
        position: relative;
        left: 50%;
        top: 50%;
        color: ${Color.primaryBlue};
        transform: translate(-50%, -60%); 
    }
`}   
`