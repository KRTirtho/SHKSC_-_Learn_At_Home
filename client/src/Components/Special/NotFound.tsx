import React from 'react'
import styled from 'styled-components'
import { Color } from '../../utils/Assets/CSSProps'
import { PrimaryButton } from '../Static/Buttons'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <ViewContainer>
            <WrapperContainer>
            <h2>404</h2>
            <h4>Page Not Found</h4>
            <p>The page you're looking for doesn't exist. Please
                enter a valid URL to visit the actual Application.
            </p>
            {/* TODO: Image will be added later */}
            <Link to="/"><PrimaryButton>Go back to site</PrimaryButton></Link>
            </WrapperContainer>
        </ViewContainer>
    )
}

export default NotFound

const ViewContainer = styled.div`
    background-color: ${Color.primaryBackground};
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`

const WrapperContainer = styled.div`
    width: 100%;
    max-width: 30rem;
    padding: 20px;
    text-align: center;
    h2, h4{
        color: ${Color.primaryBlue};
    }
    a{
        margin: auto;
        text-decoration: none;
    }
`