import React, { FC } from 'react'
import { CommonContainer } from '../Static/Containers'
import CommonHeaders from './Headers/Common.headers'
import QuestionDescription from './Description/Question.description'
import PostFiles from '../Media/PostFiles'
import Threetype from './Review/Threetype'
import {TSecondaryCardProps} from "./CardPropTypes"

const Questions:FC<TSecondaryCardProps<{class_roll: number}>> = ({
    avatar_url,
    _class,
    class_roll,
    date,
    description,
    group,
    post_type,
    uploadedBy,
    section,
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
                uploadedBy={uploadedBy}
            />

            {/* Description */}
            <QuestionDescription
                _class={_class}
                class_roll={class_roll}
                description={description}
                section={section}
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
