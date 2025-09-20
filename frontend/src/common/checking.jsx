

import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const Checking = ({isauthenticated, user, children}) => {
    const location = useLocation();

    // if the user is not authenticated and he tries to go another page then he should go to the login page
    if(!isauthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))){
        return <Navigate to='/auth/login' replace/>
    }

    //check if the authenticated users tries to login in as admin then it should not give access to him
    if(isauthenticated && user?.role !== 'admin' && location.pathname.includes('/admin')){
        return <Navigate to='/unauth-page' replace/>
    }

    //check if the authenticated admin tries to login in as user then it should not give access to him
    if(isauthenticated && user?.role === 'admin' && location.pathname.includes('/user')){
        return <Navigate to='/admin/dashboard' replace/>
    }

    //check if the authenticatd person is user or admin to takeover them to their front view
    if(isauthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))){
        if(user?.role === 'admin'){
            return <Navigate to='/admin/dashboard' replace/>
        }
        else{
            return <Navigate to='/user/home' replace/>
        }
    }

    return <>{children}</>
 
}

export default Checking