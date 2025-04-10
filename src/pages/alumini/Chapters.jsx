import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../state/StateContext'
import Delay from '../../components/Delay'
import { BiSearch, BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'

const Chapters = () => {
    const { chapters, setModal } = useStateContext()
    
        const [prsChapters, setChapters] = useState([])
        const [chapKey, setChapKey] = useState('')
            const [searchChapters, setSearchChapters] = useState(false)
        
    useEffect(() => {
        setChapters(chapters.filter(a => { 
                  return ( (a?.name || '').toLowerCase().includes(chapKey.toLowerCase()) )
    }))
        }, [chapKey, chapters])
  return (
      <div className="col-md-12 container row pt-4" id='alumini-making-waves'>
          <h2 className='px-4'>Chapters</h2>
    <div className="container noShade row mx-auto">
        <div className="pt-4"  style={{
            maxHeight: '800px',
            overflowY: 'auto'
        }}>
            <div className="d-flex bg-light p-3" style={{
                    position: 'sticky',
                    top:'0px'
                }}>
                <div className={`d-flex my-auto transition cursor-[pointer] hover:rounded hover:shadow-lg hover:p-1 par ${searchChapters && 'w-100'}`} onClick={() => { setSearchChapters(prev => !prev); setChapKey('') }}>
                    <BiSearch className='fs-5 my-auto' /> <span className="px-1 ">Search</span> 
                    {
                        searchChapters && <>
                            <input type="search"
                                name=""
                                id=""
                                autoFocus
                                placeholder='Enter Alumini name to search...'
                                value={chapKey}
                                onChange={({ target }) => setChapKey(target.value)}
                                onKeyDown={(e) => e.code == 'Escape' && (() => { setSearchChapters(false); setChapKey('')})()}
                                style={{
                                    border: 'none !important'
                                }} className="h-100 my-auto bg-light outline-0 b-never slideRight ps-2 border-0 w-100 rounded" />
                        </>
                    }
                    {
                        searchChapters && !chapKey &&
                        <div className='my-auto slideRight'> <BiX className='fs-4' /></div>
                          }
                         
                      </div>
                     {!searchChapters&& <div className="ms-auto slideLeft themebg rounded p-2">Add New</div>}
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
                            <a className="text-dark no-dec text-muted pe-2">Link</a>
                          </div>
                          <div className="ms-auto">
                            <a className="text-dark no-dec text-muted pe-2">Action</a>
                        </div>
                    </div>
                </div>
            <div className="chap">
            {prsChapters.map((chapter, index) => (
                <div className={`p-2 py-4 ${index%2==0&&'bg-[#123F5520]'}`} key={'' + chapter?.name + chapter?.whatsappLink+index}>
                    <div className="d-flex ">
                        <h4 className='w-[30%] min-w-[30%] md:w-[30%] md:min-w-[30%]'>
                            {chapter.name}
                        </h4>
                        <div className="me-auto">
                            <a href={chapter?.whatsappLink} className="text-dark no-dec pe-2">{ chapter?.whatsappLink}</a>
                        </div>
                        <div className=" ms-auto d-flex ps-3">
                            <div className="ms-auto slideLeft border border-dark rounded p-2">Edit</div>
                            <div className="m-1"></div>
                        <div className="ms-auto slideLeft border border-dark rounded p-2 pt-3"><FaTrash className='icon'/></div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            {
                !prsChapters.length ?
                    <div className="p-3 h-100">

                        <div className='phaser p-5'>
                            <Delay delay={2000}>
                                {
                                    chapKey ?
                                        'No Wave making Alumini found  matching your search, Try a different keyword'
                                        : 'Watch this space for Alumini Making Waves'
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

export default Chapters