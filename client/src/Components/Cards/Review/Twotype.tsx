import React, { FC } from 'react'
import styled from 'styled-components';
import { SemiCircularButton } from '../../Static/Buttons';
import { Color } from '../../../utils/Assets/CSSProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb, faBookmark } from '../../../utils/Assets/fontawesome';


const Twotype: FC = ()=> {
    return (
        <ReviewContainer>
            <ReviewButton>
                <FontAwesomeIcon icon={faBomb}/>
                <span>1K</span>
            </ReviewButton>
            <ReviewButton>
                <FontAwesomeIcon icon={faBookmark}/>
            </ReviewButton>
        </ReviewContainer>
    )
}

export default Twotype;

export const ReviewContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;   
`
export const ReviewButton = styled(SemiCircularButton)`
    background-color: ${Color.secondaryBackground};
    svg{
        color: ${Color.placeholder}
    }
    ` 