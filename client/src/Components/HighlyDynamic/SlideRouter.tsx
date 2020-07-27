import React, { FC, useState, useEffect } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, withRouter, RouteComponentProps } from 'react-router-dom'

type SlideConfig = {
    config: {path: string, order: number}[]
}

const SlideRouter:FC<SlideConfig & RouteComponentProps> = ({location, children, config}) => {
    // Pages Config File
    const pages = config;
    
    // Determines whether page should be coming from right or left
    const [pageDirection, setPageDirection] = useState<"left"|"right"|undefined>()
    // The path name of current page
    const [currentPath, setCurrentPath] = useState(location.pathname)
    // Gets the order of path from provided config. Where it determines the matching path order
    const [currentPathOrder, setCurrentPathOrder] = useState(
        pages.filter(({ path }) => path === location.pathname)[0].order
    )
    // Getting the key from path
    const currentKey = location.pathname.split('/')[1] || '/'
    useEffect(() => {
        /* The new path which is found after second render while changing routes.*/
        const newPath = location.pathname
        // The incoming path order. 
        const newPathOrder = pages.filter(({ path }) => path === newPath)[0].order
        //This determines whether page will be coming from left or right
        // If newPath & currentPatch is not equal then it checks and compares the order
        // If the current path order is less then new One then it comes from left
        if (newPath !== currentPath) {
            const direction = currentPathOrder < newPathOrder ? 'left' : 'right'
            setCurrentPath(newPath)
            setCurrentPathOrder(newPathOrder)
            setPageDirection(direction)
        }
    })
    
    return (
        <TransitionGroup className={`${pageDirection}`}>
            <CSSTransition key={currentKey} timeout={300} classNames={'route'}>
                <div className="route__container">
                    <Switch location={location}>
                        {children}
                    </Switch>
                </div>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default withRouter(SlideRouter)
