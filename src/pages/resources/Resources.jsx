import React, { useState } from 'react';
import { useStateContext } from '../../state/StateContext';
import Delay from '../../components/Delay';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { requests } from '../../../api/routes';

const Resources = () => {
    const { resources,isFetching,setResources ,setModal} = useStateContext()
        const categories = ["Document", "Guide", "Webinar", "Newsletter"];
    const [theCategory, setTheCategory] = useState('Newsletter')
    
  function rmResource(id, name) {
    if (!confirm('Do you want to delete this ')) {
      return
    }
    if (!confirm('Press Okay to delete'+'"' + name+'" Resource?')) {
      return
    }
    const tst = toast.loading('Deleting...')
    try {
      const _ = requests.deleteResource(id);
      setResources((prev) => prev.filter((item) => item._id !== id));
      toast.success('Resource deleted successfully');
    } catch (error) {
      toast.error(`ERROR: ${error?.response?.data?.message || error?.message}`)
    } finally {
      toast.dismiss(tst)
    }
  }
  
  return (
    <div className="p-6 overflow-x-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Resources</h1>
        <div className="flex space-x-2">
          <button className="themebg text-white px-4 py-2 rounded hover:bg-blue-600" onClick={()=>setModal(<Adder/>)}>
            Add New
          </button>
        </div>
      </div>
      <div className="d-flex mb-8" style={{
                        overflow: 'auto',
                        maxWidth: '100vw'
                    }}>
                        <div className="mx-auto d-flex flex-row">
                        {categories.map((category, index) => (
                            <button key={index} className={`d-block transition small px-6 py-2 border border-gray-300 text-gray-700 ${category.toLowerCase() == theCategory.toLowerCase() ? 'bg-[#0f3d5f] text-white' : 'bg-white hover:bg-gray-200'} min-w-[${category.length*50}px]`} onClick={() => {
                                setTheCategory(category.toLowerCase())
                            }}>{category}</button>
                        ))}
                       </div>
                    </div>
      {/* Grid of items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {resources.map((resource, index) => (theCategory.toLowerCase() == resource?.type?.toLowerCase() ?
                <Delay delay={10 * index}>
                  
          <div
            key={index}
            className="border slideUp rounded-lg flex p flex-col items-center justify-center text-center"
                  >
                    <button className="bg-red-700 m-2 ph-r text-white px-1 ms-auto py-2 rounded hover:bg-red-600"
                   onClick={()=>rmResource(resource?._id,resource?.name)}
                      style={{
          }}>
            <FaTrash/>
          </button>
                <div className="w-16 h-16 bg-red-200 rounded mb-2">
                    <Delay delay={300}>
                      <img src={resource?.imageUrl} alt={resource?.name} className="w-full h-full object-cover rounded" />
                    </Delay>
            </div>
                    <p className="text-sm font-medium px-2">{resource?.name}</p>
                    
                    
                      </div>
                  </Delay> : null
        ))}
      </div>
          {!resources?.length ?
              <div className="phaser p-5">
                  {!isFetching&&'Watch this space for resources '}
</div>
              :''
}
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300">
          Previous
        </button>
        <div className="flex space-x-2 overflow-x-auto">
          {/* {Array.from({ length: 10 }).map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${
                index === 9
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))} */}
        </div>
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300">
          Next
        </button>
      </div>
    </div>
  );
};

export default Resources;


function Adder() {
    const {setModal,setResources}=useStateContext()
    const [data, setData] = useState({
        name: '',
        type: '',
      imageFile: "",
        pdfFile: ""
    })

    function handleChange(e) {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    function handleFile(e) {
        const {  files,name } = e.target
        setData({
            ...data,
            [name]: files[0]
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
           const _ = await requests.postResource(fd);
           setResources((await requests.getResources()).data);
           toast.success('Resource Added Succesfully');
           setModal('');
        } catch (error) {
            toast.error(`ERROR: ${error?.response?.data?.message || error?.message}`)
       } finally {
              toast.dismiss(tst)
        }
    }

    return (
        <div className="p-4 bg-white rounded-lg w-[400px] mx-auto">
            <h4>Add Resource</h4>
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
                <input type="text" onChange={handleChange} name='name' value={data.name} className="form-control" placeholder='Name'/>
            </div>
            <div className="mb-3">
              <select type="text" onChange={handleChange} name='type' value={data.type} className="form-control" placeholder='Name'>
              <option className='d-none'>Category</option>
                <option value="document">Document</option>
                <option value="guide">Guide</option>
                <option value="webinar">Webinar</option>
                <option value="newsletter">NewsLetter</option>
              </select>
            </div>
            <div className="mb-3">
              <div>Thumbnail Image</div>
                <input type="file" accept='img/*,image/*' name='imageFile' onChange={handleFile} className="form-control" placeholder='Title'/>
            </div>
            <div className="mb-3">
              <div>Document</div>
                <input type="file" accept='application/pdf' name='pdfFile' onChange={handleFile} className="form-control" placeholder='Title'/>
            </div>
            </div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-outline-secondary" onClick={()=>setModal('')}>Cancel</button>
                <button className="btn btn-primary" onClick={onSubmit}>Save</button>
            </div>
                </> 
        </div>
    );
}

