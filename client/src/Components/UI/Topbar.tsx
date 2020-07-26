import React, { useState } from 'react'
import styled, { css } from 'styled-components';
import { ShadowColor, Color } from '../../utils/Assets/CSSProps'
import { Searchbox, Searchbtn, Searchbar } from "../Static/Searchbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from "../../utils/Assets/fontawesome"

/**
 * @description This Component Renders the Top Bar of the PWA.
  Which contains BRAND_LOGO , SEARCH_BAR
  */

const Topbar: React.FC = () => {
    const [search, setSearch] = useState<string | number>("");

    return (
        <TopbarContainer>
            {/* Place for the Brand Logo & Text */}
            <Brand>
                HELLO
            </Brand>
            <Searchbox>
                <Searchbar type="search" value={search} onChange={(e:any):void=>{
                    setSearch(e.target.value)
                    }} placeholder="Search..."/>
                  <Searchbtn>
                    <FontAwesomeIcon icon={faSearch}/>
                  </Searchbtn>
            </Searchbox>
        </TopbarContainer>
    )
}

export default Topbar;


const TopbarContainer = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    padding: 5px 20px;
    display: flex;
    background-color: ${Color.primaryBackground};
    box-shadow: 0 0 10px ${ShadowColor.primaryShadow};
    z-index: 500;
    `

const Brand = styled.div`
    display: flex;
    font-size: 1.5rem;
    ${css`
        img{
            height: 5rem;
            width: 5rem;
        }
    `}
`
