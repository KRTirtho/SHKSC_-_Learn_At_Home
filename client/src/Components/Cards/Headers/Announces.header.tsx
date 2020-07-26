import React, { FC } from 'react'
import styled from 'styled-components'
import { Color } from '../../../utils/Assets/CSSProps'

type AnnouncesHeaderProps = {
    date: number|string,
    avatar_url: string,
}

const AnnouncesHeader:FC<AnnouncesHeaderProps> = ({date, avatar_url}) => {
    return (
        <Container>
            <img src={avatar_url} alt="announcement"/>
            <h3>Announcement</h3>
            <pre>{date}</pre>
        </Container>
    )
}

export default AnnouncesHeader

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
    }
    h3, pre{
        margin: 0;
        padding: 0;
    }
    h3{
        color: ${Color.primaryBlue};
    }
`