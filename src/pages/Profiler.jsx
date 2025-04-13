import React, { useEffect } from 'react';
import { useStateContext } from '../state/StateContext';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaFacebook, FaLinkedin, FaSpinner } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa6';
import { requests } from '../../api/routes';

const Profiler = () => {
    const { user, isFetching, setTitle, setIsFetching } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        setTitle('Profile');
    }, []);

    if (isFetching && !user?.fullname) {
        return (
            <div className="text-center text-gray-500 py-[200px]">
                <span className="fs-1 pe-2 d-flex slideUp">
                    {!isFetching ? (
                        navigate('/signin', {
                            replace: true,
                            state: location.pathname,
                        })
                    ) : (
                        <FaSpinner className="mx-auto spinner" />
                    )}
                </span>
            </div>
        );
    }

    return (
        <div className="mx-auto p-6 bg-white border rounded-lg my-3 my-sm-5 w-[80vw] max-w-[900px] shadow-md">
            <div className="text-center mb-5">
                <img
                    src={user?.photo}
                    alt={user?.fullname}
                    className="w-[150px] h-[150px] rounded-full object-cover mx-auto mb-3"
                />
                <button className="btn btn-outline-primary">
                    Upload new photo
                </button>
                <p className="text-gray-500 mt-2">
                    At least 800 x 800 px recommended. JPG or PNG allowed.
                </p>
            </div>

            <div className="border rounded-lg p-4 mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="text-gray-700">Personal Information</h5>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => navigate('profile/update')}
                    >
                        Edit
                    </button>
                </div>
                <p className="mb-2">
                    <strong>Full Name:</strong> {user?.fullname}
                </p>
                <p className="mb-2">
                    <strong>Email:</strong> {user?.email}
                </p>
                <p className="mb-2">
                    <strong>Phone:</strong> {user?.phone || 'N/A'}
                </p>
            </div>

            <div className="border rounded-lg p-4">
                <h5 className="text-gray-700 mb-3">Change Password</h5>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Old Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="********"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="********"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="********"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profiler;
