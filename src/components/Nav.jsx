import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { useStateContext } from '../state/StateContext'

const Navbar = (props) => {
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
            <nav className={`navbar slideIn text-lightAf custom-navbar pb-0 pt-0 ${!props.hasBg ? 'text-light' : 'text-light dd'} shadow-sm`} style={{
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
                        <Link to={'/'} className='no-dec' onClick={() => window.scroll({ top: 0 })}>
                            <div className="d-flex">
                                <LazyLoadImage src={'/logo-b1x1.png'} effect='opacity' alt="Agrosmart Logo" about='Agrosmart Logo' width={'60px'} className='my-auto bg-light roundAf' style={{
                                //    borderRadius: '500px',
                                }} /> <span className="d-none d-sm-inline my-auto ms-2 no-dec fs-1">USGEAAN</span>
                            </div>
                        </Link>
                    </h2>
                    {!hasPop &&
                        <div className="ms-auto me-2  d-lg-block">
                            <Link to={'/dashboard'} className={`me-1 rounded btn ${props?.hasBg ? 'text-light shadow-sm acbg' : 'text-dark'}`} onClick={() => window.scroll({ top: 0 })}>Admin Portal <br /> <hr className='m-0 mt-1 w-75 mx-auto border-2' style={{
                                opacity:'1'
                            }} /> </Link>
                            <a href={'https://usgeaan.onrender.com/'} style={{opacity:'0.7'}} className={`me-1 text-muted text-grey-400 rounded btn  ${props?.hasBg ? 'text-muted shadow-sm acbg' : 'text-muted    '}`}>Main Website<br /> <hr className='m-0 mt-1 w-75 mx-auto border-2' style={{
                                opacity:'0'
                            }} ></hr></a>
                        </div>
                    }
                </div>
            </nav >
        </div >
    )
}

export default Navbar