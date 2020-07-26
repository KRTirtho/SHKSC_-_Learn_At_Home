import React, { FC } from 'react'
import { CommonTitle, CommonDescription, PropertyTick } from '../../Static/TypoGraphy'

type QuestionDescriptionProps = {
    title: string,
    description: string,
    student_name: string,
    _class: number,
    section: string,
    class_roll: number,
    subject: string,
    group?: string,
}

const QuestionDescription:FC<QuestionDescriptionProps> = (props) => {
    const {title, description, _class, section, class_roll, subject, group} = props
    
    return (
        <div>
            <CommonTitle>
                {title}
            </CommonTitle>

            <CommonDescription values={description}/>

            {/**
             * !!! This gonna be inside a map() function in future
              */}
            
            <PropertyTick tickKey={"Class"} tickValue={_class}/>
            <PropertyTick tickKey={"Section"} tickValue={section}/>
            <PropertyTick tickKey={"Roll"} tickValue={class_roll}/>
            <PropertyTick tickKey={"Subject"} tickValue={subject}/>
            {group&&<PropertyTick tickKey={"Group"} tickValue={group}/>}
        </div>
    )
}

export default QuestionDescription
