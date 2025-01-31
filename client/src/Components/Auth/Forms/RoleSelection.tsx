import React, { FC } from 'react'
import { BackButton, TransitionSlideParent } from '../../Static/Forms'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '../../../utils/Assets/fontawesome'
import styled from 'styled-components'
import { Color } from '../../../utils/Assets/CSSProps'
import { useHistory } from 'react-router-dom'
import { roleValue } from '../../../SchemaTypes/schemaTypes'
import { SelectionOptions } from '../../Static/Buttons'

const RoleSelection:FC = ()=>{

    const history = useHistory()
    
    const gotoSignUp = (role:roleValue)=>{
        history.push("signup", role)
    }
    
    return(
            <TransitionSlideParent>
            <RoleSelectionContainer>
                {/* Header Text */}
                <RoleHeaderText>
                <BackButton onClick={()=>history.goBack()}/>
                    Select What You Are
                </RoleHeaderText>
                {/* Selection Buttons */}
                <RoleBody>
                    <RoleOption onClick={()=>gotoSignUp(roleValue.teacher)}>
                        <img src="./Assets/TeacherIcon.svg" alt=""/>
                         Teacher <FontAwesomeIcon icon={faAngleRight}/></RoleOption>
                    <RoleOption onClick={()=>gotoSignUp(roleValue.student)}>
                        <img src="./Assets/StudentIcon.svg" alt=""/>
                        Student <FontAwesomeIcon icon={faAngleRight}/></RoleOption>
                </RoleBody>
            </RoleSelectionContainer>
            </TransitionSlideParent>
    )
}

const RoleSelectionContainer=styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    `

const RoleHeaderText = styled.p`
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    color: ${Color.primaryBlue};
    text-align: center;
`

const RoleBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px 10px;
`

const RoleOption = styled(SelectionOptions)`
    background-color: #ffd17c;
    color: #c15e30;
    svg{
        margin-left: auto;
    }
    img{
        margin-right: 10px;
        width: 3rem;
        height: auto;
        border-radius: 50%;
    }
    &:last-child{
        background-color: #f1ae30;
    }
`


export default RoleSelection
