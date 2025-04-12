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
    <div className='' style={{
      maxWidth: '100vw',
      maxHeight: '100vh',
      overflow: 'hidden',
      }}>
      <div className="d-flex max-h-[100vh] o-hidden">
        <div>
          <Sidebar />
        </div>
        <div className="max-h-[100vh] w-100 overflow-y-auto">
        <Outlet/>
        </div>
        </div>
    </div>:<></>
  )
}

export default DashAppBody