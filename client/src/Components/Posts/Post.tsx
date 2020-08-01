import React, {FC, useEffect, useState} from 'react'
import SlideRouter from '../HighlyDynamic/SlideRouter'
import { Route, useRouteMatch, useHistory } from 'react-router-dom'
import SelectPostType from './Selectors/SelectPostType'
import MainForm from "./Forms/MainForm"
import Placeholderbar from '../UI/Placeholderbar'

/**
 * @description Main entry point of all posts
 * TODO: Have to make nested Routes for Post_Type Selection
 * Resource: * Selector 
             * MainForm 
  */

const Post:FC = () => {
    const {path} = useRouteMatch() 
    const history = useHistory()

    // For not letting user to use {post} route only
    const windowLocation = window.location.pathname

    useEffect(()=>{
        if(windowLocation===path || windowLocation===path+"/"){
            history.push(path+"/select-post_type")
        }
    })
    
    const [barTitle, setBarTitle] = useState<any>('');    

    return (
        <div>
            <Placeholderbar barTitle={barTitle}/>
            <SlideRouter>
                <Route path={`${path}/select-post_type`}><SelectPostType setBarTitle={setBarTitle} parentPath={path}/></Route>
                <Route path={`${path}/upload`}><MainForm setBarTitle={setBarTitle}/></Route>
            </SlideRouter>
        </div>
    )
}

export default Post
