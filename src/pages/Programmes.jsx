import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/dp.css";
import Delay from '../components/Delay';
import { useStateContext } from '../state/StateContext';
import { BsTriangle } from 'react-icons/bs';
import { useEffect } from 'react';

const Programmes = () => {
    const { setTitle }=useStateContext()

    useEffect(() => {
        setTitle('Programs')
    }, [])

    return (
        <div className="min-h-screen ">
            <div className="relative fade-in bg-cover bg-center h-[auto] py-5 flex items-center justify-center" style={{ backgroundImage: 'url(https://via.placeholder.com/1500)' }}>
                <div className="absolute inset-0 bg-[#123F551A]"></div>
                <div className="relative text-center col-12 px-6">
                    <h2 className="text-5xl font-bold mt-4 slideUp">Programs and Initiatives</h2>
                    <p className="mt-3 text-lg slideUp">Explore our initiatives, stay updated, and join upcoming events</p>
                    <div className="mt-6 mb-3 container grid  md:grid-cols-3 gap-4 content-center">
                        {["News", "Programs", "Events"].map((item, index) => (
                            <Delay delay={index * 100}>
                                <div key={index} className="text-black slideUp rounded-lg p-2">
                                    <a href={'#' + item}>
                                        <img src={`programHeroCard${index + 1}.png`} alt={item} className="p-2 mx-auto object-cover rounded-md" />
                                    </a>
                                    <div className="text-sm font-bold mt-2 text-center">{item}</div>
                                </div>
                            </Delay>
                        ))}
                    </div>
                </div>
            </div>
            <Delay delay={300}>
                <NewsSection />
            </Delay>
            <ProgramsSection theCategory='Ongoing' />
            <EventCalendar />
            <EventsSection />
        </div>
    )
}

export default Programmes

function NewsSection() {
    const { news, featured }=useStateContext()

    return (
        <div className="text-black slideUp container mt-5" id='News'>
            <div className="relative py-10 text-center">
                <h3 className="text-2xl font-bold">News</h3>
                <p className="text-sm mt-2">Stay informed with the latest updates and stories from our alumni community.</p>
            </div>

            <div className="py-10 px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className='d-block d-md-none'>
            {(() => {
                        const picked = featured
                        return picked?.title ? <div className="items-center gap-4 border-bottom pb-4 mb-4"> 
                            <h5 className="fw-bold mb-3 text-center">Featured</h5>
                            <img src={picked.image} alt={picked.title} className="min-w-[100px] w-100 object-cover rounded-md" />                        
                            <div className=" p-0 m-0 text-gray-700"><div className="small">Published on {(new Date(picked?.publishedAt)).toDateString()} </div>
                                       {picked?.content} <a href={picked.url} target='_blank' className="text-blue-500 cursor-pointer">read more</a>
                                    </div>
                        </div> : <>
                                <div className="phaser px-5 py-[70px]">
                                    <div className="mx-auto d-flex small text-center">
                                       The Featured Story Will Appear Here
                                    </div>
                                </div>
                        </>
                    })()}
                </div>
                <div className="md:col-span-2">
                <h5 className="fw-bold mb-3 text-center">Latest</h5>
                    {news.map((item, index) => (
                        <>
                         <div key={index} className="flex items-center gap-4 border-bottom pb-4 mb-4">
                            <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                            <div><div className="h6 fw-bold ">Headline</div>
                                <h6 className="text-lg mb-0 font-bold">{item.title}</h6>
                                    <div className=" p-0 m-0 text-gray-700"><div className="small mb-2">Published on {(new Date(item?.publishedAt)).toDateString()}</div>
                                       {item?.content} <a href={item.url} target='_blank' className="text-blue-500 cursor-pointer">read more</a>
                                    </div>
                            </div>
                        </div>
                        </>
                    ))}
                    {
                        !news?.length?
                            <>
                                <div className="phaser p-[70px]">
                                    <div className="mx-auto d-flex small text-center">
                                       Latest news goes here
                                    </div>
                                </div>
                            </>
                            :''
                    }
                </div>

                <div className='d-none d-md-block pt-0'>
                    {(() => {
                        const picked = featured
                        return picked?.title ? <div className=" items-center gap-4 border-bottom pb-4 mb-4">
                            <h5 className="fw-bold mb-1 text-center">Featured</h5>
                            <img src={picked.image} alt={picked.title} className="min-w-[100px] w-100 object-cover rounded-md" />
                            <div className=" p-0 m-0 text-gray-700"><div className="small mb-2">Published on {(new Date(picked?.publishedAt)).toDateString()} </div>
                                       {picked?.content} <a href={picked.url} target='_blank' className="text-blue-500 cursor-pointer">read more</a>
                                    </div>
                        </div> : <>
                                <div className="phaser px-5 py-[70px]">
                                    <div className="mx-auto d-flex small text-center">
                                       The Featured Story Will Appear Here
                                    </div>
                                </div>
                        </>
                    })()}
                </div>
            </div>
        </div>
    );
}

function ProgramsSection() {
    const categories = ["Ongoing", "Past"];
    const [theCat, setTheCat] = useState('Ongoing')
    const { events, isFetching } = useStateContext()
    const filters = {
        Ongoing: (item) => {
            const date = Date.now()
            const iDate = Number((new Date(item)).valueOf())
            const diff = Number(iDate) - Number(date)
            // console.log(diff)
            return Boolean((diff > (-1 * Number(60*60*24)))&&iDate < date)
        },
        Past: (item) => {
            const date = Date.now()
            const iDate = Number(new Date(item))
            return Boolean(iDate < date)
        }
    }
    const prs = events.filter(prg => filters[theCat](prg?.date))
    return (
        <div className=" bg-gray-50 text-gray-900 bg-gray-100" id='Programs'>
            <div className="relative  py-12 text-center">
                <h3 className="fs-3 mb-3 font-extrabold slideUp">Programs </h3>
                <p className="text-md mt-2 text-gray-600 slideUp">Explore ongoing and past programs</p>
                <div className="flex justify-center mt-6 space-x-4" >
                    <div className="themetxt p-1" style={{
                        borderRadius: '60px',
                        border: `2px solid #123F55`
                    }}>
                        {categories.map((category, index) => (
                            <button key={index} onClick={() => setTheCat(category)} className={`px-6 py-2 ${theCat == category ? 'themebg' : ''} rounded-full transition-all`} style={{
                                borderRadius: '60px'
                            }} >{category}</button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-12 px-8 max-w-5xl mx-auto grid grid-cols-1 gap-8">
                {prs.map((item, index) => (
                    <Delay delay={0}>
                        <div key={index} className="md:flex items-center flex-column flex-md-row gap-6 p-6 border-bottom">
                            <img src={item.image} alt={item.name} className="w-28 h-28 object-cover rounded-lg" />
                            <div>
                                <h6 className="text-xl font-semibold">{item.name}</h6>
                                <p className="text-md text-gray-700 mt-2">{item.description}</p>
                                <Link to={item?.url} className="mt-3 px-3 py-2 text-white rounded-full shadow-md themebg  transition-all" style={{
                                    borderRadius: '60px'
                                }}>Learn more</Link>
                            </div>
                        </div>
                    </Delay>
                ))}
                {
                    !prs.length ?
                        <div className='phaser rounded d-flex text-center p-[200px]'>
                            {!isFetching && <div className='mx-auto d-flex text-center'><BsTriangle className='fs-5 mt-1 icon me-2' /> No {theCat} Programs found </div>}
                        </div>
                        : ''
                }
            </div>
        </div>
    );
}

function EventCalendar() {
    const [selectedDate, setSelectedDate] = useState('');
    const {events}=useStateContext()

    return (
        <div className="mt-20 flex justify-center items-center p-6">
            <div className="max-w-4xl w-full  rounded-lg p-3 px-md-6">
                <div className="text-center pb-4">
                    <h4 className="text-">
                        Discover upcoming events and relive past moments that bring us together.
                    </h4>
                </div>

                <div className="row items-center mt-6">
                    <div className="flex pt-4 ps-md-5 col-md-6">
                        <span></span>
                        {!selectedDate ?
                            <p className="text-lg font-semibold w-100">📅 Pick a date to see events</p>
                            : (() => {
                                const date = new Date(selectedDate)
                                return <p className="text-lg font-semibold w-100">
                                    Events on {date.toDateString()}
                                    {(()=>{
                                        const dPrgs = events.filter(e => (new Date(e.date)).toDateString()==selectedDate.toDateString())
                                        return <>
                                            <div className="mt-4 w-100">
                                            {dPrgs.map((item, index) => (
                                                <div key={index} className="md:flex justify-between slideIn w-100  md:items-center shadow rounded p-3 pb-0 border-bottom my-4 my-md-0">
                                                    <div>
                                                        <h6 className="text-left mb-3 font-semibold">{item.name} ({(new Date(item.date)).toDateString()})</h6>
                                                        <p className="text-md text-gray-700 mt-2">{item.description}</p>
                                                    </div>

                                                    <Link to={item?.url} className="px-4 py-2 mt-md-0 themebg roundAf rounded-full shadow-md hover:bg-blue-700 transition-all no-dec">Register</Link>
                                                    <div className="mb-3 md:mb-0 d-md-none"></div>
                                                </div>
                        ))}
                                        </div>
                                        </>
                                    })()}
                                </p>
                            })()
                        }
                    </div>

                    <div className="mt-4 d-flex justify-content-center p-0 px-md-4 col-md-6" style={{
                        overflowX: 'auto'
                    }}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            inline
                            className="text-center mx-auto bg-primary w-100"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


function EventsSection() {
    const {events}=useStateContext()

    const eventsData = [
       ...events
    ];

    const filters = {
        Upcoming: (item) => {
            const date = Date.now()
            const iDate = Number(new Date(item))
            return Boolean(iDate > date)
        },
        Past: (item) => {
            const date = Date.now()
            const iDate = Number(new Date(item))
            return Boolean(iDate < date)
        }
    }

    const future = eventsData.filter(event => filters.Upcoming(event?.date))
    
    return (
        <div className=" text-dark" id='Events'>
            {
                <div className="relative  py-12 mt-12">
                    <h5 className="text-3xl font-extrabold text-center ">Upcoming Events</h5>
                    <div className="py-12 px-8 max-w-5xl mx-auto grid grid-cols-1 gap-8">
                        {future.map((item, index) => (
                            <div key={index} className="md:flex justify-between  md:items-center p-6 border-bottom my-4 my-md-0">
                                <div>
                                    <h6 className="text-left mb-3 font-semibold">{item.name} ({(new Date(item.date)).toDateString()})</h6>
                                    <p className="text-md text-gray-700 mt-2">{item.description}</p>
                                </div>

                                <Link to={item?.url} className="px-4 py-2 mt-md-0 themebg roundAf rounded-full shadow-md hover:bg-blue-700 transition-all no-dec">Register</Link>
                                <div className="mb-3 md:mb-0 d-md-none"></div>
                            </div>
                        ))}{
                !future.length ?
                    <div className='phaser rounded d-flex text-center p-[200px]'>
                        <div className='mx-auto d-flex text-center'>Watch this space for upcoming events</div>
                    </div>
                    : ''
            }
                    </div>
                </div>
            }
            

            {/* {
                <div className="relative py-12  bg-gray-100 text-center mt-12">
                    <h5 className="text-3xl font-extrabold mt-4">Past Events</h5>
                    <div className="py-12 px-8 max-w-5xl mx-auto grid grid-cols-1 gap-8">
                        {past.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-6 border-bottom mt-4">
                                <div>
                                    <h6 className="p-0 text-left font-semibold">{item.name} ({(new Date(item.date)).toDateString()})</h6>
                                    <p className="text-md text-gray-700 mt-2">{item.description}</p>
                                </div>
                                <Link to={item?.url} className="px-4 py-2 roundAf no-dec themebg rounded-full shadow-md hover:bg-gray-700 transition-all">View</Link>
                            </div>
                        ))}{
                !past.length ?
                    <div className='phaser rounded d-flex text-center p-5'>
                        <div className='mx-auto d-flex text-center'>Watch this space for past events</div>
                    </div>
                    : ''
            }
                    </div>
                    
                </div> 
            } */}
            
        </div >
    );
}
