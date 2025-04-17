import React, { useEffect, useState } from 'react';
import { useStateContext } from '../state/StateContext';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { requests } from '../../api/routes';

const Profiler = () => {
    const { user, isFetching, setTitle,setUser } = useStateContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({
        "email": "",
        "industry": "",
        "state": "",
        ...user,
        industry:( user.industry||[]).toString(),
        programme: (user.programme || []).toString(),
        photo:''
    })

    function handleInput({ target }) {
        setData(prev => ({
            ...prev,
            [target.name]: target.value
        }))
    }

    async function handleSubmit(e) {
            e.preventDefault()
            try {
                setIsLoading(true)
                const prs = {
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword,
                }
                const fd = new FormData()
                const keys=Object.keys(prs)
                keys.forEach(key => {
                    if (prs[key]) {
                        fd.append(key, prs[key])
                    }
                })
                const _ = await requests.usrUpdate(prs?.photo ? fd : (() => {
                    delete prs.photo
                    return prs
                })())
                toast.success('Update Succesful')
                const res = await requests.getAuthState()
                setUser(res.user)
                setTimeout(() => {
                    state.reload()
                }, 300);
            } catch (err) {
                toast.error('ERROR: ' + (err.response.data.message || err.response.data.error || err.message))
            } finally {
                setIsLoading(false)
            }
        }

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
        <div className="mx-auto slideUp p-6 bg-white border rounded-lg my-3 my-sm-5 w-[80vw] max-w-[900px] shadow-md">
            <div className="text-center mb-5">
                <img
                    src={user?.photo}
                    alt={user?.fullname}
                    className="w-[150px] h-[150px] rounded-full object-cover mx-auto mb-3"
                />
                <button className="btn btn-outline-primary" onClick={() => {
                    navigate('profile/update')
                    setTimeout(() => {
                        const filer = document.getElementById('filer')
                        filer.focus()
                        filer.click()
                        filer.addEventListener('change',()=>document.getElementById('submit').click())
                    },400)
                }}>
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
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Old Password</label>
                        <input
                            type="password"
                            name='oldPassword'
                            onChange={handleInput}
                            value={data.oldPassword}
                            className="form-control"
                            placeholder="********"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            name='newPasswordAf'
                            value={data?.newPasswordAf}
                            onChange={handleInput}
                            className="form-control"
                            placeholder="********"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm New Password</label>
                        <input
                            type="password"

                            name='newPassword'
                            value={data?.newPassword}
                            onChange={handleInput}
                            pattern={data?.newPasswordAf}
                            className="form-control"
                            placeholder="********"
                        />
                    </div>
                    {isLoading ?
                        <div className='d-flex fs-5'><FaSpinner className='spinner my-auto' /><div className="ps-2"> Please wait</div></div>
                        :
                        <button type="submit" className="btn btn-primary">
                            Save Changes
                        </button>
                    }
                </form>
            </div>
        </div>
    );
};

export default Profiler;
