import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../state/StateContext'
import Delay from '../../components/Delay'
import { BiSearch, BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'

const News = () => {
    const { news, setModal,isFetching } = useStateContext()
    
        const [prsNews, setPrsNews] = useState([])
        const [key, setKey] = useState('')
            const [search, setSearch] = useState(false)
        
    useEffect(() => {
        setPrsNews(news.filter(a => { 
                  return ( (a?.title || '').toLowerCase().includes(key.toLowerCase()) )
    }))
        }, [key, news])
  return (
      <div className="max-w-100 row pt-4" id='alumini-making-waves'>
          <h2 className='px-4'>News</h2>
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
                            Title
                        </div>
                        <div className="me-auto">
                          </div>
                          <div className="ms-auto">
                            <a className="text-dark no-dec text-muted pe-2">Action</a>
                        </div>
                    </div>
                </div>
            <div className="chap">
            {prsNews.map((chapter, index) => (
                <div className={`p-2 py-4 ${index%2==0&&'bg-[#123F5520]'}`} key={'' + chapter?.name + chapter?.whatsappLink+index}>
                    <div className="d-flex ">
                        <h4 className='w-[60%] min-w-[60%] md:w-[80%] md:min-w-[80%]'>
                            {chapter.title.slice(0, 70)}...
                        </h4>
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
                !prsNews.length ?
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

export default News