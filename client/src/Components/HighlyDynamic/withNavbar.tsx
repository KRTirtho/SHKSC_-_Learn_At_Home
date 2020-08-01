import React, { FC, ComponentType } from 'react'
import Navbar from '../UI/Navbar'

const withNavbar = <P extends object>(Component: ComponentType<P>):FC<P>=>(props)=> {
    return (
        <article {...props as P}>
            <Navbar/>
            <Component {...props as P}/>
        </article>
    )
}

export default withNavbar
