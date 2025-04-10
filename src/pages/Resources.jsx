import { useEffect, useState } from "react";
import Delay from "../components/Delay";
import { useStateContext } from "../state/StateContext";

export default function Resources() {
    const {resources, setTitle}=useStateContext()
    const categories = ["Document", "Guide", "Webinars and Recordings", "Newsletter"];
    const [theCategory, setTheCategory] = useState('Newsletter')

    useEffect(() => {
        setTitle('Contact Us')
    },[])

    return (
        <div className="min-h-screen bg-[#f3f4f6]">
            <div className="relative fade-in bg-cover bg-center h-120 flex items-center justify-center text-white" style={{ backgroundImage: 'url(/resourcesHero.png)', minHeight: '60vh' }}>
                <div className="absolute inset-0" style={{ background: "radial-gradient(36.82% 36.82% at 50% 31.71%, rgba(128, 45, 39, 0.6) 0%, rgba(138, 157, 142, 0.054) 100%)" }}></div>
                <div className="absolute inset-0 bg-[#0e0e0e40]"></div>
                <Delay delay={0}>
                    <div className="slideUp relative text-center container">
                        <h1 className="text-4xl font-bold">Resources</h1>
                        <p className="mt-2 text-lg">Access documents, webinars, newsletters and other resources to stay informed and engaged</p>
                    </div>
                </Delay>
            </div>
            <Delay delay={150}>
                <div className="max-w-5xl slideUp mx-auto py-12 px-6">
                    <h2 className="text-center text-xl font-semibold mb-6">Select a resource category</h2>
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
{/* {theCategory.toLowerCase()} */}
{/* {resources.length} */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {resources.map((resource, index) => (
                            theCategory.toLowerCase() == resource?.type?.toLowerCase() ? <Delay delay={30 * index}>
                                <div key={index} className={`bg-white p-6 rounded-lg shadow-md border border-gray-200 d-flex items-center slideUp`}>
                                    <img src={resource?.imageUrl} alt={resource?.name} className="w-12 h-12 rounded-full" />
                                    {/* {resource?.imageUrl} */}
                                    <div className="ps-2 w-100">
                                        <h3 className="text-lg font-bold text-[#1f2937]">{resource?.name}</h3>
                                        <p className="text-gray-600 mt-1">{resource?.type}</p>
                                        <div className="mt-2 d-flex ">
                                            <a href={resource?.resourceUrl} className="text-sm no-dec text-blue-600 flex items-center">
                                                <span className="mr-1">📖</span> Read</a>
                                            <a href={resource?.resourceUrl} className="text-sm no-dec ms-auto text-blue-600 flex items-center"><span className="mr-1">📥</span> Download</a>
                                        </div>
                                    </div>
                                </div>
                            </Delay>:<div className="phaser p-[70px] text-center">
                               No found resource for the selected category
                        </div>
                        ))}
                    </div>
                    {
                        !resources.length && <>
                            <div className="phaser p-[70px] text-center">
                                Watch this space for our life changing resources
                        </div>
                        </>
                    }
                </div>
            </Delay>
        </div>
    );
}
