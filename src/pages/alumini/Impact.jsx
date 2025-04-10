import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../state/StateContext'
import Delay from '../../components/Delay'
import { BiSearch, BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'

const Impact = () => {
    const { impact, setModal } = useStateContext()
    
        const [prsImpact, setImpact] = useState([])
        const [chapKey, setChapKey] = useState('')
            const [searchAmw, setSearchAmw] = useState(false)
        
    useEffect(() => {
        setImpact(impact.filter(a => { 
                  return ( (a?.title || '').toLowerCase().includes(chapKey.toLowerCase()) ||
            (a?.description || '').toLowerCase().includes(chapKey.toLowerCase()))
    }))
        }, [chapKey, impact])
  return (
      <div className=" py-4 pb-5" id='alumini-making-waves' >
          <h2 className='px-4'>Impact Stories</h2>
    <div className="container noShade row mx-auto">
        <div className="pt-4"  style={{
            maxHeight: '800px',
            overflowY: 'auto'
        }}>
            <div className="d-flex bg-light p-3" style={{
                    position: 'sticky',
                    top:'0px'
                }}>
                <div className={`d-flex my-auto transition cursor-[pointer] hover:rounded hover:shadow-lg hover:p-1 par ${searchAmw && 'w-100'}`} onClick={() => { setSearchAmw(prev => !prev); setChapKey('') }}>
                    <BiSearch className='fs-5 my-auto' /> <span className="px-1 ">Search</span> 
                    {
                        searchAmw && <>
                            <input type="search"
                                name=""
                                id=""
                                autoFocus
                                placeholder='Enter Alumini name to search...'
                                value={chapKey}
                                onChange={({ target }) => setChapKey(target.value)}
                                onKeyDown={(e) => e.code == 'Escape' && (() => { setSearchAmw(false); setChapKey('')})()}
                                style={{
                                    border: 'none !important'
                                }} className="h-100 my-auto bg-light outline-0 b-never slideRight ps-2 border-0 w-100 rounded" />
                        </>
                    }
                    {
                        searchAmw && !chapKey &&
                        <div className='my-auto slideRight'> <BiX className='fs-4' /></div>
                          }
                         
                      </div>
                     {!searchAmw&& <div className="ms-auto slideLeft themebg rounded p-2">Add New</div>}
            </div>

            {/* Chapter Card */}
            <div className="py-4 bg-white"style={{
                    position: 'sticky',
                    top:'50px'
                }}>
                    <div className="d-flex px-3">
                        <div className=' text-muted w-[50%] min-w-[50%] md:w-[35%] md:min-w-[35%]'>
                            Title
                        </div>
                        <div className="me-auto">
                            <a className="text-dark no-dec text-muted pe-2">Description</a>
                          </div>
                          <div className="ms-auto">
                            <a className="text-dark no-dec text-muted pe-2">Action</a>
                        </div>
                    </div>
                </div>
            <div className="chap">
            {prsImpact.map((chapter, index) => (
                <div className={`p-2 py-4 pb-0 pt-1 ${index%2==0&&'bg-[#123F5520]'}`} key={'' + chapter?.name + chapter?.description}>
                    <div className="d-flex ">
                        <div className="pt-3 pe-3">
                            <img
                                src={chapter?.image}
                                alt={chapter?.name}
                                className="min-w-[70px] my-auto max-w-[80px] object-cover mb-4" />
                        </div>
                        <div className="max-w-[80%] my-auto" >
                            <h4 className=''>
                                <div className="">{chapter.title.slice(0,64)}...</div>
                            </h4>
                            <div className="me-auto">
                                <a className="text-dark no-dec pe-2">{ chapter?.description.slice(0,64)}...</a>
                            </div>
                        </div>
                        <div className="ms-auto m d-flex ps-3">
                            <div className="my-auto d-flex">
                            <div className="ms-auto slideLeft border border-dark rounded p-2">Edit</div>
                            <div className="m-1"></div>
                            <div className="ms-auto slideLeft border border-dark rounded p-2 pt-3"><FaTrash className='icon'/></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            {
                !prsImpact.length ?
                    <div className="p-3 h-100">

                        <div className='phaser p-5'>
                            <Delay delay={2000}>
                                {
                                    chapKey ?
                                        'No Wave making Alumini found  matching your search, Try a different keyword'
                                        : 'Watch this space for Impact Stories'
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

export default Impact