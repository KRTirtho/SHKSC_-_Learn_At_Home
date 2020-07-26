import React, { useState } from 'react'
import Login from "./Forms/Login" 
import Signup from './Forms/Signup'
import { CSSTransition } from 'react-transition-group';
import { TransitionWrapper} from '../Static/Forms';
/**
 ** This fie is for open first login/signup screen.
 * TODO: Will use Formik for forms 
 * TODO: Role based Signup
 * TODO: Gonna use apollo-link-state for user data distribution
  */

const Auth = () => {
    const [page, setPage] = useState<'login'|'sign-up'>('login');
    
    return (
        <TransitionWrapper>
            <CSSTransition
                in={page==="login"}
                classNames="slide"
                unmountOnExit
                timeout={500}
            >
            <Login onClick={()=>setPage("sign-up")}/>
            </CSSTransition>
            <CSSTransition
                in={page==="sign-up"}
                classNames="slide-second"
                unmountOnExit
                timeout={500}
            >
            <Signup onClick={()=>setPage("login")}/>
            </CSSTransition>
        </TransitionWrapper>
    )
}

export default Auth
