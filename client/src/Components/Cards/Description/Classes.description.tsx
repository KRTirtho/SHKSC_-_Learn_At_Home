import React, { FC } from 'react'
import {PropertyTick, CommonTitle, CommonDescription} from "../../Static/TypoGraphy"

type ClassDescriptionProps = { 
    title: string,
    description: string,
    _class: number,
    subject: string,
    chapter: string,
    group?: string
}

const ClassDescription:FC<ClassDescriptionProps> = ({title, description, _class, subject, chapter, group}) => {
    return (
        <div>
            {/* Title */}
            <CommonTitle>
                {title}
            </CommonTitle>
            
            {/**
             *!!! This will be a map()
              */}

            <PropertyTick tickKey="Class" tickValue={_class}/>
            <PropertyTick tickKey="Subject" tickValue={subject}/>
            <PropertyTick tickKey="Chapter" tickValue={chapter}/>
            {group && <PropertyTick tickKey="Group" tickValue={group}/>}
            {/* !!! */}

            {/* Description Part */}
            <CommonDescription values={description}/>
        </div>
    )
}

export default ClassDescription
