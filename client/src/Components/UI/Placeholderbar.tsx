import React, { FC } from 'react'
import { TopbarContainer } from './Topbar'
import styled from 'styled-components'
import { Color } from '../../utils/Assets/CSSProps'
import { BackButton } from '../Static/Forms'
import { useHistory } from 'react-router-dom'

const Placeholderbar:FC<{barTitle: any}> = ({barTitle}) => {
    const history = useHistory()
    
    return (
        <PBarContainer>
            <section>
            <PBarBackButton onClick={()=>history.goBack()}/>
            <PBarTitle>
                {barTitle}
            </PBarTitle>
            </section>
        </PBarContainer>
    )
}

export default Placeholderbar


const PBarContainer = styled(TopbarContainer)`
    background-color: ${Color.primaryBlue};
    padding: 0;
    color: white;
    section{
        display: flex;
        align-items: center;
    }
`

const PBarTitle = styled.h1`
    margin: 5px;
    padding: 0;
`

const PBarBackButton = styled(BackButton)`
    background-color: ${Color.secondaryBlue};
    color: white;
    margin: 5px;
`