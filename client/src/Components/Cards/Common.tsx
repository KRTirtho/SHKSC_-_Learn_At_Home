import React, { FC } from 'react'
import PrincipalHeaders from './Headers/Principal.headers'
import CommonHeaders from './Headers/Common.headers'
import AnnouncesHeader from './Headers/Announces.header'
import CommonDescriptionDOM from './Description/Common.description'
import Threetype from './Review/Threetype'
import Twotype from './Review/Twotype'
import PostFiles from '../Media/PostFiles'
import { CommonContainer } from '../Static/Containers'
import { postType } from '../../SchemaTypes/schemaTypes'
import { ICommonCardProps } from './CardPropTypes'

/**
 ** This Component includes
 * @Component Activities
 * @Component Principal
 * @Component Announces
  */
const Common:FC<ICommonCardProps> = props => {
    const {post_type, title, description, date, uploadedBy, avatar_url, files} = props
    
    return (
        <CommonContainer>
            {/* The header part */}
            {post_type===postType.principal?
             <PrincipalHeaders
                avatar_url={avatar_url}
                date={date}
            />: post_type===postType.announcement?
            <AnnouncesHeader
                avatar_url={avatar_url}
                date={date}
            />
            :<CommonHeaders
                avatar_url={avatar_url}
                date={date}
                post_type={post_type}
                uploadedBy={uploadedBy&&uploadedBy}
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
