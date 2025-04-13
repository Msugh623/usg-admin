import React, {  useEffect, useLayoutEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Sidebar from './Sidebar'
import { FaBars } from 'react-icons/fa'

const DashAppBody = () => {
  const navigate = useNavigate()
  const [allow,setAllow] = React.useState(false)
  const [navIsHidden, setNavIsHidden] = React.useState(false)

  useEffect(() => {
    const condition=navIsHidden
    const sb = document.getElementById('sb')
    if (!sb) return
    if (condition) {
      sb.classList.add('slideLeftOut')
      setTimeout(() => {
        sb.classList.add('d-none')
        sb.classList.remove('slideLeftOut')
      }, 300)
    } else {
      sb.classList.remove('d-none')
      sb.classList.add('slideRight')
      setTimeout(() => {
        sb.classList.remove('slideRight')
      }, 300)
    }
  },[navIsHidden])

  useLayoutEffect(() => {
    onresize = () => {
      window.innerWidth>768?setNavIsHidden(false):setNavIsHidden(true)
    }
    document.title = 'USGEAAN Admin - Dashboard'
    const t = localStorage.logintoken
    if (!t) {
      return navigate('/')
    }
    setAllow(true)
  }, [])
  return (allow?
    <div className='' style={{
      maxWidth: '100vw',
      maxHeight: '100vh',
      overflow: 'hidden',
    }}>
      <div className="fixed-top">
        <div className={`mt-4 ms-3 d-lg-none pt-2`}>
          <div className="btn themetxt bg-light roundAf shadow-lg" onClick={() => {setNavIsHidden(prev=>!prev)}}>
            <FaBars/>
          </div>
        </div>
      </div>
      <div className="d-flex max-h-[100vh] o-hidden">
        <div id='sb'>
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