import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Delay from '../components/Delay'
import { useStateContext } from '../state/StateContext'
import { BsTriangle } from 'react-icons/bs'
import {LazyLoadImage } from 'react-lazy-load-image-component'
import { BiArrowToBottom, BiSearch } from 'react-icons/bi'

const Home = () => {
  const { users,setModal,gallery,isFetching,setTitle,testimonies ,programmes} = useStateContext()

  useEffect(() => {
    setTitle('')
    const interval = setInterval(() => {
    const par=document.getElementById('gallery')
      // console.log(par.scrollWidth-par.scrollLeft)
      if (par.scrollLeft >= (par.scrollWidth-par.clientWidth) ) {
        par.scroll({left:0,behavior:'smooth'})
      } else {
        par.scrollBy({ left: 250, behavior: 'smooth' })      
      }
    }, 5000)
    return () => clearInterval(interval)
  }
    , [])

  return (
    <div>
      <div className="container pt-5 mt-4">
        <div className="row mx-auto">
          <div className="col-md-6 d-flex ">
            <img src="/flag.png" alt="" className="ms-md-auto slideUp img-fluid" />
          </div>
          <div className="col-md-6 col-12 d-flex flex-column py-5 ps-md-4">
            <Delay delay={200}>
              <div className="me-auto row">
                <div className="col-md-10 ">
                  <h1 className='fs-1 slideRight fs-bold w-100 md:w-auto' style={{ fontWeight: 'bold' }}>USGEAAN Inspires, empowers, and connects!</h1>
                </div>
                <div className="col-2 d-none d-md-block small me-auto mt-auto">
                  {/* <div className="text-center"> */}
                  {users?.length||''} Registered members
                  {/* </div> */}
                  <div>
                    <Link className='fs-5 fw-bold themetxt no-dec' to={'/alumini-network'}>
                      <div className="d-flex">
                      <div><BiSearch className='fs-5 me-1 mt-1' /></div> Search
                     </div>
                    </Link>
                  </div>
                </div>
              </div>
            </Delay>
            <Delay delay={300}>
              <div className="slideRight d-flex md:d-block">
                <Link to={'/get-started'} className="btn px-5 mx-auto ms-md-0 md:mx-0 py-2 mt-4 themebg" style={{
                  borderRadius: '16px'
                }}>
                  <div className="px-5">Join</div>
                </Link >
              </div>
            </Delay>
            <div className="mx-auto pt-4 text-center d-block d-md-none small me-auto mt-auto">
              <div className="pt-3"></div>
                  {users?.length||''} Registered members
                  <div>
                    <Link className='fs-5 fw-bold mx-auto themetxt no-dec' to={'/alumini-network'}>
                    <div className="d-flex mx-auto justify-content-center">
                      <div><BiSearch className='fs-5 me-1 mt-1' /></div> Search
                     </div>
                    </Link>
                  </div>
                </div>
          </div>
        </div>
      </div>

      {/* Blue opaque section */}
      <Delay delay={300}>
        <section className="py-4 slideUp" style={{
          backgroundColor: '#123F5530'
        }}>
          <div className="d-flex flex-column">
            <h3 className="fw-bold text-center mb-2 mt-3">Our Gallery</h3>
            <div className="text-center">
              Impactful programmes and initiatives going on across Nigeria.
            </div>
            <div className="mx-auto container w-auto p-4 d-flex nice-scroll-bar" id='gallery' style={{
              overflowX: 'auto',
              maxWidth: '90vw'
            }}>
              {
                !gallery.length ?
                  <div className='phaser rounded d-flex text-center w-100  py-[100px]'>
                      {!isFetching && <div className='mx-auto  text-center min-w-[75vw]'><div className="w-[fit-content] d-flex m-auto"><BsTriangle className='fs-5 mt-1 icon me-2' />Slideshow images display here</div></div>}
                  </div>
                  : ''
              }
              {gallery.map((item, index) => (
               <div className="" key={item?.url+index}>
                  <div className="px-2 " onClick={() => {
                   setModal( <div className="rounded p-2">
                      <LazyLoadImage  effect='opacity' src={`${item?.url}`} id={item?.url} alt="" className=" bg-light  w-[80vw] h-[80vh] min-w-[250px] object-contain rounded  img-fluid " />
                    </div>)
               }}>
                 <div className="rounded">
                   <LazyLoadImage effect='opacity' src={`${item?.url}`} id={item?.url} alt="" className="w-[250px] h-[150px] bg-light p-[1px] min-w-[250px] object-cover rounded h-[200px] h-100 img-fluid " />
                 </div>
               </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Delay>

      {/* Next white section */}
      <Delay delay={400}>
        <section>
          <div className="container slideUp p-4 mb-5">
            <div className="row px-lg-5 justify-content-center">

              {/* Testimonials */}
              <div className="col-md-3 col-lg-4" style={{
                overflow: 'auto',
                maxHeight: '950px',
                minHeight:'950px'
              }}>
                <h2 className="text-center">Testimonies</h2>
                    {testimonies.map((testimonial, index) => (
                      <div className="d-flex my-4" key={index} onClick={() => {
                        setModal(<>
                          <div className="row">
                          <div className="mx-auto">
                              <img src={testimonial?.image} alt={testimonial?.name} className="img-fluid mx-auto object-cover  p-2  pb-sm-3" style={{
                                maxHeight: '40vh',
                                borderRadius:'30px'
                              }} />
                          </div>
                          <div className="mx-auto pb-3">
                              <h5 className='text-center mb-1'>{testimonial?.name}</h5>
                              <div className="text-center col-md-8 mx-auto">{testimonial?.testimonial} </div>
                              <div className="small px-0">
                                  {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vero facilis a commodi eveniet <small className="text-success">...Read_more</small> */}
                              </div>
                         </div>
                      </div>
                      </>)
                      }}>
                        <div className="text-center">
                          <img 
                            src={`${testimonial?.image}`} 
                            alt={testimonial?.name} 
                            className="img-fluid rounded w-100" 
                            style={{
                              width: '80px',
                              height: '80px',
                              minWidth: '80px',
                              minHeight: '80px',
                              objectFit: 'cover'
                            }} 
                          /><div className='small  fw-bold mb-1'>{testimonial?.name}</div>
                        </div>
                        <div className='ms-3'>
                        
                          <div className="small">“{(''+testimonial?.testimonial||'').slice(0,100)}<span className="fw-bold">...Read More</span>” </div>
                        </div>
                      </div>
                    ))}
                <div id="mag"></div>
                <div className="" style={{
                    position: 'sticky',
                    bottom: '0px'
                }} onClick={() => {
                    document.getElementById('mag').scrollIntoView({ behavior: 'smooth', block: 'end' })
                }}>
                    <div className="btn w-100 py-2 themebg">
                        <div className="small inline">Scroll for more Chapters <BiArrowToBottom className='d-inline fs-4 icon' /> </div>
                    </div>
                </div>
              </div>

              {/* Stats */}
              <div className="col-md-3 col-lg-4 px-md-4  d-flex flex-column pb-5" style={{
                minHeight: '950px',
                maxHeight:'1000px',
                
              }}>
                <h2 className="text-center mb-3 mt-5 mt-md-0 ">Stats</h2>
                <div className="d-flex flex-column p-3  h-100" style={{
                  background: '#B222341A'
                }}>

                  {/* Round red Ball */}
                  <div className="mx-auto mt-3" style={{
                    background: '#B22234',
                    width: '50px',
                    height: '50px',
                    minWidth: '50px',
                    minHeight: '50px',
                    borderRadius: '50%'
                  }}></div>

                  {/* Line with inner green Line */}
                  <div className="w-75 mx-auto mt-1" style={{
                    height: '5px',
                    background: '#3C3B6E'
                  }}>
                    <div className="bg-success h-100 ms-4 w-25"
                      style={{}}></div>
                  </div>

                  <div className="p-1 mt-4">
                    Empowering Alumni, Connecting Communities, Driving Impact.
                  </div>

                  {/* stars */}
                  <div className="my-4 mb-3 text-center d-flex">
                    <img src="/stars.png" alt="" className="img-fluid mx-auto" />
                  </div>

                  <div className="p-1 pt-0 mb-4">
                    Together, we drive transformative projects that foster growth, leadership, and national development.
                  </div>

                  <div className="">
                    <h2>36 states</h2>
                    <div className="p-1 pt-0 mb-4">
                      Connecting alumni across all 36 states and the FCT—one network, one vision
                    </div>
                  </div>

                  <div className="">
                    <h2>1004 members</h2>
                    <div className="p-1 pt-0 mb-4">
                      A thriving community of passionate changemakers growing stronger every day.
                    </div>
                  </div>

                  <div className="">
                    <h2>28 Exchange Programmes</h2>
                    <div className="p-1 pt-0 mb-4">
                      Bridging cultures and experiences through 25+ U.S. exchange (ECA) and (Non-ECA) Programs
                    </div>
                  </div>

                  <div className="">
                    <h2>500+ projects</h2>
                    <div className="p-1 pt-0 mb-4">
                      Driving impact through innovative alumni-led initiatives nationwide.
                    </div>
                  </div>
                </div>
              </div>

              {/* Programmes */}
              <div className="col-md-3 col-lg-4" style={{
                overflow: 'auto',
                maxHeight: '950px',
                minHeight:'950px'
              }}>
                <h2 className="text-center mt-5 pt-2 pt-md-0 mt-md-0">Exchange Programmes</h2>
                {programmes.map((program, index) => (
  <div key={program.title + index} className="programCard hover:shadow cursor-[pointer] my-3 d-flex" onClick={() => {
    window.open(program.url, '_blank')
                  }}>
                    <div className="bg-dark rounded p-2 d-flex" style={{
                      minHeight: '100px',
                    }}>
                      <img src="/star.png" alt="" style={{
                        width: '35px',
                        minWidth: '35px',
                      }} className="img-fluid m-auto" />
                    </div>
                    <div className='ps-2'>
                      {/* {index} */}
                      <div className="fw-bold fs-5 mb-1">{program?.name}</div>
                      <div className='small'>
                      {(program?.description||'').slice(0,150)} <div className="fw-bold d-inline">...Read More</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div id="maglev"></div>
                <div className="" style={{
                    position: 'sticky',
                    bottom: '0px'
                }} onClick={() => {
                    document.getElementById('maglev').scrollIntoView({ behavior: 'smooth', block: 'end' })
                }}>
                    <div className="btn w-100  py-2 themebg">
                        <div className="inline small">Scroll for more Programmes <BiArrowToBottom className='d-inline fs-4 icon' /> </div>
                    </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </Delay>
    </div>
  )
}

export default Home

function prgs(){
  return ([
    { "title": "Access Program", "body": "The English Access Microscholarship Program provides English language skills to bright, economically disadvantaged students aged 13-16.", "link": "https://vn.usembassy.gov/access-microscholarship-program/" },
    { "title": "Academy for Women Entrepreneurs", "body": "Empowering women entrepreneurs with business skills and resources.", "link": "https://awedrc.com/" },
    { "title": "American Music Abroad", "body": "Organizing music tours to foster cultural exchange and education.", "link": "https://www.americanmusicabroad.com/" },
    { "title": "American Film Showcase (AFS)", "body": "Showcasing American films internationally to promote cultural understanding.", "link": "https://cinema.usc.edu/americanfilmshowcase/index.cfm" },
    { "title": "BridgeUSA", "body": "Bringing international students and professionals to the U.S. for educational and cultural exchanges.", "link": "https://j1visa.state.gov/" },
    { "title": "Community Engagement Exchanges (CEE)", "body": "Supporting innovators in building healthy and engaged communities globally.", "link": "https://www.irex.org/program/community-engagement-exchange-program-application-information" },
    { "title": "Community College Initiative (CCI)", "body": "Providing international students scholarships to study at U.S. community colleges.", "link": "https://exchanges.state.gov/non-us/program/community-college-initiative-program" },
    { "title": "Eisenhower Fellowship Program", "body": "Developing global leaders through international fellowships.", "link": "https://www.efworld.org/fellowship-programs/usa-programs/" },
    { "title": "Fortune 500 Women Leaders", "body": "Mentoring emerging women leaders worldwide.", "link": "https://exchanges.state.gov/non-us/program/fortune-us-department-state-global-womens-mentoring-partnership" },
    { "title": "Fulbright Foreign Student Program (FFSP)", "body": "Providing academic exchange opportunities for international students in the U.S.", "link": "https://foreign.fulbrightonline.org/about/foreign-student-program" },
    { "title": "Fulbright Visiting Scholar Program (FVSP)", "body": "Supporting international scholars in research and teaching in the U.S.", "link": "https://fulbrightscholars.org/non-us-scholars/fulbright-visiting-scholar-program" },
    { "title": "Fulbright Language Teaching Assistant (FLTA)", "body": "Enhancing U.S. language instruction through international educators.", "link": "https://foreign.fulbrightonline.org/about/flta-program" },
    { "title": "Fulbright Teaching Excellence and Achievement (FTEA)", "body": "Professional development program for international secondary educators.", "link": "https://www.fulbrightteacherexchanges.org/programs/tea" },
    { "title": "Global Sports Mentoring Program (GSMP)", "body": "Empowering sports leaders worldwide through mentorship.", "link": "https://eca.state.gov/global-sports-mentoring-program-0" },
    { "title": "Hubert H. Humphrey Fellowship Program (HHHF)", "body": "Enhancing leadership and professional development for international professionals.", "link": "https://www.humphreyfellowship.org/" },
    { "title": "International Visitors Leadership Program (IVLP)", "body": "Short-term U.S. visits for international leaders.", "link": "https://www.iie.org/programs/ivlp/" },
    { "title": "International Writing Program (IWP)", "body": "Connecting global writers through creative exchange.", "link": "https://iwp.uiowa.edu/" },
    { "title": "Kennedy Lugar Youth Exchange and Study (KL-YES)", "body": "High school exchange program for international students.", "link": "https://www.yesprograms.org/" },
    { "title": "Mandela Washington Fellowship (MWF)", "body": "Leadership development for young African leaders.", "link": "https://www.mandelawashingtonfellowship.org/" },
    { "title": "Sports Visitors Program", "body": "Using sports diplomacy to build international relationships.", "link": "https://exchanges.state.gov/non-us/program/sports-visitor-program" },
    { "title": "UNVIE Youth Space Exchanges", "body": "Space-themed educational exchange program.", "link": "https://vn.usembassy.gov/unvie-space-exchanges-2022/" },
    { "title": "Study of the U.S. Institute (SUSI)", "body": "Academic and leadership programs for international students.", "link": "https://exchanges.state.gov/non-us/program/study-us-institutes-student-leaders" },
    { "title": "TechGirls", "body": "Empowering young women in STEM through mentorship and education.", "link": "https://techgirlsglobal.org/" },
    { "title": "TechWomen", "body": "Connecting women leaders in STEM fields globally.", "link": "https://www.techwomen.org/" },
    { "title": "Youth Leadership Program/Pan African Youth Leadership Program (YLP/PAYLP)", "body": "Developing leadership and entrepreneurship in African youth.", "link": "https://panafricanyouthleadershipfoundation.org/" },
    { "title": "Carrington Youth Fellowship Initiative (CYFI)", "body": "Supporting young Nigerian leaders through mentorship and development projects.", "link": "https://carringtonfellows.org/" },
    { "title": "Youth Excellence on Stage (YES)", "body": "Cultural engagement through American performing arts.", "link": "https://americanvoices.org/programs/yes-academy/" },
    { "title": "YALI Regional Leadership Center (RLC)", "body": "Leadership training for young African leaders in West Africa.", "link": "https://yaliwestafrica.net/rlc/what-is-yali/" }
  ])
}