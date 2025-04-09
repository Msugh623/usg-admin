import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { useStateContext } from '../state/StateContext'

const Nav = (props) => {
    const { user } = useStateContext()
    const [hasPop, setHasPop] = useState(props.hasPop)

    return (
        <div className={!props?.hov && 'sticky-top'}>
            {/* {hasPop &&
                <nav className="navbar text-light custom-navmenu themebg pt-0 growIn">
                    <div className="container py-4 ">
                        <div className='col-lg-4 mb-3 mb-lg-0 small'>
                            Discover funding, fellowships, and opportunities to transform your vision into reality. Plug into a world of possibilities and watch your startup thrive.
                        </div>
                        <div className="ms-auto me-auto me-lg-2">
                            <Link to={'/'} className='me-1 mb-1 mb-lg-0 subnav-btn rounded btn' onClick={() => window.scroll({ top: 0 })}>Home</Link>
                            <Link to={'/about'} className='me-1 mb-1 mb-lg-0 subnav-btn rounded btn'>About Us</Link>
                            <Link to={'/contact'} className='me-1 mb-1 mb-lg-0 subnav-btn rounded btn'>Contact</Link>
                        </div>
                    </div>
                </nav>
            } */}
            <nav className={`navbar slideIn custom-navbar pb-0 pt-0 ${!props.hasBg ? 'bg-light' : 'text-light dd'} shadow-sm`} style={{
                background: props?.trans && '#efefef20',
                color: props?.trans && '#efefef !important'
            }}>
                <div className="container py-2 pb-2 px-2">
                    {/* <pre>
                        {
                            JSON.stringify(user)
                        }
                    </pre> */}
                    <h2 className='m-0'>
                        <Link to={'/'} onClick={() => window.scroll({ top: 0 })}>
                            <div className="d-flex">
                                <LazyLoadImage src={'/logo.png'} effect='opacity' alt="Agrosmart Logo" about='Agrosmart Logo' height={props?.hasBg ? '80px' : '60px'} className='rounded my-auto' style={{
                                    maxWidth: '70vw',
                                    objectFit: 'contain'
                                }} />
                            </div>
                        </Link>
                    </h2>
                    {hasPop && (
                        <div className="rounded-lg" style={{
                            position: 'fixed',
                            top: '0',
                            left: '0',
                            right: '0',
                            bottom: '0',
                            backgroundColor: '#0e0e0e40',
                            zIndex: 1001
                        }} onClick={() => setHasPop(false)}>
                            <div
                                className="d-flex slideIn flex-column  ms-auto me-5 mt-5  space-y-4  rounded-lg bg-light rounded"
                                style={{
                                    width: '200px',
                                    // position: 'relative',
                                    // top: '40px',
                                    // right:'50px'
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {[
                                    { path: "/alumini-network", label: "Alumini Network" },
                                    { path: "/get-involved", label: "Get Involved" },
                                    { path: user?._id ? '/profile' : "/signin", label: user?._id ? 'Profile' : "Login" },
                                    { path: "/resources", label: "Resources" },
                                    { path: "/programmes", label: "Programs" },
                                    { path: "/about", label: "About" },
                                    // { path: "/contact", label: "Contact Us" },
                                ].map(({ path, label }) => (
                                    <Link
                                        key={label}
                                        to={path}
                                        className="m-1 text-dark noDec noDecoration subnav-btn rounded p-2 ps-4 "
                                        onClick={() => setHasPop(false)} style={{
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                    {!hasPop &&
                        <div className="ms-auto me-2 d-none d-lg-block">
                            <Link to={'/alumini-network'} className={`me-1 rounded btn ${props?.hasBg ? 'text-light shadow-sm acbg' : 'text-dark'}`} onClick={() => window.scroll({ top: 0 })}>Alumini Network</Link>
                            <Link to={'get-involved'} className={`me-1 rounded btn ${props?.hasBg ? 'text-light shadow-sm acbg' : 'text-dark'}`}>Get Involved</Link>
                            <Link to={user?._id ? "/profile" : '/signin'} className={`me-1 rounded btn ${props?.hasBg ? 'text-light shadow-sm acbg' : 'text-dark'}`}>{user?._id ? "Profile" : 'Login'}</Link>
                        </div>
                    }
                    <a className={`burger me-2 ${hasPop && 'active'} ${props?.hasBg && 'text-light'}`} data-bs-toggle="collapse" data-bs-target="#main-navbar" onClick={() => {
                        setHasPop(prev => !prev)
                    }}>
                        <span ></span>
                    </a>
                </div>
            </nav >
        </div >
    )
}

export default Nav