// Layout.js
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Nav";
import Footer from "./components/Footer";
import { BiChevronUpCircle, BiX } from "react-icons/bi";
import { useStateContext } from "./state/StateContext";
const Layout = () => {
  const [sh, setSh] = useState(0)
  const { modal, setModal, title } = useStateContext()
  const location = useLocation()

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
  },[modal])

  useEffect(()=>{
    if(title) document.title=`USGEAAN Admin - ${ title || 'Dashboard'}`
  },[title])


  return (
    <div style={{ minWidth: '280px' }}>
      {sh > 400 && <div onClick={() => scroll({ top: 0, behavior: "smooth" })} style={{
        position: 'fixed',
        bottom: '40px',
        right: '50px',
        zIndex: 5
      }}>
        <button className="d-flex flex-column slideUp">
          <BiChevronUpCircle className="fs-2 mx-auto" />
          <div className="text-center text-sm mt-2">
            Back to top
          </div>
        </button>
      </div>}
      <main>
        <Outlet />
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
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
