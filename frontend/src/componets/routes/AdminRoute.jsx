import React, {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';
import { adminProtectedRoute } from '../../apis';

const UserRoute = () => {
    const [ok, setOk] = useState(false);
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        const authCheck = async () => {
            try {
                const response = await adminProtectedRoute(token)
                if (response.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error('Authorization failed:', error.response ? error.response.data : error.message);
                setOk(false);
            }
        };
    
        if (token) authCheck();
    }, [token]);
    

  return (
    <div>
        {ok ? <Outlet/> : <Spinner path='/' />}
    </div>
  )
}

export default UserRoute