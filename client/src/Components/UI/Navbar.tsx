import React, {FunctionComponent} from "react"
import {NavLink} from "react-router-dom"
import styled, { css }  from "styled-components"
import { Color, ShadowColor } from "../../utils/Assets/CSSProps";
// eslint-disable-next-line
import {faHome, faChalkboardTeacher, faMicrophone, faStar, faBookReader} from "../../utils/Assets/fontawesome"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import NavThreshold from "./Navthreshold";
import { HoverActive } from "../Static/HoverActive";

const Navbar: FunctionComponent = ()=>{

  return (
      <NavContainer>
          <NavSecondaryContainer>

            {/* Now adding the content */}
            <IconContainer>
                <NavLink exact activeClassName="active" to="/">
                <FontAwesomeIcon icon={faHome}/>
                <p>Home</p>
                </NavLink>
            </IconContainer>      
            <IconContainer>
                <NavLink activeClassName="active" to="/classes">
                <FontAwesomeIcon icon={faChalkboardTeacher}/>
                <p>Classes</p>
                </NavLink>
            </IconContainer>

            {/* For Circular Navigation */}
            
            <IconContainer>
                <NavLink activeClassName="active" to="/activities">
                <FontAwesomeIcon icon={faStar}/>
                <p>Activities</p>
                </NavLink>
            </IconContainer>

            <IconContainer>
                <NavLink activeClassName="active" to="/announces">
                <FontAwesomeIcon icon={faMicrophone}/>
                <p>Announces</p>
                </NavLink>
            </IconContainer>

            <IconContainer>
                <NavLink activeClassName="active" to="/principal">
                <FontAwesomeIcon icon={faBookReader}/>
                <p>Principal</p>
                </NavLink>
            </IconContainer>

            <NavThreshold/>
          </NavSecondaryContainer>
        </NavContainer>
    )
}

export default Navbar

export const NavContainer = styled.div`
position: fixed;
width: 100%;
background: ${Color.primaryBackground};
box-shadow: 0 0 10px ${ShadowColor.primaryShadow};
bottom: 0;
z-index: 500;
`;

const NavSecondaryContainer = styled.div`
display: flex;
justify-content: space-evenly;
padding-top: 5px;
color: ${Color.primaryBlue};
width: 100%;
@media (max-width: 400px){
    width: 90%;    
}
`
const IconContainer = styled(HoverActive)`
${css`
    transition: 0.2s all ease;
    a{
        text-decoration: none;
        color: ${Color.primaryBlue};
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    a svg{
    font-size: 1.15rem;
    }
    a p{
    font-size: .7rem;
    line-height: 0;
    }
    svg{
            color: transparent;
        path{
            stroke: ${Color.primaryBlue};
            stroke-width: 2rem;
        }

    }
    .active{
        svg{
            color: ${Color.primaryBlue};
            path{
                stoke: #00000000;
            }
        }
    }
`
}
`