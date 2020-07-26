import React, { FC } from 'react'
import styled from 'styled-components'
import { Color } from '../../../utils/Assets/CSSProps'

type PrincipalHeadersProps = {
    avatar_url: string,
    date: number | string
}

const PrincipalHeaders:FC<PrincipalHeadersProps> = ({date, avatar_url}) => {
    return (
        <Container>
            <img src={"./favicon.ico"} alt="principal"/>
            <h3>Principal</h3>
            <pre>{date}</pre>
        </Container>
    )
}

export default PrincipalHeaders

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    h3, pre{
        margin: 0;
        padding: 0;
    }
    h3{
        color: ${Color.primaryBlue}
    }
    img{
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
    }
`