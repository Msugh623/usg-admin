import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Delay from "../components/Delay";
import { requests } from "../../api/routes";
import { useStateContext } from "../state/StateContext";
import Navbar from "../components/Nav";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaSpinner } from "react-icons/fa";

const GetStarted = () => {
  const { setTitle } = useStateContext();
  const [allow, setAllow] = React.useState(false);
  const navigate = useNavigate();
  const [p, setP] = useState("max");
  useEffect(() => {
    setTitle("Get Started");
    const t = localStorage.logintoken;
    if (t) {
      return navigate("/dashboard");
    }
    setAllow(true);
  }, []);
  return allow ? (
    <div className=" items-center themebg-grad justify-center p-0 px-0 min-h-[100vh]">
      <Navbar />
      <div
        className="flex flex-col md:flex-row mx-auto items-center max-w-4xl w-[95vw] w-full p-8 rounded-2xl"
        style={{
          minHeight: "70vh",
        }}
      >
        {/* Right Section */}
        {p == "mini" ? (
          <Delay delay={100}>
            <GetStartedMini setter={setP} />
          </Delay>
        ) : (
          <Delay delay={100}>
            <LoginWithEmail setter={setP} />
          </Delay>
        )}
        {/* Left Section */}
        <Delay delay={0}>
          <div className="md:w-1/2 mb-5 md:text-left pr-6 slideUp">
            <LazyLoadImage
              src={"/flag.png"}
              effect="opacity"
              alt="Agrosmart Logo"
              about="Agrosmart Logo"
              className=""
              style={{
                position: "fixed",
                top: window.innerWidth > 700 ? "20vh" : "40vh",
                rotate: "-50deg",
                minWidth: "45vw",
                right: "-50px",
                zIndex: 0,
              }}
            />
          </div>
        </Delay>
      </div>
    </div>
  ) : null;
};

export default GetStarted;

function GetStartedMini({ setter }) {
  return (
    <div
      className="sudo w-[80vw] lg:w-2/3  text-lightAf  text-center slideUp"
      style={{
        zIndex: 1,
      }}
    >
      <h2 className="text-xl fs-2 mb-3 font-semibold">Welcome</h2>
      <p className="text-gray-500 text-sm mt-1">Log in to continue</p>

      <button
        className="mt-4 flex items-center themebg justify-center w-full px-4 py-2 border rounded-lg text-gray-700 shadow-sm text-sm font-medium"
        onClick={() => {
          requests.useGoogleAuth();
        }}
      >
        <img
          src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
          alt="Google Logo"
          className="w-5 h-5 mr-2"
        />
        Sign up with Google
      </button>

      <div className="my-4 flex items-center">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-400 text-sm">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <Link
        onClick={() => setter("max")}
        className="flex themebg items-center border bg-none justify-center w-full px-4 py-2 rounded-lg text-gray-700 shadow-sm text-sm font-medium no-dec text-dark"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 12H8m8 4H8m8-8H8m12 4c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
          />
        </svg>
        Sign in with Email
      </Link>

      <p className="mt-4 text-sm text-gray-500">
        Dont have an account?{" "}
        <a
          href="https://usgeaan.onrender.com/signup"
          className="text-blue-600 text-dark no-dec"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}

const LoginWithEmail = ({ setter }) => {
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
  const admins = ["msugh@gmail.com", "osazee.isonarae@gmail.com"];
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!admins.includes(data.email)) {
        throw new Error("Unauthorized email");
      }
      const res = await requests.usrSessionLogin(data);
      localStorage.setItem("logintoken", res.token);
      navigate("/dashboard");
      location.reload();
    } catch (err) {
      alert(
        "ERROR: " +
          (err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message)
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
      navigate("/dashboard");
      location.reload();
    }
  }, []);

  return (
    <div
      className="w-full max-w-md p-8 text-lightAf rounded-lg slideUp"
      style={{ zIndex: 3 }}
    >
      <h2 className="text-center text-xl font-semibold">Sign In</h2>
      <p className="text-center  text-sm mb-6">Enter your details to log in</p>
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
            className="w-full px-4 py-2 text-black themebg  border-gray-300 border bg-none rounded-lg focus:outline-none"
            value={data.email}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInput}
            className="w-full px-4 py-2 text-black themebg border bg-none border-gray-300 rounded-lg focus:outline-none"
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
            className="w-full bg-light text-dark py-3 rounded-lg text-sm font-medium   focus:outline-none"
          >
            Submit
          </button>
        )}
      </form>
      {/* <button className="mt-4 flex items-center justify-center themebg w-full px-4 py-2 border text-lightAf rounded-lg text-gray-700 shadow-sm text-sm font-medium" onClick={() => {
                    requests.useGoogleAuth()
                }}>
                    <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google Logo" className="w-5 h-5 mr-2" />
                    Sign in with Google
                </button> */}
      {/* <p className="text-center text-sm mt-4" onClick={()=>setter('mini')}>
                    Discard session
                </p> */}
    </div>
  );
};
