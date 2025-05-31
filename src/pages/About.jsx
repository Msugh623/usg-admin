import React, { useEffect, useState } from "react";
import Delay from "../components/Delay";
import { useStateContext } from "../state/StateContext";
import { BiArrowToBottom, BiSearch, BiX } from "react-icons/bi";


const About = () => {
    const {about,setTitle,leaders,chapters}=useStateContext()
    
    const [psrChapters, setPsrChapters] = useState([])
    const [chapKey, setChapKey] = useState('')
        const [searchChapter, setSearchChapters] = useState(false)
    
        
    const sections = [
    {
        details: about?.whoWeAre,
        image: '/whoWeAreNodes.png',
        title: "Who We Are",
        bgClass: "themebg text-white"
    },
    {
        details: about?.whatWeDo,
        image: '',
        title: "What We Do",
        bgClass: "bg-gray-200"
    },
    {
        details: about?.howItStarted,
        image: '',
        title: "How it started",
        bgClass: "themebg text-white"
    },
    {
        details:about?.impact,
        image: '',
        title: "Our Impact",
        bgClass: "bg-gray-200"
    }
    ];
    
    useEffect(() => {
            setPsrChapters(chapters.filter(chapter =>
            (
                (chapter.name || '').toLowerCase().includes(chapKey.toLowerCase()) ||
                (chapter?.coordinator || '').toLowerCase().includes(chapKey.toLowerCase())
            )))
    }, [chapKey, chapters])
    
useEffect(() => {
          setTitle('About Us')
    }, [])

    return (
        <div className="text-gray-800 p-6 container">
            {/* About Section */}
            <div className="max-w-4xl mx-auto text-center py-5">
                <h2 className="text-2xl font-bold slideUp">About</h2>
                <Delay delay={100}>
                    <p className="text-sm slideUp text-gray-600">
                        A multi-disciplinary, non-governmental entity focusing on youth advocacy.
                    </p>
                </Delay>
            </div>

            {/* Sections */}
            <div className="max-w-6xl mx-auto mt-6 grid gap-0 mb-[100px]">
                {sections.map((section, index) => (
                    <Delay delay={(index * 100) + 100}>
                        <div key={index} className={`p-5 my-3 d-flex flex-column slideUp min-h-[250px] ${section.bgClass}`}>
                            {/* <img src="https://via.placeholder.com/150" alt="Placeholder" className="w-full h-32 object-cover mb-4 rounded" /> */}
                            <h3 className="text-xl mt-auto font-semibold">{section.title}</h3>
                            <p className="text-sm mt-2">
                                {section.details}
                            </p>
                        </div>
                    </Delay>
                ))}
            </div>

            
             <div className="max-w-4xl mx-auto text-center mt-12">
                <h2 className="text-xl font-bold">National Executive Council</h2>
                <p className="text-sm text-gray-600">Leading with vision for impact</p>
            </div>

            
             <div className="row mt-6">
                {leaders.filter(l=>l.level.toLowerCase().includes('nation')).map((member, i) => (
                    <div key={i} className="col-sm-6 my-3 col-md-4 col-lg-3 p-3 text-center">
                        <img src={member.image} alt="Placeholder" className="w-24 h-24 rounded-full mx-auto" />
                        <div className="">
                            <p className="text-sm mt-2 font-semibold">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.position}</p>
                        </div>
                    </div>
                ))}
                {
                    !leaders.filter(l => l.level.toLowerCase().includes('nation')).length ?
                        <div className='phaser p-5'></div>:<></>
                }
                 {
                    !leaders.filter(l => l.level.toLowerCase().includes('nation')).length ?
                        <div className='phaser  py-20 text-center'>
                            <Delay delay={2000}>
                                Watch this apace for National Executive council
                            </Delay>
                        </div>:<></>
                }
            </div>


            <div className="max-w-4xl mx-auto text-center mt-12">
                <h2 className="text-xl font-bold">Subcommitee Leadership Team</h2>
                <p className="text-sm text-gray-600">Driving key initiatives for a stronger USGEAA community</p>
            </div>

            
             <div className="row mt-6">
                {leaders.filter(l=>l.level.toLowerCase().includes('com')).map((member, i) => (
                    <div key={i} className="col-sm-6 my-3 col-md-4 col-lg-3 p-3 text-center">
                        <img src={member.image} alt="Placeholder" className="w-24 h-24 rounded-full mx-auto" />
                        <div className="">
                            <p className="text-sm mt-2 font-semibold">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.position}</p>
                        </div>
                    </div>
                ))}
                {
                    !leaders.filter(l => l.level.toLowerCase().includes('com')).length ?
                        <div className='phaser  py-20 text-center'>
                            <Delay delay={2000}>
                                Watch this apace for subcommitee leaders
                            </Delay>
                        </div>:<></>
                }
            </div>

            <div className="max-w-4xl mx-auto text-center mt-5 pt-5">
                <h2 className="text-xl font-bold">State Coordinators</h2>
                <p className="text-sm text-gray-600">Connecting Alumni, Strengthening Communities Across Nigeria</p>
            </div>
            <div className="container noShade row mx-auto">
                <div className="pt-4"  style={{
                    maxHeight: '800px',
                    overflowY: 'auto'
                }}>
                    <div className="d-flex bg-light p-3" style={{
                            position: 'sticky',
                            top:'-10px'
                        }}>
                        <div className={`d-flex my-auto transition cursor-[pointer] hover:rounded hover:shadow-lg hover:p-1 par ${searchChapter && 'w-100'}`} onClick={() => { setSearchChapters(prev => !prev); setChapKey('') }}>
                            <BiSearch className='fs-5 my-auto' /> <span className="px-1 ">Search</span>
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
                                        }} className="h-100 my-auto bg-light outline-0 b-never slideRight ps-2 border-0 w-100 rounded" />
                                </>
                            }
                            {
                                searchChapter && !chapKey &&
                                <div className='my-auto slideRight'> <BiX className='fs-4' /></div>
                            }
                        </div>
                    </div>

                    {/* Chapter Card */}
                    <div className="py-4 bg-white"style={{
                            position: 'sticky',
                            top:'50px'
                        }}>
                            <div className="d-flex px-3">
                                <div className=' text-muted'>
                                    Chapter
                                </div>
                                <div className="ms-auto">
                                    <a className="text-dark no-dec text-muted pe-2">Names</a>
                                </div>
                            </div>
                        </div>
                    <div className="chap">
                    {psrChapters.map((chapter, index) => (
                        <div className={`p-2 py-4 ${index%2==0&&'bg-[#123F5520]'}`} key={'' + chapter?.name + index}>
                            <div className="d-flex ">
                                <h4 className=''>
                                    {chapter.name}
                                </h4>
                                <div className="ms-auto">
                                    <a className="text-dark no-dec pe-2">{ chapter?.coordinator}</a>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
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
            </div>
        </div>
    );
};

export default About;
