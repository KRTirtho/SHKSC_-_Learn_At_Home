import React, {lazy, Suspense, FC, useEffect} from 'react';
import './App.css';
import Navbar from './Components/UI/Navbar';
import Topbar from './Components/UI/Topbar';
import { Route, Switch, withRouter, RouteComponentProps } from "react-router-dom"
import Fallback from './ComponentLoaders/SuspenseFallback.loader';
import { useQuery } from 'react-apollo';
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
import { LoginLocal, SignedUp } from './SchemaTypes/local/LocalShemaTypes';
/* Pages import */
const Home = lazy(()=>import('./Pages/Home'))
const Activities = lazy(()=>import('./Pages/Activities'))
const Principal = lazy(()=>import('./Pages/Principal'))
const Announces = lazy(()=>import('./Pages/Announces'))
const Examination = lazy(()=>import('./Pages/Examination'))
const Settings = lazy(()=>import('./Pages/Settings'))
const Profile = lazy(()=>import('./Pages/Profile'))
const Ask = lazy(()=>import('./Pages/Ask'))
const Admin = lazy(()=>import('./Pages/Admin'))
const Classes = lazy(()=>import('./Pages/Classes'))

const App:FC<RouteComponentProps> = ({location})=>{
  
  const {data, error, client} = useQuery<Authorize>(AUTHORIZE_USER); 

  // Login local state
  const {data: local_data,} = useQuery<LoginLocal>(LOGIN_LOCAL)
  // SignedUp local state
  const {data: local_signed_up} = useQuery<SignedUp>(SIGNED_UP)

  useEffect(()=>{
    if(data?.authorize?.login){
      client.writeData({data: {loggedIn: true}})
    }
  }, [local_data, data?.authorize?.login])
  
  return <>
        {/* If logged in then ca be accessed */}
      
        {
          !error && local_data?.loggedIn&&<><Navbar/><Topbar/></>
        }
      <div style={{
        margin: "4rem 0"
      }}>
            <Suspense fallback={<Fallback/>}>
            {!error && local_data?.loggedIn?
            <Switch location={location}>
              <Route exact path="/"><Home/></Route>
              <Route exact path="/classes"><Classes/></Route>
              <Route exact path="/activities"><Activities/></Route>
              <Route exact path="/principal"><Principal/></Route>
              <Route exact path="/announces"><Announces/></Route>
              <Route exact path="/examination"><Examination/></Route>
              <Route exact path="/settings"><Settings/></Route>
              <Route exact path="/:userId/profile"><Profile/></Route>
              <Route exact path="/ask"><Ask/></Route>
              <Route exact path="/admin"><Admin/></Route>
              <Route path="*"><NotFound/></Route>
            </Switch>
            :
            <SlideRouter>
              <Route path="/" exact><Login /></Route>
              <Route path="/roles" component={RoleSelection} />
              <Route path="/signup" component={SignUpForm} />
              {local_signed_up?.signedUp &&<Route path="/set-avatar" component={SetProfilePicture}/>}
              {local_signed_up?.signedUp && <Route path="/welcome" component={Welcome}/>}
              <Route path="*"><NotFound/></Route>
            </SlideRouter>
            }
            </Suspense>
          </div>
      </>
      
    }

export default withRouter(App);