import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Like, Search, Single } from '../pages'

function CustomRoutes() {
    const routeList = [
        {
            id:"1",
            path:"/",
            element:<Home/>
        },
        {
            id:"2",
            path:"/liked",
            element:<Like/>
        },
        {
            id:"3",
            path:"/search",
            element:<Search/>
        },
        {
            id:"4",
            path:"/single/:id",
            element:<Single/>
        }
    ]
  return (
    <Routes>
     {routeList.map(item => <Route path={item.path} key={item.id} element={item.element}/>)}
    </Routes>
  )
}

export default CustomRoutes