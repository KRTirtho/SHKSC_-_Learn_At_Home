import styled from "styled-components";
import { faPlay } from "../../utils/Assets/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useState } from "react";
import { Color } from "../../utils/Assets/CSSProps";

type TitleProp = {
    center?: boolean
}

export const CommonTitle = styled.h2<TitleProp>`
    font-weight: bold;
    text-align: ${({center})=>center?"center": "left"};
    margin: 10px;
`


type PropertyTickProp = {
    tickKey: string,
    tickValue: string|number
}

const PropertyTickContainer = styled.div`
    display: flex;
    align-items: center;
    p{
        margin: 2px 10px;
        color: ${Color.primaryBlue};
        font-weight: 600;
    }
    svg{
        font-size: 0.6rem;
        margin-right: 5px;
    }
`
export const PropertyTick: FC<PropertyTickProp> = (props)=>{
    const {tickKey, tickValue} = props;
    
    return (
        <PropertyTickContainer>
            {/* Key of the tick */}
            <p>{tickKey}</p>
            <FontAwesomeIcon icon={faPlay}/>
            {/* Separator */}
            
            <span>{tickValue}</span>
        </PropertyTickContainer>
    )
}

export const CommonDescription: FC<{values: string}> = ({values})=>{
    const [showAll, setShowAll] = useState<boolean>(false);

    return (
        <div
        style={{margin: 10}}
        onClick={():void=>{
            setShowAll(!showAll)
        }}>
            {
            !showAll && values.length>150?
            <span>{values.slice(0, 150)}
            <span style={{color: Color.placeholder}}>
            {" "}See More....
                </span>
            </span>
            : values
                }
        </div>
    )
}