import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { requests } from "../../../api/routes";
import { FaSpinner } from "react-icons/fa";

const LoginWithEmail = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleInput({ target }) {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await requests.usrSessionLogin(data);
      if (!res.user?.isAdmin) {
        throw new Error("You are not authorized to access this admin portal.");
      }
      localStorage.setItem("logintoken", res.token);
      navigate("/profile");
      location.reload();
    } catch (err) {
      alert(
        "ERROR: " +
          (err.response?.data?.message ||
            err.response?.data?.error ||
            err.message)
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    document.title = "USGEAAN - Login";
    const t = ((location.href.split("?")[1] || "").split("=")[1] || "").split(
      "&"
    )[0];
    if (t) {
      localStorage.setItem("logintoken", t);
      navigate("/profile");
      location.reload();
    }
  }, []);

  return (
    <div className="flex items-center justify-center py-5  px-6">
      <div className="w-full max-w-md p-8  text-black rounded-lg slideUp shadow-lg">
        <h2 className="text-center text-xl font-semibold">Sign In</h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Enter your details to log in
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInput}
              className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
              value={data.email}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInput}
              className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Enter your password"
              value={data.password}
            />
          </div>
          {isLoading ? (
            <div className="d-flex fs-5">
              <FaSpinner className="spinner my-auto" />
              <div className="ps-2"> Please wait</div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full bg-[#123F55] text-white py-3 rounded-lg text-sm font-medium   focus:outline-none"
            >
              Submit
            </button>
          )}
        </form>
        <button
          className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-gray-100 rounded-lg text-gray-700 shadow-sm text-sm font-medium hover:bg-gray-200"
          onClick={() => {
            requests.useGoogleAuth();
          }}
        >
          <img
            src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
            alt="Google Logo"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Do not have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginWithEmail;
