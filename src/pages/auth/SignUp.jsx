import { useState } from "react";
import { requests } from "../../../api/routes";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        "email": "",
        "password": "",
        "firstname": "",
        "lastname": "",
        "industry": "",
        "state": "",
        programme: ''
    })

    const [isLoading, setIsLoading] = useState(false)

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
                email: data.email,
                password: data.password,
                fullname: data.firstname + ' ' + data.lastname,
                industry: [data.industry],
                state: data.state,
                programme:[ data.programme]
            }
            const res = await requests.usrSignup(prs)
            alert('Registeration Successful. Use your email and password to login')
            navigate('/signin')
        } catch (err) {
            alert('ERROR: ' + (err.response.data.message || err.response.data.error || err.message))
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className="flex items-center py-5 justify-center min-h-screen bg-white px-6">
            <div className="w-full max-w-md p-8  text-black rounded-lg slideUp shadow-lg">
                <h2 className="text-center text-xl font-semibold">Sign Up</h2>
                <p className="text-center text-gray-600 text-sm mb-6">Fill in the details below to create an account</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="first-name">First Name</label>
                        <input
                            type="text"
                            id="first-name"
                            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
                            name="firstname"
                            onChange={handleInput}
                            value={data.firstname}
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="last-name">Last Name</label>
                        <input
                            type="text"
                            id="last-name"
                            name="lastname"
                            onChange={handleInput}
                            value={data.lastname}
                            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
                            placeholder="Enter your last name"
                            required
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
                            required
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
                            placeholder="Enter your location"
                            required
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
                            placeholder="Enter your industry"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="phone">Programme</label>
                        <input
                            type="text"
                            id="programme"
                            name="programme"
                            onChange={handleInput}
                            value={data.programme}
                            className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
                            placeholder="Enter your Programme"
                        />
                    </div>
                    <div className="mb-4">
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
                            required
                            pattern={data.password}
                            placeholder="Re-enter your password"
                        />
                    </div>
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
