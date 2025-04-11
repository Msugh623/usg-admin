import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../state/StateContext'
import Delay from '../../components/Delay'
import { BiSearch, BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'

const Events = () => {
    const { events, setModal,isFetching } = useStateContext()
    
        const [prsEvents, setPrsEvents] = useState([])
        const [key, setKey] = useState('')
            const [search, setSearch] = useState(false)
        
    useEffect(() => {
        setPrsEvents(events.filter(a => { 
                  return ( (a?.title || '').toLowerCase().includes(key.toLowerCase()) )
    }))
        }, [key, events])
  return (
      <div className="col-md-12 container row pt-4" id='alumini-making-waves'>
          <h2 className='px-4'>Events</h2>
    <div className="container noShade row mx-auto">
        <div className="pt-4"  style={{
            maxHeight: '800px',
            overflowY: 'auto'
        }}>
            <div className="d-flex bg-light p-3" style={{
                    position: 'sticky',
                    top:'0px'
                }}>
                <div className={`d-flex my-auto transition cursor-[pointer] hover:rounded hover:shadow-lg hover:p-1 par ${search && 'w-100'}`} onClick={() => { setSearch(prev => !prev); setKey('') }}>
                    <BiSearch className='fs-5 my-auto' /> <span className="px-1 ">Search</span> 
                    {
                        search && <>
                            <input type="search"
                                name=""
                                id=""
                                autoFocus
                                placeholder='Enter Alumini name to search...'
                                value={key}
                                onChange={({ target }) => setKey(target.value)}
                                onKeyDown={(e) => e.code == 'Escape' && (() => { setSearch(false); setKey('')})()}
                                style={{
                                    border: 'none !important'
                                }} className="h-100 my-auto bg-light outline-0 b-never slideRight ps-2 border-0 w-100 rounded" />
                        </>
                    }
                    {
                        search && !key &&
                        <div className='my-auto slideRight'> <BiX className='fs-4' /></div>
                          }
                         
                      </div>
                     {!search&& <div className="ms-auto slideLeft themebg rounded p-2">Add New</div>}
            </div>

            {/* Chapter Card */}
            <div className="py-4 bg-white"style={{
                    position: 'sticky',
                    top:'50px'
                }}>
                    <div className="d-flex px-3">
                        <div className=' text-muted w-[30%] min-w-[30%] md:w-[30%] md:min-w-[30%]'>
                            Name
                        </div>
                        <div className="me-auto">
                          </div>
                          <div className="ms-auto">
                            <a className="text-dark no-dec text-muted pe-2">Action</a>
                        </div>
                    </div>
                </div>
            <div className="chap">
            {prsEvents.map((chapter, index) => (
                <div
                  className={`p-4 flex items-center justify-between ${
                    index % 2 === 0 ? 'bg-[#123F5520]' : 'bg-white'
                  }`}
                  key={`${chapter?.name}${chapter?.whatsappLink}${index}`}
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">
                        {chapter.name.slice(0, 70)}{chapter?.name>70&&'...'}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {(new Date(chapter.date)).toDateString() || 'Date'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-200">
                      Edit
                    </button>
                    <button className="border border-gray-300 text-red-600 px-4 py-2 rounded hover:bg-red-100">
                      <FaTrash className="icon" />
                    </button>
                  </div>
                </div>
            ))}
            </div>
            {
                !prsEvents.length ?
                    <div className="p-3 h-100">

                        <div className='phaser p-5'>
                            <Delay delay={2000}>
                                {
                                    key ?
                                        'No Wave making Alumini found  matching your search, Try a different keyword'
                                        : !isFetching?'Watch this space for Alumini Making Waves':''
                                }
                            </Delay>
                        </div>

                    </div>
                    : ''
            }
        </div> 
        </div>
    </div>
  )
}

export default Events