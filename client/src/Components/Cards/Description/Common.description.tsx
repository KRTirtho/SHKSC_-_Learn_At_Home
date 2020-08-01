import React, { FC } from 'react'
import { CommonTitle, CommonDescription } from '../../Static/TypoGraphy'
import { postType } from '../../../SchemaTypes/schemaTypes'

/**
 * @description This Component includes the basic description layout of card including=>
 * @Component Principal 
 * @Component Announces
 * @Component Activities
  */

type CommonProps = {
    post_type: postType,
    title: string,
    description: string,
}

const CommonDescriptionDOM:FC<CommonProps> = ({post_type, title, description}) => {
    return (
        <div>
            {/* Title of the post */}
            <CommonTitle center={post_type===postType.principal||post_type===postType.announcement}>
                {title}
            </CommonTitle>
            {/* Description of the post */}
            <CommonDescription values={description}/>
            {/*  */}
        </div>
    )
}

export default CommonDescriptionDOM