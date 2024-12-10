import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { userCont } from '../../context/User.context';

export default function ProtectedRoute({children}) {
  //^ >>>>>>>>>>>>>>>>
  const { token } = useContext(userCont);
  if (token) {
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
}
