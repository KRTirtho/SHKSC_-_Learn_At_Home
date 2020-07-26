import React from 'react'
import Loader from "react-loader-spinner"
import { Color } from '../utils/Assets/CSSProps'
import styled from 'styled-components'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const Fallback = () => {
    return (
        <FallbackContainer>
            <Loader
                type="MutatingDots"
                color={Color.primaryBlue}
                secondaryColor={Color.secondaryBlue}
                height={100}
                width={100}
              />
        </FallbackContainer>
    )
}

export default Fallback

const FallbackContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`