import {  useNavigate } from "react-router-dom";
import Delay from "../components/Delay";
import { useStateContext } from "../state/StateContext";
import { useEffect } from "react";

export default function GetInvolved() {
    const { setTitle,subCommitees } = useStateContext()
    const navigate=useNavigate()
    
    useEffect(() => {
        setTitle('Get Involved')
    }, [])


    const committees = subCommitees


    return (
        <div className="min-h-screen bg-[#EEFEFF91]" style={{
            overflowX:'hidden'
        }}>
            <div className="relative fade-in bg-cover bg-center py-5  p-0 flex items-center justify-center text-white" style={{ backgroundImage: 'url(/getInvolvedHero.png)' }}>
                <div className="absolute inset-3 w-100 m-0 bg-opacity-50" style={{
                    overflow: 'hidd'
                }} >
                    <div className="h-[107%] w-[101%]" style={{
                        position: 'relative',
                        top: '-13px',
                        left: '-13px',
                        background: "radial-gradient(90.42% 90.42% at 52.15% 117.99%, rgba(18, 63, 85, 0.0475799) 0%, rgba(18, 63, 85, 0) 0%, rgba(18, 63, 85, 0.9) 100%)" /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
                    }}></div>
                </div>
                <div className="relative text-center">
                    <h1 className="text-4xl slideUp font-bold">Get Involved</h1>
                    <Delay delay={100}>
                        <p className="mt-2 mb-5 text-lg slideUp container">Support, engage, and contribute to the USGEAAN community in meaningful ways</p>
                    </Delay>
                    <div className="mt-4 flex space-x-4 justify-center">
                        <Delay delay={200}>
                            <a href="#join" className="px-6 slideUp no-dec d-flex py-2 bg-[#efefef50] mx-3 p-0 text-center bg-opacity-50 text-white rounded-full" style={{
                                borderRadius: '50%',
                                height: '100px',
                                width: '100px'
                            }}> <div className="m-auto">Volunteer</div>
                            </a>
                        </Delay>

                        <Delay delay={200}>
                            <a href="/get-started" className="px-6 no-dec slideUp py-2 d-none d-md-flex bg-[#efefef50] my-auto py-2 mx-3 bg-opacity-50 text-white">Become a mentor</a>

                        </Delay>

                        <Delay delay={200}>
                            <a href="#join" className="px-6 no-dec d-none slideUp d-md-flex py-2 bg-[#efefef50] my-auto py-2 mx-3 bg-opacity-50 text-white">Join a Committee</a>
                        </Delay>

                        <Delay delay={200}>
                            <a href="/donate" className="px-6 no-dec d-flex slideUp py-2 bg-[#efefef50] mx-3 p-0 text-center bg-opacity-50 text-white rounded-full" style={{
                                borderRadius: '50%',
                                height: '100px',
                                width: '100px'
                            }}> <div className="m-auto">Donate</div> </a>
                        </Delay>
                    </div>
                    <div className="mt-4 flex space-x-4 justify-center d-md-none">
                        <a href="/get-started" className="px-6 no-dec py-2 bg-[#efefef50] my-auto py-2 mx-3 bg-opacity-50 text-white rounded-full">Become a mentor</a>

                        <a href="#join" className="px-6 no-dec py-2 bg-[#efefef50] my-auto py-2 mx-3 bg-opacity-50 text-white rounded-full">Join a Committee</a>
                    </div>
                </div>
            </div>

            <Delay delay={300}>
            <div className="max-w-4xl mx-auto py-12 slideUp px-6">
                <h2 id="join" className="text-center text-2xl font-semibold mb-6 mt-5">Sub-Committees</h2>
                <p className="text-center text-gray-600 mb-8">Be an active part of the USGEAAN community by joining one of our dynamic subcommittees! Whether you are passionate about global engagement, innovation, program planning, finance, monitoring & evaluation, or digital media, there’s a place for you to contribute, connect, and make an impact. Click on the group links below to join and collaborate with fellow alumni in driving meaningful change.</p>

                <div className="space-y-6 mt-5">
                    {committees.map((committee, index) => (
                        <div key={index} className="bg-inherit p-6 border rounded-lg d-flex flex-column flex-sm-row justify-between sm:items-center">
                            <div className="col-sm-10">
                                <h4 className="text-lg font-bold text-[#1f2937]">{committee.name}</h4>
                                <p className="text-gray-600 mt-1">{committee.description}</p>
                            </div>

                        <a href={''+committee.whatsappLink} className="themebg d-flex text-center no-dec text-white px-6 py-2 w-75 hover:bg-[#0c2f4a]" style={{
                                borderRadius: '50px',
                                maxWidth: window.innerWidth > 800 ? '100' : '200px',
                                maxHeight: '50px'
                            }}>
                                <div className="m-auto">Join</div>
                            </a>
                        </div>
                    ))}
                        {
                            !committees?.length ? <>
                            <div className="phaser p-20"></div>
                            </>:<></>
                        }
                </div>
            </div>
            </Delay>
        </div>
    )
}
