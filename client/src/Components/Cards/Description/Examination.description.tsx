import React, { FC } from 'react'
import { CommonTitle, PropertyTick, CommonDescription } from '../../Static/TypoGraphy'
import { group } from '../../../SchemaTypes/schemaTypes'

type ExaminationDescriptionProp = {
    title: string,
    _class: number,
    subject: string,
    group?: group,
    description: string
}

const ExaminationDescription:FC<ExaminationDescriptionProp> = ({title, _class, subject, group, description}) => {
    return (
        <div>
            {/* Title of the examination */}
            <CommonTitle>
                {title}
            </CommonTitle>

            {/* Property Values */}
            <PropertyTick tickKey="Class" tickValue={_class}/>
            <PropertyTick tickKey="Subject" tickValue={subject}/>
            {group&&<PropertyTick tickKey="Group" tickValue={group}/>}

            {/* Description */}
            <CommonDescription values={description}/>
        </div>
    )
}

export default ExaminationDescription
