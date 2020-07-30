import React, {FC, useEffect} from 'react'
import SlideRouter from '../HighlyDynamic/SlideRouter'
import { Route, useRouteMatch, useHistory } from 'react-router-dom'
import SelectPostType from './Selectors/SelectPostType'
import MainForm from "./Forms/MainForm"

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
    useEffect(()=>{
        if(window.location.pathname===path || window.location.pathname===path+"/"){
            history.push(path+"/select-post_type")
        }
    })
    
    return (
        <div>
            <SlideRouter>
                <Route path={`${path}/select-post_type`}><SelectPostType parentPath={path}/></Route>
                <Route path={`${path}/upload`}><MainForm/></Route>
            </SlideRouter>
        </div>
    )
}

export default Post
