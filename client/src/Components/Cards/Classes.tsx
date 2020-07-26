import React, { FC } from 'react'
import ClassDescription from './Description/Classes.description'
import CommonHeaders from './Headers/Common.headers'
import PostFiles from '../Media/PostFiles'
import Threetype from './Review/Threetype'
import { CommonContainer } from '../Static/Containers'
import AdminPostHeader from './Headers/AdminPost.header'


type ClassesProps = {
    avatar_url: string,
    post_type: string,
    date: string|number,
    posted_by?: string,
    _class: number,
    chapter: string,
    description: string,
    subject: string,
    title: string,
    group?: string,
    teacher_name?: string,
    files?: {url: string}[]
}

const Classes:FC<ClassesProps> = ({avatar_url, post_type, date, posted_by,
_class, chapter, description, subject, title, group, files, teacher_name}) => {
    return (
        <CommonContainer>
            {/* Header part of the post */}
            {posted_by==="admin"?
            <AdminPostHeader 
                avatar_url={avatar_url}
                date={date}
                post_type={post_type}
                teacher_name={teacher_name}
            />
            :
            <CommonHeaders
             avatar_url={avatar_url}
             post_type={post_type}
             date={date}
             posted_by={posted_by}
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
