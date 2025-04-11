import React, { useState } from 'react';
import { useStateContext } from '../../state/StateContext';
import Delay from '../../components/Delay';

const Resources = () => {
    const { resources,isFetching } = useStateContext()
        const categories = ["Document", "Guide", "Webinars and Recordings", "Newsletter"];
    const [theCategory, setTheCategory] = useState('Newsletter')
    
  return (
    <div className="p-6 overflow-x-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Resources</h1>
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add New
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
      <div className="d-flex mb-8 " style={{
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
            className="border slideUp rounded-lg p-4 flex flex-col items-center justify-center text-center"
          >
                <div className="w-16 h-16 bg-red-200 rounded mb-2">
                    <img src={resource?.imageUrl} alt={resource?.name} className="w-full h-full object-cover rounded" />
            </div>
                <p className="text-sm font-medium">{ resource?.name}</p>
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