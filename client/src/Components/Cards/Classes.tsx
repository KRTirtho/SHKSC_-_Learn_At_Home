import React, { FC } from 'react'
import ClassDescription from './Description/Classes.description'
import CommonHeaders from './Headers/Common.headers'
import PostFiles from '../Media/PostFiles'
import Threetype from './Review/Threetype'
import { CommonContainer } from '../Static/Containers'
import AdminPostHeader from './Headers/AdminPost.header'
import { TSecondaryCardProps } from './CardPropTypes'


const Classes:FC<TSecondaryCardProps<{chapter: string}>> = ({avatar_url, post_type, date, uploadedBy,
_class, chapter, description, subject, title, group, files}) => {
    return (
        <CommonContainer>
            {/* Header part of the post */}
            {uploadedBy==="admin"?
            <AdminPostHeader 
                avatar_url={avatar_url}
                date={date}
                post_type={post_type}
            />
            :
            <CommonHeaders
             avatar_url={avatar_url}
             post_type={post_type}
             date={date}
             uploadedBy={uploadedBy}
             />}

             {/* Description */}
            <ClassDescription
            _class={_class}
            chapter={chapter}
            description={description}
            subject={subject}
            title={title}
            group={group}
            />

            {/* Files if exists */}
            {files&&<PostFiles
                files={files}
                />}

            {/* Review Buttons */}
            <Threetype/>
        </CommonContainer>
    )
}

export default Classes
