import React, { useEffect } from 'react'
import { useStateContext } from '../state/StateContext';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaFacebook, FaLinkedin, FaPhone, FaSpinner } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa6';
import { requests } from '../../api/routes';

const Profiler = () => {
    // const user = users.find((user) => user?._id == id);
    const { user, isFetching,setTitle,setIsFetching } = useStateContext()
    const navigate = useNavigate()
    
    useEffect(() => {
        setTitle('Profile')
    }, [])

    if (isFetching&&!user?.fullname) {
        return <div className="text-center text-gray-500 py-[200px]">
            <div>
                {/* {JSON.stringify(users)} */}
            </div>
            <span className="fs-1 pe-2 d-flex slideUp">
                {!isFetching ?
                    navigate('/signin', {
                        replace: true,
                        state: location.pathname
                    })                                  
                    : <><FaSpinner className="mx-auto spinner" /></>}
            </span>
        </div>;
    }

    return (
        <div className="mx-auto p-6 slideUp bg-white slideUp border rounded-lg my-3 my-sm-5 min-w-[50vw] w-[fit-content] px-md-5 shadow-md">
            <button className="text-gray-600 fs-5 rounded-full border p-3 hover:shadow-lg transition text-xl mb-4" onClick={() => navigate('profile/update')}>
                <FaPen /> {/* Replace with an actual back navigation function if needed */}
            </button>
            <div className="row items-center py-5">
                <div className="col-md-5 d-flex">
                    <img
                        src={user?.photo}
                        alt={user?.fullname}
                        className="w-[180px] mx-auto h-[180px] mt-0 ms-md-auto me-md-5 rounded-full object-cover mb-4" />
                </div>
                <div className="col-md-7">
                    <p className="text-gray-700 py-2 border-bottom pb-3">
                        <strong className="pe-3">Name:</strong> {user?.fullname}
                    </p>
                    <p className="text-gray-700 py-2 border-bottom pb-3">
                        <strong className="pe-3">State:</strong> {user?.state}
                    </p>
                    <p className="text-gray-700 py-2 border-bottom pb-3">
                        <strong className="pe-3">Programme Affiliation:</strong> {user?.programme || ''}
                    </p>
                    <p className="text-gray-700 py-2 border-bottom pb-3">
                        <strong className="pe-3">Industry:</strong> {user?.industry}
                    </p>
                    <div className="mt-4 d-flex py-2 border-bottom pb-3 ">
                        <strong className="me-2">Connect:</strong>
                        <div className="flex gap-3 mt-2 text-gray-600 icon">
                            {user?.email&&<a href={`mailto:${user?.email}`} className="text-dark">
                                <FaEnvelope className="cursor-pointer hover:text-blue-500" />
                            </a>}
                            {user?.facebook&&<a href={user?.faceebook} className="text-dark">
                                <FaFacebook className="cursor-pointer hover:text-blue-500" />
                            </a>}
                            {user?.linkedin&&<a href={user?.linkedin} className="text-dark">
                                <FaLinkedin className="cursor-pointer hover:text-blue-500" />
                            </a>}
                        </div>
                    </div>
                    <button className="btn mt-3 bg-danger text-light" onClick={() => confirm('Ready to leave?') && (() => {
                        setIsFetching(true)
                        requests.usrLogout()
                    })()}>
                       {!isFetching?'Logout':<FaSpinner className="spinner" />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profiler
