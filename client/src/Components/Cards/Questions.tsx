import React, { FC } from 'react'
import { CommonContainer } from '../Static/Containers'
import CommonHeaders from './Headers/Common.headers'
import QuestionDescription from './Description/Question.description'
import PostFiles from '../Media/PostFiles'
import Threetype from './Review/Threetype'

type QuestionProps = {
    avatar_url: string,
    date: string|number,
    post_type: string,
    posted_by: string,
    _class: number,
    class_roll: number,
    description: string,
    section: string,
    student_name: string,
    subject: string,
    title: string,
    group?: string,
    files?: {url: string}[]
}

const Questions:FC<QuestionProps> = ({
    avatar_url,
    _class,
    class_roll,
    date,
    description,
    group,
    post_type,
    posted_by,
    section,
    student_name,
    subject,
    title,
    files
}) => {
    return (
        <CommonContainer>
            {/* Header Part */}
            <CommonHeaders
                avatar_url={avatar_url}
                date={date}
                post_type={post_type}
                posted_by={posted_by}
            />

            {/* Description */}
            <QuestionDescription
                _class={_class}
                class_roll={class_roll}
                description={description}
                section={section}
                student_name={student_name}
                subject={subject}
                title={title}
                group={group}
            />

            {/* Files section */}
            <PostFiles
                files={files}
            />
            {/* Review buttons */}
            <Threetype />
        </CommonContainer>
    )
}

export default Questions
