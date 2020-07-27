import React, {lazy, Suspense, FC} from 'react';
import './App.css';
import Navbar from './Components/UI/Navbar';
import Topbar from './Components/UI/Topbar';
import { Route, Switch, withRouter, RouteComponentProps } from "react-router-dom"
import Fallback from './ComponentLoaders/SuspenseFallback.loader';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import Login from './Components/Auth/Forms/Login';
import RoleSelection from './Components/Auth/Forms/RoleSelection';
import SignUpForm from './Components/Auth/Forms/Signup';
import SlideRouter from './Components/HighlyDynamic/SlideRouter';
import SetProfilePicture from './Components/Auth/Forms/SetProfilePicture';
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

const AUTHORIZE_USER = gql`
    {
        authorize{
        login
        credentials{
            role
            _id
            first_name
            }
        }
    }
`

const pages = [
  { path: '/', order: 1 },
  { path: '/roles', order: 2 },
  { path: '/signup', order: 3 },
  { path: "/set-avatar", order: 4}
]

const App:FC<RouteComponentProps> = ({location})=>{
  const {data, error,} = useQuery(AUTHORIZE_USER); 

  return <>
        {/* If logged in then ca be accessed */}
      
        {
          !error && data && data.authorize&&data.authorize.login===true&&<><Navbar/><Topbar/></>
        }
      <div style={{
        margin: "4rem 0"
      }}>
            <Suspense fallback={<Fallback/>}>
            {!error && data && data.authorize&&data.authorize.login===true?
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
            </Switch>
            :
            <SlideRouter config={pages}>
              <Route path="/" exact component={Login} />
              <Route path="/roles" component={RoleSelection} />
              <Route path="/signup" component={SignUpForm} />
              <Route path="/set-avatar" component={SetProfilePicture}/>
            </SlideRouter>
            }
            </Suspense>
          </div>
      </>
      
    }

export default withRouter(App);