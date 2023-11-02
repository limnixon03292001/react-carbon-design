import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import checkToken from '../utils/checkToken'

export default function ProtectedRoutes({ path }) {
  return (
    <>
        {!checkToken() ?
        <>
            <Navigate to={path} /> 
            { alert("Unauthorized!") }
        </>
        :
        // allowedRole.some((p) => p === localStorage.getItem('pstRle')) ?
            <Outlet /> 
        // :
        //     console.log("NOT FOUND PAGE!")
        }
  </>
  )
}
