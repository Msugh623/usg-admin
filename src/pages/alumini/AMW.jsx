import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../state/StateContext'
import Delay from '../../components/Delay'
import { BiSearch, BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { requests } from '../../../api/routes'

const AMW = () => {
    const { amw, setModal,setAmw } = useStateContext()
    
        const [prsAmw, setPrsAmw] = useState([])
        const [chapKey, setChapKey] = useState('')
            const [searchAmw, setSearchAmw] = useState(false)

    useEffect(() => {
        setPrsAmw(amw.filter(a => { 
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
                     {!searchAmw&& <div className="ms-auto slideLeft themebg btn rounded p-2" onClick={()=>setModal(<Adder/>)}>Add New</div>}
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
            {prsAmw.map((amw, index) => (
                <div className={`p-2 py-4 ${index%2==0&&'bg-[#123F5520]'}`} key={'' + amw?.name + amw?.cateogry+index}>
                    <div className="d-flex ">
                        <h4 className='w-[50%] d-flex min-w-[50%] md:w-[35%] md:min-w-[35%]'>
                           <img src={amw?.image} alt="" className='me-2 w-[50px] h-[50px] my-auto rounded' />
                            <span className="my-auto">{amw.name}</span>
                        </h4>
                        <div className="me-auto my-auto">
                            <a className="text-dark no-dec pe-2">{ amw?.cateogry}</a>
                        </div>
                        <div className=" ms-auto my-auto d-flex ps-3">
                            <div className="ms-auto slideLeft btn border border-dark rounded p-2" onClick={() => setModal(<Editor editData={ amw} />)}>Edit</div>
                            <div className="m-1"></div>
                            <div className="ms-auto slideLeft border border-dark rounded p-2 pt-3" onClick={() => {
                                confirm('Do you want to delete this Wave making Alumini?') &&
                                    confirm('This Action Can not be undone') &&
                                    (async () => {
                                    const tst = toast.loading('Deleting...')
                                    try {
                                        await requests.deleteAmw(amw._id)
                                        setAmw((await requests.getAmw()).data);
                                        toast.success('Alumini deleted successfully');
                                    } catch (error) {
                                        toast.error(`ERROR: ${error?.response?.data?.message || error?.message}`)
                                    }finally {
                                        toast.dismiss(tst)
                                    }
                                })()
                        }}><FaTrash className='icon'/></div>
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

function Editor({editData}) {
    const {setModal,setAmw}=useStateContext()
    const [data, setData] = useState({
      ...editData
    })

    function handleChange(e) {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    function handleFile(e) {
        const {  files } = e.target
        setData({
            ...data,
            ['image']: files[0]
        })
    }

   async function onSubmit() {
       const tst = toast.loading('Updating...')
       const fd = new FormData()
       const keys = Object.keys(data)
       try {
           for (let item of keys) {
               if (data[item]) {
                   fd.append(item, data[item])
                }
           };
           const _ = await requests.putAmw(editData?._id,fd);
           setAmw((await requests.getAmw()).data);
           toast.success('Update successful');
           setModal('');
        } catch (error) {
            toast.error(`ERROR: ${error?.response?.data?.message || error?.message}`)
       } finally {
              toast.dismiss(tst)
        }
    }
    return (
        <div className="p-4 bg-white rounded-lg w-[400px] mx-auto">
                <>
                <div className="text-center mb-4">
                {/* <img
                    src={data?.image}
                    alt="Profile"
                    className="w-[100px] h-[100px] rounded-full object-cover mx-auto mb-3"
                /> */}
                
            </div>
            <div className="text-center mb-4">
                <h5 className="text-gray-700">{data?.name} </h5>
            </div>
                    <div className="mb-4">
                    <div className="mb-3">
                            <input type="file" accept='img/*,image/*' onChange={handleFile} className="form-control" placeholder='Category'/>
                        </div>
                        <div className="mb-3">
                            <input type="text" onChange={handleChange} name='cateogry' value={data.cateogry} className="form-control" placeholder='Category'/>
                        </div>
                <textarea
                    className="form-control w-full border rounded p-2"
                    placeholder="Tag"
                            rows="4"
                            onChange={handleChange} name='tag' value={data.tag}
                ></textarea>
            </div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-outline-secondary" onClick={()=>setModal('')}>Cancel</button>
                <button className="btn btn-primary" onClick={onSubmit}>Update</button>
            </div>
                </> 
        </div>
    )
}

function Adder() {
    const {users,setModal,setAmw}=useStateContext()
    const [usersArr, setUsers] = useState([])
    const [key, setKey] = useState('')
    const [data, setData] = useState({
        name: '',
        cateogry: '',
        tag: '',
        image: ""
    })

    function handleChange(e) {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    function handleFile(e) {
        const {  files } = e.target
        setData({
            ...data,
            ['image']: files[0]
        })
    }

   async function onSubmit() {
       const tst = toast.loading('Adding...')
       const fd = new FormData()
       const keys = Object.keys(data)
       try {
           for (let item of keys) {
               if (data[item]) {
                   fd.append(item, data[item])
                }
           };
           const _ = await requests.postAmw(fd);
           setAmw((await requests.getAmw()).data);
           toast.success('Alumini added successfully');
           setModal('');
        } catch (error) {
            toast.error(`ERROR: ${error?.response?.data?.message || error?.message}`)
       } finally {
              toast.dismiss(tst)
        }
    }

    useEffect(() => {
        key ?
            setUsers(users.filter(a => {
            return (a?.fullname || '').toLowerCase().includes(key.toLowerCase())
            }).slice(0, 20))
            : setUsers([])
    }, [key])
    return (
        <div className="p-4 bg-white rounded-lg w-[400px] mx-auto">
            {data?.name?
                <>
                <div className="text-center mb-4">
                {/* <img
                    src={data?.image}
                    alt="Profile"
                    className="w-[100px] h-[100px] rounded-full object-cover mx-auto mb-3"
                /> */}
                
            </div>
            <div className="text-center mb-4">
                <h5 className="text-gray-700">{data?.name} </h5>
            </div>
                    <div className="mb-4">
                    <div className="mb-3">
                            <input type="file" accept='img/*,image/*' onChange={handleFile} className="form-control" placeholder='Category'/>
                        </div>
                        <div className="mb-3">
                            <input type="text" onChange={handleChange} name='cateogry' value={data.cateogry} className="form-control" placeholder='Category'/>
                        </div>
                <textarea
                    className="form-control w-full border rounded p-2"
                    placeholder="Tag"
                            rows="4"
                            onChange={handleChange} name='tag' value={data.tag}
                ></textarea>
            </div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-outline-secondary" onClick={()=>setModal('')}>Cancel</button>
                <button className="btn btn-primary" onClick={onSubmit}>Save</button>
            </div>
                </> : <>
                    <input type="text" autoFocus
                    placeholder='Enter Alumini name to search...'
                        className='form-control w-100' value={key} onChange={({ target }) => setKey(target.value)} />
                    <div className="mt-3 max-h-[400px] overflow-y-auto">
                        {
                            usersArr.map((user, index) => (
                                <div className={`p-2 py-4 ${index%2==0&&'bg-[#123F5520]'}`} key={'' + user?.fullname+index }>
                                    <div className="d-flex ">
                                        <img src={user?.photo} alt="" className='w-[50px] h-[50px] my-auto rounded-full' />
                                        <h4 className='w-[50%] my-auto ps-2 min-w-[50%] md:w-[35%] md:min-w-[35%]'>
                                            {user.fullname}
                                        </h4>
                                        <div className=" ms-auto d-flex ps-3">
                                            <div className="ms-auto my-auto slideLeft btn border border-dark rounded p-2" onClick={() => setData({
                                                image: user?.photo,
                                                name: user?.fullname,
                                            })}>Select</div>
                                            <div className="m-1"></div>
                                        </div>
                                    </div>
                                </div>
                            ))   
                        }
                    </div>
                </>
            }
        </div>
    );
}

