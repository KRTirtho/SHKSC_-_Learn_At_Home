import React, { FC } from 'react'
import { toFirstLetterUppercase } from '../../../utils/Helpers/functions'
import styled from 'styled-components'
import { Color } from '../../../utils/Assets/CSSProps'

type AdminPostHeaderProps = {
    post_type: string,
    date: string | number,
    teacher_name?: string,
    avatar_url: string|null,
}

const AdminPostHeader:FC<AdminPostHeaderProps> = ({post_type, date, teacher_name, avatar_url}) => {
    const upperPostType = toFirstLetterUppercase(post_type)

    return (
        <Container>
            {/* Post Name */}
            <img src={avatar_url??''} alt=""/>
            {/* name of the poster */}
            <div>
            <h3>
                {post_type==="classes"?
                "Online Class"
                :upperPostType}

            </h3>
            <pre>{date}</pre>
            </div>

            {post_type==="classes"
            &&
                <span>by {teacher_name}</span>
            }
        </Container>
    )
}

const Container  = styled.div`
    margin-left: 10px;
    display: flex;
    align-items: center;
    img{
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
    }
    div{
        h3, pre{
            margin: 0;
            padding: 0;
            margin-left: 5px;
       }
       h3{
           color: ${Color.primaryBlue};
       }
    }
    span{
        color: ${Color.primaryBlue};
        margin-left: 5px;
    }
`

export default AdminPostHeader
