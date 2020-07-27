import React, { FC } from 'react'
import Loader from "react-loader-spinner"
import { Color } from '../utils/Assets/CSSProps'

const ButtonLoader:FC<{show?:boolean|string}> = ({show}) => {
    return (
        <div
            style={{margin: "0 5px", display: show?"block":"none"}}
        >
            <Loader 
                type="Oval"
                color={Color.primaryBlack}
                secondaryColor={Color.secondaryBlue}
                height={15}
                width={15}
            />
        </div> 
    )
}

export default ButtonLoader
