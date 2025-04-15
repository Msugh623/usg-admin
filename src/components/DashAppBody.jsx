import React, {  useEffect, useLayoutEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Sidebar from './Sidebar'
import { FaBars } from 'react-icons/fa'
import { BiX } from 'react-icons/bi'
import { useStateContext } from '../state/StateContext'

const DashAppBody = () => {
  const navigate = useNavigate()
  const [allow,setAllow] = React.useState(false)
  const [navIsHidden, setNavIsHidden] = React.useState(window.innerWidth<768)
  const {modal,setModal} = useStateContext()

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

  useEffect(() => {
      window.theme = '#123F55'
      onscroll = () => {
        setSh(scrollY)
      }
      window.addEventListener('keydown',(e)=>e.code=='Escape'&&setModal(''))
    }, [])
  
    useEffect(() => {
      scroll({ top: 0 })
    }, [location.pathname])
  
    useEffect(()=>{
      modal&&document.getElementById('modal').focus()
    }, [modal])
  
  useLayoutEffect(() => {
    onresize = () => {
      window.innerWidth>768?setNavIsHidden(false):setNavIsHidden(true)
    }
    setTimeout(() => {
      onresize()
    }, 500);
    document.title = 'USGEAAN Admin - Dashboard'
    const t = localStorage.logintoken
    if (!t) {
      return navigate('/')
    }
    setAllow(true)
  }, [])
  return (allow?
    <div className='' style={{
    }}>
      <div className="fixed-top">
        <div className={`mt-4 ms-3 d-lg-none pt-2`}>
          <div className="btn themetxt bg-light roundAf shadow-lg" onClick={() => {setNavIsHidden(prev=>!prev)}}>
            <FaBars/>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <div id='sb'>
          <Sidebar />
        </div>
        <div className="">
        <Outlet />
        </div>
      </div>
      {modal &&
        <div className="fixed-top w-100 h-100 d-flex flex-column p-4 bg-[#0e0e0e30]"  onClick={() => setModal('')}>

          <div className="bg-light shadow-lg m-auto rounded p-3 slideUp no-dec fancy-sc" id="modal" onKeyDown={(e)=>e.code=='Escape'&&setModal('')}   onClick={e => e.stopPropagation()} style={{
            maxHeight: '85vh',
            overflow: 'auto',
            outline:'none',
            border:'none'
          }}>
            <div className="d-flex" style={{
                position:'sticky',
                top:'0px',
              }} >
              <BiX className="ms-auto fs-3 shadow rounded bg-light hover:shadow-lg" onClick={() => setModal('')}/>
            </div>
            {modal}
          </div>
        </div>
      }
    </div>:<></>
  )
}

export default DashAppBody