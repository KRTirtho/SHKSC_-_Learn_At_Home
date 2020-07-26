import React, { FC, JSXElementConstructor, useEffect, useState } from 'react'
import { ModalBG, ModalBody, ModalCard, ModalHeader, CloseButton } from './core/modal.core'
import styled, { StyledComponent, StyledFunction } from 'styled-components'
import { Button } from '../Static/Buttons'
import { Color } from '../../utils/Assets/CSSProps'

type ConditionalModalProps = {
    error?: boolean,
    success?: boolean,
    msg?: string,
    body?: string | JSXElementConstructor<{}>
}

const ConditionalModal:FC<ConditionalModalProps> = ({error, success, msg, body}) => {
    const [open, setOpen] = useState<boolean>(false)

    useEffect(()=>{
        if(error || success){
            setOpen(true)
        }
    }, [error,success, setOpen])

    return (
        <ModalBG onClick={()=>setOpen(false)} open={open}>
            <ModalCard open={open}>
                <ModalHeader error={error}>
                <h3>{msg}</h3>
                    <CloseButton onClick={()=>setOpen(false)}>&times;</CloseButton>
                </ModalHeader>
                <ModalBody error={error}>
                    {body}
                </ModalBody>
                <OkButton onClick={()=>setOpen(false)} success={success}>Close</OkButton>
            </ModalCard>
        </ModalBG>
    )
}

export default ConditionalModal

const OkButton = styled(Button)<{success?: boolean}>`
    background-color: ${(props)=>props.success?Color.primaryGreen:Color.primaryRed};
    text-align: center;
    color: white;
    align-self: center;
`