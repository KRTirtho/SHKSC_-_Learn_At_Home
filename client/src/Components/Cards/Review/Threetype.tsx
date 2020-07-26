import React from 'react'
import { ReviewContainer, ReviewButton } from './Twotype'
import { faComment, faBomb, faBookmark } from '../../../utils/Assets/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Threetype = () => {
    return (
        <ReviewContainer>
            <ReviewButton>
                <FontAwesomeIcon icon={faBomb}/>
                <span>1K</span>
            </ReviewButton>
            <ReviewButton>
                <FontAwesomeIcon icon={faComment}/>
                <span>1K</span>
            </ReviewButton>
            <ReviewButton>
                <FontAwesomeIcon icon={faBookmark}/>
            </ReviewButton>
        </ReviewContainer>
    )
}

export default Threetype
