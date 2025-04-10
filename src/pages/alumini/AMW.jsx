import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../state/StateContext'
import Delay from '../../components/Delay'
import { BiSearch, BiX } from 'react-icons/bi'

const AMW = () => {
    const { amw, setModal } = useStateContext()
    
        const [prsAmw, setAmw] = useState([])
        const [chapKey, setChapKey] = useState('')
            const [searchAmw, setSearchAmw] = useState(false)
        
    useEffect(() => {
        setAmw(amw.filter(a => { 
                  return ( (a?.name || '').toLowerCase().includes(chapKey.toLowerCase()) ||
            (a?.cateogry || '').toLowerCase().includes(chapKey.toLowerCase()))
    }))
        }, [chapKey, amw])
  return (
      <div className="col-md-12 container row pt-4" id='alumini-making-waves'>
          <h2 className='px-4'>Alumini Making Waves</h2>
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
                            Name
                        </div>
                        <div className="me-auto">
                            <a className="text-dark no-dec text-muted pe-2">Category</a>
                          </div>
                          <div className="ms-auto">
                            <a className="text-dark no-dec text-muted pe-2">Action</a>
                        </div>
                    </div>
                </div>
            <div className="chap">
            {prsAmw.map((chapter, index) => (
                <div className={`p-2 py-4 ${index%2==0&&'bg-[#123F5520]'}`} key={'' + chapter?.name + chapter?.category}>
                    <div className="d-flex ">
                        <h4 className='w-[50%] min-w-[50%] md:w-[35%] md:min-w-[35%]'>
                            {chapter.name}
                        </h4>
                        <div className="me-auto">
                            <a className="text-dark no-dec pe-2">{ chapter?.cateogry}</a>
                        </div>
                        <div className=" ms-auto ps-3">
                        <div className="ms-auto slideLeft themebg rounded p-2">Edit</div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            {
                !prsAmw.length ?
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

export default AMW