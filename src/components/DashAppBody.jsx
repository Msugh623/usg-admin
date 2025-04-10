import React, {  useLayoutEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Sidebar from './Sidebar'

const DashAppBody = () => {
  const navigate = useNavigate()
  const [allow,setAllow] = React.useState(false)
  useLayoutEffect(() => {
    document.title = 'USGEAAN Admin - Dashboard'
    const t = localStorage.logintoken
    if (!t) {
      navigate('/')
    }
    setAllow(true)
  }, [])
  return (allow?
      <div className=''>
      <div className="d-flex">
        <div>
          <Sidebar />
        </div>
        <div className="w-100">
        <Outlet/>
        </div>
        </div>
    </div>:<></>
  )
}

export default DashAppBody