import React, {useState, useEffect} from 'react'

import { api } from '../services/api.js';
import Loader from './Loader/Loader.jsx';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {

  const storedUser = localStorage.getItem('user')

  if(!storedUser) {
    return <Navigate to='/login' replace/>
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch (error) {
    console.error('Invalid user in localstorage: ', error);
    localStorage.removeItem('user');
    return <Navigate to='/onBoard' replace/>
  }

    // const navigate = useNavigate();
    // const [loader, setLoader] = useState(false);
    // const [isAuth, setIsAuth] = useState(false);

    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             await api.get('/auth/test')
    //             .then(() => navigate('/onBoard'))
    //             .catch((err) => console.log(err))
    //             setIsAuth(true)
    //         } catch (error) {
    //             setIsAuth(false);
    //             console.log('Protected route failed: ', error.message);
    //         } finally {
    //             setLoader(false)
    //         }
    //     }

    //     checkAuth()
    // }, [])

    if(!user) return <Navigate to='/login' replace/>

    if(!user.isOnboard) {
        return <Navigate to='/onBoard' replace />
    }

    // if(loader) {
    //     return (
    //         <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
    //             <Loader />
    //         </div>
    //     )
    // }

    // if(!isAuth) {
    //     return <Navigate to='/login' replace/>
    // }

  return children
}

export default ProtectedRoutes
