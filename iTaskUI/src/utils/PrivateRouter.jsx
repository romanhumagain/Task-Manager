import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRouter = ({element}) => {
  const {user} = useAuth()
  const is_authenticated = user?true:false

  return (
    is_authenticated?element:<Navigate to={'/login'}/>
  )
}

export default PrivateRouter