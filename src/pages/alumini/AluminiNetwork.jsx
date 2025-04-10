import React, { useEffect, useState } from 'react'
import { BiArrowToBottom, BiChevronDown, BiSearch, BiX } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import Delay from '../../components/Delay'
import { useStateContext } from '../../state/StateContext'
import { FaSpinner } from 'react-icons/fa'

const AluminiNetwork = () => {
    const { users, industries, locations, isFetching, chapters, setModal,uprograms, setTitle,impact ,amw, ams} = useStateContext()
    const [psrUsr, setPsrUsr] = useState([])
    const [keyword, setKeyword] = useState('')
    const [chapKey, setChapKey] = useState('')
    const [psrChapters, setPsrChapters] = useState([])
    const [filter, setFilter] = useState(false)
    const [searchChapter, setSearchChapters] = useState(false)
    const [filt, setFilt] = useState('')
    const [viewPane, setViewPane] = useState('')

    useEffect(() => {
        setPsrUsr(keyword.length>1 ? users.filter(usr =>
        (
            (usr?.fullname || '').toLowerCase().includes(keyword.toLowerCase()) ||
            (usr?.state || '').toLowerCase().includes(keyword.toLowerCase()) ||
            (usr?.industry || []).toString().toLowerCase().includes(keyword.toLowerCase()) ||
            ((usr?.programme || []).toString()).toLowerCase().includes(keyword.toLowerCase()) ||
            (keyword.toLowerCase().includes('expert') && usr?.expert) ||
            (keyword.toLowerCase().includes('notable') && usr?.notable)
        )
        ) : [])
        setFilt('')
    }, [keyword, users])

    useEffect(() => {
        setPsrChapters(chapters.filter(chapter =>
        (
            (chapter.name || '').toLowerCase().includes(chapKey.toLowerCase())
        )))
        setFilt('')
    }, [chapKey, chapters])

    useEffect(() => {
        setTitle('Alumini Network')
      const pane=document.getElementById('viewPane')
        if(pane){
            pane.scrollIntoView({behavior:'smooth',block:'center'})
        }
    }, [filter])
    

    return (
        <div>
            {/* Hero Section */}
            <div className="container pt-5">
                <div className="row m-auto slideUp">
                    <div className="col-md-5 d-flex px-0">
                        <img src="/aluminiUsrs.png" alt="" className="mx-auto me-md-4 img-fluid" />
                    </div>
                    <div className="col-md-6 d-flex text-center g-0 flex-column py-4 ps-md-4">
                        <h1 className='me-aut'>Alumini Network</h1>
                        <div className="mt-4">
                            Search with name, state, industry, programme or Expert
                        </div>
                    </div>
                </div>
                <Delay delay={100}>
                    <div className="d-flex slideUp flex-column py-5">
                        <label className="mx-auto border border-2 rounded p-2 d-flex w-75">
                            <BiSearch className='fs-3 my-auto' />
                            <input type="search"
                                name=""
                                id=""
                                placeholder='Type here...'
                                value={keyword}
                                onChange={({ target }) => setKeyword(target.value)}
                                style={{
                                    border: 'none !important'
                                }} className="h-100 my-auto outline-0 b-never ps-2 border-0 w-100 rounded" />
                            {psrUsr.length&&!keyword?<BiX className='fs-4 m-auto' onClick={() => {
                                setPsrUsr([])
                            }} />:''}
                            <BiChevronDown className='fs-5 m-auto' onClick={() => {
                                setFilter(prev => !prev)
                                setViewPane('')
                            }} />
                        </label>
                        {(!filter && !keyword && !filt) && <div className=" ms-auto me-auto me-md-0"> 
                            <Delay delay={50}>
                                <Link to={'/get-started'} className="btn px-3 slideUp py-2 mt-5 themetxt border bg-none border-2">
                                    <div className="px-5">Join Today</div>
                                </Link >
                            </Delay>
                        </div>}
                    </div>
                </Delay>
            </div>
            {
                filter ?
                    <div className="container" id='viewPane' style={{
                        maxHeight:'500px',
                        overflow:'auto'
                    }}>
                        <div className={`p-3 shadow-sm border rounded  col-md-8 mx-auto ${!industries.length && !locations.length ? 'phaser p-5' : 'slideUp'}`}>
                            {!industries.length && !locations.length && !isFetching && <div className='text-center'>Something went Wrong! Try refreshing to see if that helps</div>}
                           {isFetching&&<FaSpinner className='spinner fs-5' />}
                            <>
                                <h3 className='py-2 fw-normal' onClick={() => {
                                    setViewPane((prev)=>prev=='state'?'':'state')
                              }}>State</h3>
                                {viewPane=='state'?
                                    <div className="py-3 slideUp">
                                    {locations.map((loc, i) => (
                                        <button className='btn m-1' key={loc + i} onClick={() => {
                                            setPsrUsr(users.filter(usr => {
                                                const con=(usr.state||'').toLowerCase().includes(loc.toLowerCase())
                                                return con
                                            }))
                                            setFilter(false)
                                            setFilt(loc)
                                        }}>
                                            {loc}
                                        </button>
                                    ))}
                                </div>:''}
                            </>
                            <>
                                <h3 className='py-2 fw-normal' onClick={() => {
                                    setViewPane((prev)=>prev=='industry'?'':'industry')
                              }}>Industry</h3>                                
                               {viewPane=='industry'? <div className="py-3 slideUp">
                                    {industries.map((indt, i) => (
                                        <button className='btn m-1' key={indt + i} onClick={() => {
                                            setPsrUsr(users.filter(usr => usr.industry.toString().includes(indt)))
                                            setFilter(false)
                                            setFilt(indt)
                                        }}>
                                            {indt}
                                        </button>
                                    ))}
                                </div>:''}
                            </>                           
                            <>
                                <h3 className='py-2 fw-normal' onClick={() => {
                                    setViewPane((prev)=>prev=='program'?'':'program')
                              }}>Programme</h3>
                              {viewPane=='program'?  <div className="py-3 slideUp">
                                    {uprograms.map((uprg, i) => (
                                        <button className='btn m-1' key={uprg + i} onClick={() => {
                                            setPsrUsr(users.filter(usr => usr.programme.toString().includes(uprg)))
                                            setFilter(false)
                                            setFilt(uprg)
                                        }}>
                                            {uprg}
                                        </button>
                                    ))}
                                </div>:''}
                            </> 
                            <h3 className='py-2 fw-normal' onClick={() => {
                                const experts=users.filter(usr => usr?.expert)
                                setPsrUsr(experts)
                                setFilter(false)
                                setFilt(experts.length?'Expert':'')
                                !experts.length && alert('No Expert Found')
                                }}>Expert</h3>
                        </div>
                    </div> : ''
            }
            {!filter && psrUsr.length ?
                <div className="w-full  mx-auto p-6 slideUp">
                    <h2 className="text-xl font-semibold text-center mb-6">
                      {psrUsr.length}  Results for <span className="font-bold">"{filt || keyword}"</span>
                    </h2>
                    <div className="grid gap-6 md:px-[5vw] py-3 pb-5 lg:px-[15vw] lg:px-[10vw] mx-auto xl:max-w-[1208px] sm:grid-cols-2" style={{
                        maxHeight: '600px',
                        overflow: 'auto',
                        // boxShadow:'inert 20px 10px 20px #0e0e0e'
                    }}>
                        {psrUsr.slice(0).map((person) => (
                            <div
                                key={person._id}
                                className="flex flex-col items-center p-2 "
                            >
                                <div className="d-flex w-100 h-100 p-2 border shadow-lg  transition rounded-lg hover:shadow-xl">
                                    <div className=" my-auto ">
                                        <img
                                            src={person.photo}
                                            alt={person.fullname}
                                            className="w-20 h-20 object-cover mb-3"
                                            style={{ minWidth: '100px' }}
                                        />
                                    </div>
                                    <div className="ps-3 d-flex flex-column">
                                        <h3 className="text-lg font-bold">{person.fullname}</h3>
                                        <div className="text-sm text-gray-600">
                                            <div className="text-truncate w-100" style={{
                                                overflow: 'hidden',
                                                maxWidth:'220px'
                                            }}>{person.industry}</div>
                                        <div className="text-truncate w-100" style={{
                                                overflow: 'hidden',
                                                maxWidth:'220px'
                                            }}>{person.programme}</div></div>
                                        <div className="text-sm text-gray-500">{person.state}</div><br />
                                        <Link to={'/usr/' + person._id} className="text-green-600 mt-auto font-semibold hover:underline">
                                            Connect
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> : ``
            }
            {!psrUsr.length && keyword ?
                <div className='container'>
                    {
                        <div className='phaser text-center p-5'>
                            <Delay delay={2000}>
                                {!isFetching && keyword.length<2? <>Search keyword must be more that one character</>:<>No data found matching your search! Try a different keyword</>}
                            </Delay>
                        </div>
                    }
                </div>
                : ''
            }
            <div className="d-flex flex-column container p-4 pt-0">
                {(filter || keyword || filt) && <div className="ms-auto me-auto me-md-0">
                    <Delay delay={50}>
                        <Link to={'/get-started'} className="btn px-3 slideIn py-2 mt-5 themetxt border bg-none border-2">
                            <div className="px-5">Join Today</div>
                        </Link >
                    </Delay>
                </div>}
            </div>
            {/* Alumini of the month */}
            <Delay delay={200}>
                <section className="themebg slideUp my-5 mt-4" id='alumini-of-the-week'>
                   {ams?.name? <div className="container px-md-4 row mx-auto">
                        <h5 className='d-sm-none text-center'>Alumini Spotlight</h5>
                        <div className="col-sm-3 my-auto d-flex flex-column">
                            <img src={ams?.image} alt="" className=" img-fluid mx-auto p-5 p-sm-0 pb-2 pb-sm-4 " style={{
                                borderRadius:'100px'
                            }}/>
                            <div className='text-center small mx-auto'>
                                <div className="small">
                                    <div>{ams?.tag}</div>
                                    <b>{ams?.name}</b>
                                </div>
                            </div>
                        </div>
                        <div className="text-center col-sm-9 p-4 ps-md-5 my-auto">
                            <h5 className='d-none d-sm-block'>Alumini Spotlight</h5>
                            <div className="small">
                                {ams?.details} {ams?.url&&<a href={ams?.url}  className='fw-bold text-light hover:text-[#efefef60]'>Read More</a>}
                            </div>
                        </div>
                    </div>
                        : <>
                            <div className="phaser text-center p-[100px] m-3">
                                Alumini Spotlight
                            </div>
                        </>
                    }
                </section>
            </Delay>

            <section className="my-5 d-flex" id='chapters'>
                <div className="container row mx-auto">
                    <div className="col-md-6 pt-4"  style={{
                        maxHeight: '800px',
                        overflowY: 'auto'
                    }}>
                        <div className="d-flex">
                            <div className={`d-flex my-auto transition cursor-[pointer] hover:rounded hover:shadow-lg hover:p-1 par ${searchChapter && 'w-100'}`} onClick={() => { setSearchChapters(prev => !prev); setChapKey('') }}>
                                <BiSearch className='fs-5 my-auto' /> <span className="px-1 disp-child">Search</span>
                                {
                                    searchChapter && <>
                                        <input type="search"
                                            name=""
                                            id=""
                                            autoFocus
                                            placeholder='Enter a Chapter name or address to search...'
                                            value={chapKey}
                                            onChange={({ target }) => setChapKey(target.value)}
                                            onKeyDown={(e) => e.code == 'Escape' && (() => { setSearchChapters(false); setChapKey('')})()}
                                            style={{
                                                border: 'none !important'
                                            }} className="h-100 my-auto outline-0 b-never slideRight ps-2 border-0 w-100 rounded" />
                                    </>
                                }
                                {
                                    searchChapter && !chapKey &&
                                    <div className='my-auto slideRight'> <BiX className='fs-4' /></div>
                                }
                            </div>
                            {!searchChapter && <h3 className="text-center slideLeft w-100 my-3 mb-4">
                                Chapters
                            </h3>}
                        </div>

                        {/* Chapter Card */}
                        {psrChapters.map((chapter, index) => (
                            <div className="p-4" key={'' + chapter?.name + index}>
                                <div className="d-flex">
                                    <h4 className='px-3'>
                                        {chapter.name}
                                    </h4>
                                    {/* <div className="d-flex">
                                        <div className="my-auto">
                                            <MdLocationPin className='fs-2 mx-2' />
                                        </div>
                                        <div className="">
                                            {
                                                chapter?.address
                                            }
                                        </div>
                                    </div> */}
                                    <div className="ms-auto">
                                        <a href={chapter?.whatsappLink} className="text-green pe-2">Join</a>
                                    </div>
                                </div>
                                {/* <div className="d-flex pt-2 fs-5">
                                    <div className="my-auto d-flex w-100 py-2">
                                        <FiUsers className='fs-5 mx-3' />
                                        <div className="my-auto mt-0 fs-6">{chapter?.members?.length || 'No'} Members {!chapter?.members?.length ? 'yet' : ''}</div>
                                        
                                    </div>
                                </div> */}
                            </div>
                        ))}
                        {
                            !psrChapters.length ?
                                <div className="p-3 h-100">

                                    <div className='phaser p-5'>
                                        <Delay delay={2000}>
                                            {
                                                chapKey ?
                                                    'No Chapters with found matching your search, Try a different keyword'
                                                    : 'Watch this space for our Alumini Chapters'
                                            }
                                        </Delay>
                                    </div>

                                </div>
                                : ''
                        }

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

                    {/* Notable Alumini */}
                    <div className="col-md-6 row pt-4" id='alumini-making-waves'>
                        <h3 className="text-center my-3 mb-4 px-3">
                            ALUMNI MAKING WAVES
                        </h3>
                        {amw.map((usr, i) => (
                            <div className="col-6 p-2 cursor-[pointer] hover:shadow-lg hover:rounded transition" key={usr._id + i + 'usrAf'} onClick={() => {
                                setModal(<>
                                    <div className="row">
                                    <div className="mx-auto">
                                        <img src={usr.image} alt={usr.name} className="img-fluid mx-auto rounded" style={{
                                            // minHeight: '165px'
                                        }} />
                                    </div>
                                    <div className="mx-auto pb-3">
                                        <h5 className='text-center mb-1'>{usr.name}</h5>
                                        <div className="text-center mb-3">{usr.category} </div>
                                        <div className="text-center col-md-8 mx-auto">{usr.tag} </div>
                                        <div className="small px-0">
                                            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vero facilis a commodi eveniet <small className="text-success">...Read_more</small> */}
                                        </div>
                                   </div>
                                </div>
                                </>)
                            }}>
                                <div className="d-flex">
                                    <img src={usr.image} alt={usr.name} className="img-fluid mx-auto w-[165px] object-cover p-2 p-sm-4 pb-sm-3" style={{
                                        minHeight: '165px',
                                        borderRadius:'30px'
                                    }} />
                                </div>
                                <h5 className='text-center'>{usr.name}</h5>
                                <div className="text-center">{usr.category}</div>
                                <div className="text-center">{(usr?.tag||'').slice(0,40)} <span className="fw-bold">...Read More</span></div>
                                <div className="small px-0">
                                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vero facilis a commodi eveniet <small className="text-success">...Read_more</small> */}
                                </div>
                            </div>))
                        }

                    </div>
                </div>
            </section>

            {/* Blue State chapters story */}

            {/* Blue opaque section */}
            <section className="py-4" id='impacts' style={{
                backgroundColor: '#123F5530'
            }}>
                <div className="container d-flex flex-column">
                    <h2 className="text-center mt-4 mb-2">
                        STATE CHAPTERS/PROGRAM GROUPS IMPACT STORIES
                    </h2>
                    <div className="text-center mb-3">
                        See outstanding works from Exchange alumni from far and wide
                    </div>

                    {impact.map((story, index) => (
                        <div key={index} className="storycard mb-4 py-4 d-flex px-3 px-md-3" style={{ maxHeight: '120px', overflow: 'hidden' }}>
                            <div className="d-flex h-100 pt-1">
                                <img src={story.image} alt="" className="img-fluid h-100 my-auto rounded" style={{
                                    minWidth: '150px',
                                    objectFit: 'contain'
                                }} />
                            </div>
                            <div className="px-3">
                                <div className="right-[20px] sm:right-[70px] md:right-[80px] lg:right-[90px]" style={{
                                    position: 'absolute',
                                    // right:'0px'
                                }}> <div className="bg-[#d2dbdf] cursor-[pointer] text-primary px-1" style={{
                                    position: 'relative',
                                    top: '72px'
                                }} onClick={() => setModal(<PopContainer data={story} />)}> ...Read full content</div></div>
                                {story.title && <div className="fw-bold">{story.title}</div>}
                                {story.description}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default AluminiNetwork


function PopContainer({ data }) {
    return <div className="storycard mb-4 py-4 d-flex flex-column px-md-3" >
        {data.title && <div className="fw-bold fs-3 mb-3 px-md-3">{data.title}</div>}
        <div className="d-flex h-100 pt-1 px-md-3 mb-4">
            <img src={data.image} alt="" className="img-fluid rounded" style={{
                // minWidth: '150px',
                objectFit: 'contain'
            }} />
        </div>
        <div className="px-md-3">
            {data.description}
        </div>
    </div>
}