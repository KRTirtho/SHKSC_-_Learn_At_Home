import React, { FC } from 'react'
import PrincipalHeaders from './Headers/Principal.headers'
import CommonHeaders from './Headers/Common.headers'
import AnnouncesHeader from './Headers/Announces.header'
import CommonDescriptionDOM from './Description/Common.description'
import Threetype from './Review/Threetype'
import Twotype from './Review/Twotype'
import PostFiles from '../Media/PostFiles'
import { CommonContainer } from '../Static/Containers'

/**
 ** This Component includes
 * @Component Activities
 * @Component Principal
 * @Component Announces
  */
type CommonProps = {
    post_type: string,
    title: string,
    description: string,
    date: number|string,
    posted_by?: string,
    avatar_url: string,
    files?: {url: string}[]
}

const Common:FC<CommonProps> = props => {
    const {post_type, title, description, date, posted_by, avatar_url, files} = props
    
    return (
        <CommonContainer>
            {/* The header part */}
            {post_type==="principal"?
             <PrincipalHeaders
                avatar_url={avatar_url}
                date={date}
            />: post_type==="announces"?
            <AnnouncesHeader
                avatar_url={avatar_url}
                date={date}
            />
            :<CommonHeaders
                avatar_url={avatar_url}
                date={date}
                post_type={post_type}
                posted_by={posted_by&&posted_by}
            />
            }
            {/* Post Description */}
            <CommonDescriptionDOM
                post_type={post_type}
                description={description}
                title={title}
             />

             {/* File */}
             {files && <PostFiles files={files}/>}

             {/* Comment, bookmark, ask & Bomb  */}
            {
                post_type==="activities"?
                <Threetype/>:
                <Twotype/>
            }
            
        </CommonContainer>
    )
}

export default Common
