import React from 'react'
import {TransitionSlideParent, Brand, FormContainer, BackButton} from "../Static/Forms"
import styled from 'styled-components'
import { PrimaryButton } from '../Static/Buttons'
import { useHistory } from 'react-router-dom'
import {useApolloClient, useQuery} from "@apollo/client"
import { SIGNED_UP, LOGIN_LOCAL } from '../../schema/local/Query'

const Welcome = () => {
    const history = useHistory()
    const client = useApolloClient()
    const {data} = useQuery(SIGNED_UP)
    
    const gotoHome = ()=>{
        if(data.signedUp){
            client.writeQuery({query: LOGIN_LOCAL, data:{loggedIn: true}})
        }
        history.push("/")
    }
    
    return (
        <TransitionSlideParent>
            <FormContainer>
            <Brand brand="Welcome, again!" subTitle="Learn At Home🏠" src="./Assets/StudentIcon.svg" alt="SHKSC"/>
            <Description>
                Welcome back, to your favorite school. We know we're far away from
                each other but still we're at the same place. Using facebook for study
                is nice. But studying at our own platform is a dream. So let your dream come
                true. Make sure you're signed up & you are ready for continuing your learning
                journey with your <b>Shamsul Haque Khan School and College</b>. Go check out 
                your place in the class.
            </Description>
            <div style={{width: "100%", display: "flex", alignItems: "center"}}>
            <BackButton onClick={()=>history.goBack()}/>
            <PrimaryButton style={{marginLeft: "auto"}} onClick={gotoHome}>Ready for?</PrimaryButton>
            </div>
            </FormContainer>
        </TransitionSlideParent>
    )
}

export default Welcome

const Description = styled.p`
    text-align: justify;
`