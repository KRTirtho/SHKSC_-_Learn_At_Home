import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '../../../utils/Assets/fontawesome'
import styled from 'styled-components'
import { Color } from '../../../utils/Assets/CSSProps'
import { toFirstLetterUppercase } from '../../../utils/Helpers/functions'

/**
 ** This file includes the header type of
 * @Component Activities
 * @Component Question
 * @Component Teacher Classes Post
 * TODO: Date Formate
  */

type CommonHeadersProps = {
    post_type: string,
    posted_by?: string,
    avatar_url: string,
    date: number | string
}


const CommonHeaders:FC<CommonHeadersProps> = ({post_type, posted_by, avatar_url, date}) => {
    
    const up_post_type:string = toFirstLetterUppercase(post_type)

    
    return (
        <Container>
            {/* Poster Details & post time */}
                <img src={avatar_url} alt=""/>
                {/* Poster details */}
                <PosterContainer>
                    <p>{posted_by}</p>
                    {/*!!! Date will later be well-formatted  */}
                    <pre>{date}</pre>
                </PosterContainer>
                {/* Play Icon */}
                <FontAwesomeIcon size="xs" icon={faPlay}/>
                {/* Post Type?? */}
                <p>{up_post_type}</p>
        </Container>
    )
}

export default CommonHeaders


const Container = styled.div`
    margin-left: 10px;
    display: flex;
    align-items: center;
    img{
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
    }
    p{
        margin-left: 5px;
        color: ${Color.primaryBlue}
    }
`

const PosterContainer = styled.div`
    display: flex;
    margin: 0 5px;
    flex-direction: column;
    p, pre{
        padding: 0;
        margin: 0;
    }
    p{
        font-weight: 600;
        color: ${Color.primaryBlue};
    }
`