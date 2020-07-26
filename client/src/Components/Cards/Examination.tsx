import React, { FC } from 'react'
import { CommonContainer } from '../Static/Containers'
import AdminPostHeader from './Headers/AdminPost.header'
import ExaminationDescription from './Description/Examination.description'
import Twotype from './Review/Twotype'
import PostFiles from '../Media/PostFiles'

type ExaminationProps = {
    avatar_url: string,
    date: string | number,
    post_type: string,
    teacher_name?: string,
    _class: number,
    description: string,
    subject: string,
    title: string,
    group?: string,
    files?: {url: string}[]
}

const Examination:FC<ExaminationProps> = ({avatar_url, date, post_type, teacher_name, _class, description, subject, title, group, files}) => {
    return (
        <CommonContainer>
            {/* Header of the examination type */}
            <AdminPostHeader
                avatar_url={avatar_url}
                date={date}
                post_type={post_type}
                teacher_name={teacher_name}
            />

            {/* Description Part */}
            <ExaminationDescription
                _class={_class}
                description={description}
                subject={subject}
                title={title}
                group={group}
            />

            {/* Files part */}
            <PostFiles
                files={files}
             />

            {/* Review */}
            <Twotype />
            
        </CommonContainer>
    )
}

export default Examination
