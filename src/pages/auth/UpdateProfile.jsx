import { useEffect, useState } from "react";
import { requests } from "../../../api/routes";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../state/StateContext";

export default function UpdateProfile() {
    const navigate = useNavigate()
    const { user,fetchData,setTitle } = useStateContext()
    const [data, setData] = useState({
        "email": "",
        "industry": "",
        "state": "",
        ...user,
        industry:( user.industry||[]).toString(),
        programme: (user.programme || []).toString(),
        photo:''
    })

    const [isLoading, setIsLoading] = useState(false)

    function handleInput({ target }) {
        setData(prev => ({
            ...prev,
            [target.name]: target.value
        }))
    }

   
    function handleFile({ target }) {
        setData(prev => ({
            ...prev,
            ['photo']: target.files[0]
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setIsLoading(true)
            const prs = {
                email: data.email,
                password: data.password,
                fullname: data.fullname,
                industry: [data.industry],
                programme: [data.programme],
                state: data.state,
                photo: data.photo,
                facebook: data.facebook,
                linkedin: data.linkedin,
                showEmail: data.showEmail
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
            alert('Update Succesful')
            navigate('/profile')
            fetchData()
            setTimeout(() => {
                state.reload()
            }, 300);
        } catch (err) {
            alert('ERROR: ' + (err.response.data.message || err.response.data.error || err.message))
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
      setTitle('Update Profile')
    }, [])
    

    return (
        <div className="flex items-center py-5 justify-center min-h-screen bg-white px-6">
            <div className="w-full max-w-md p-8  text-black rounded-lg slideUp shadow-lg">
                <h2 className="text-center text-xl font-semibold">Update Profile</h2>
                <p className="text-center text-gray-600 text-sm mb-6">Edit the information below to update your profile</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="first-name">Full Name</label>
                        <input
                            type="text"
                            id="first-name"
                            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
                            name="fullname"
                            onChange={handleInput}
                            value={data?.fullname}
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
                            name="email"
                            onChange={handleInput}
                            value={data.email}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="industry">Industry</label>
                        <input
                            type="text"
                            id="industry"
                            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
                            name="industry"
                            onChange={handleInput}
                            value={data.industry}
                            placeholder="Enter your industries"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="programme">Programme</label>
                        <input
                            type="text"
                            id="programme"
                            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
                            name="programme"
                            onChange={handleInput}
                            value={data.programme}
                            placeholder="Enter your Programmes"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="state">State</label>
                        <input
                            type="text"
                            id="state"
                            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
                            name="state"
                            onChange={handleInput}
                            value={data.state}
                            placeholder="Enter your state"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="state">Facbook</label>
                        <input
                            type="url"
                            id="facebook"
                            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
                            name="facebook"
                            onChange={handleInput}
                            value={data.facebook}
                            placeholder="Facebook Profile URL"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="state">Linkedin</label>
                        <input
                            type="url"
                            id="linkedin"
                            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
                            name="linkedin"
                            onChange={handleInput}
                            value={data.linkedin}
                            placeholder="Linkedin Profile URL"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="state">Profile</label>
                        <input
                            type="File"
                            id="state"
                            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
                            name="state"
                            onChange={handleFile}
                            accept="image/*,img/*"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium d-flex mb-1" htmlFor="phone"><input
                            type="checkbox"
                            id="showEmail"
                            name="showEmail"
                            onChange={({target})=>{
                                setData(prev => ({
                                    ...prev,
                                    [target.name]: target.checked
                                }))
                            }}
                            checked={data.showEmail}
                            className="me-2 border border-gray-300 rounded-lg focus:outline-none"
                        /> Show Email </label>
                    </div>
                    {/* <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
                            name="password"
                            minLength={6}
                            onChange={handleInput}
                            value={data.password}
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1" htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
                            pattern={data.password}
                            placeholder="Re-enter your password"
                        />
                    </div> */}
                    {isLoading ?
                        <div className='d-flex fs-5'><FaSpinner className='spinner my-auto' /><div className="ps-2"> Please wait</div></div>
                        : <button
                            type="submit"
                            className="w-full bg-[#123F55] text-white py-3 rounded-lg text-sm font-medium   focus:outline-none"
                        >
                            Submit
                        </button>
                    }
                </form>
            </div>
        </div>
    );
}
