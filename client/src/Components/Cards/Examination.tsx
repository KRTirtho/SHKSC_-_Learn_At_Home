import React, { FC } from 'react'
import { CommonContainer } from '../Static/Containers'
import AdminPostHeader from './Headers/AdminPost.header'
import ExaminationDescription from './Description/Examination.description'
import Twotype from './Review/Twotype'
import PostFiles from '../Media/PostFiles'
import { TSecondaryCardProps } from './CardPropTypes'


const Examination:FC<TSecondaryCardProps> = ({avatar_url, date, post_type,  _class, description, subject, title, group, files}) => {
    return (
        <CommonContainer>
            {/* Header of the examination type */}
            <AdminPostHeader
                avatar_url={avatar_url}
                date={date}
                post_type={post_type}
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
