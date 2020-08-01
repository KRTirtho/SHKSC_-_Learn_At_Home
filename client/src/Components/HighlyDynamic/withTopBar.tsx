import React, { ComponentType, FC } from 'react'
import Topbar from '../UI/Topbar'

const withTopBar = <P extends object>(Component: ComponentType<P>):FC<P>=>(props)=>{
    return (
        <article {...props as P}>
        <Topbar/>
        <Component {...props as P}/>
        </article>
    )
}

export default withTopBar
