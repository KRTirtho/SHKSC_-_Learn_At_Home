import React, {lazy, Suspense, FC, useEffect, useState} from 'react';
import './App.css';
import { Route, Switch, withRouter, RouteComponentProps } from "react-router-dom"
import Fallback from './ComponentLoaders/SuspenseFallback.loader';
import { useQuery } from '@apollo/client';
import {Authorize} from "./SchemaTypes/schemaTypes"
import Login from './Components/Auth/Forms/Login';
import RoleSelection from './Components/Auth/Forms/RoleSelection';
import SignUpForm from './Components/Auth/Forms/Signup';
import SlideRouter from './Components/HighlyDynamic/SlideRouter';
import SetProfilePicture from './Components/Auth/Forms/SetProfilePicture';
import { AUTHORIZE_USER } from './schema/query/Authorize';
import Welcome from './Components/Special/Welcome';
import { LOGIN_LOCAL, SIGNED_UP } from './schema/local/Query';
import NotFound from './Components/Special/NotFound';
import { LoginLocal, SignedUp } from './SchemaTypes/local/LocalSchemaTypes';
import e from 'express';
/* Pages import */
const Home = lazy(()=>import('./Pages/Home'))
const Activities = lazy(()=>import('./Pages/Activities'))
const Principal = lazy(()=>import('./Pages/Principal'))
const Announces = lazy(()=>import('./Pages/Announces'))
const Examination = lazy(()=>import('./Pages/Examination'))
const Settings = lazy(()=>import('./Pages/Settings'))
const Profile = lazy(()=>import('./Pages/Profile'))
const Questions = lazy(()=>import('./Pages/Questions'))
const Admin = lazy(()=>import('./Pages/Admin'))
const Classes = lazy(()=>import('./Pages/Classes'))
const Post = lazy(()=>import("./Components/Posts/Post"))

const App:FC<RouteComponentProps> = ({location})=>{

  const {data, error, client} = useQuery<Authorize>(AUTHORIZE_USER); 

  // Login local state
  const {data: local_data,} = useQuery<LoginLocal>(LOGIN_LOCAL)
  // SignedUp local state
  const {data: local_signed_up} = useQuery<SignedUp>(SIGNED_UP)
  
  const login = data?.authorize?.login
  const expired = data?.authorize?.expired
  const accessToken = data?.authorize?.tokens?.accessToken
  const refreshToken = data?.authorize?.tokens?.refreshToken

  useEffect(()=>{
    if(login){
      client.writeQuery({query: LOGIN_LOCAL, data: {loggedIn: true}})
    }
    else if(accessToken && refreshToken){
      localStorage.setItem("auth_token", accessToken)
      localStorage.setItem("refresh_token", refreshToken)
    }
  }, [local_data, login, expired, client, accessToken, refreshToken])
  
  
  return (
      <div style={{
        margin: "4rem 0"
      }}>
        <Suspense fallback={<Fallback/>}>
        {!error && local_data?.loggedIn?
        <Switch location={location}>
          {/* Pages with Nav & Top bar */}
          <Route exact path="/"><Home/></Route>
          <Route path="/classes"><Classes/></Route>
          <Route path="/activities"><Activities/></Route>
          <Route path="/principal"><Principal/></Route>
          <Route path="/announces"><Announces/></Route>
          <Route path="/examination"><Examination/></Route>
          <Route path="/questions"><Questions/></Route>
          {/* Pages without navigation & top bar */}
          <Route path="/settings"><Settings/></Route>
          <Route path="/:userId/profile"><Profile/></Route>
          <Route path="/admin"><Admin/></Route>
          <Route path="/post"><Post/></Route>
          <Route path="*"><NotFound/></Route>
        </Switch>
        :
        <SlideRouter>
          <Route path="/" exact><Login /></Route>
          <Route path="/roles" component={RoleSelection} />
          <Route path="/signup" component={SignUpForm} />
          {local_signed_up?.signedUp && <Route path="/set-avatar" component={SetProfilePicture}/>}
          {local_signed_up?.signedUp && <Route path="/welcome" component={Welcome}/>}
          <Route path="*"><NotFound/></Route>
        </SlideRouter>
        }
        </Suspense>
      </div>
      )
    }

export default withRouter(App);