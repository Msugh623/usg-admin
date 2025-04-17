import React, { useEffect, useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import { useStateContext } from "../state/StateContext";
import "./DashAppBody.css"; // Import external CSS for styles

const DashAppBody = () => {
  const navigate = useNavigate();
  const [allow, setAllow] = React.useState(false);
  const [navIsHidden, setNavIsHidden] = React.useState(window.innerWidth < 768);
  const { modal, setModal,user ,setUser} = useStateContext();

  function reAspect() {
    const sb = document.getElementById("sb");
    if (!sb) return;

    if (navIsHidden) {
      sb.classList.add("slideLeftOut");
      setTimeout(() => {
        sb.classList.add("d-none");
        sb.classList.remove("slideLeftOut");
      }, 300);
    } else {
      sb.classList.remove("d-none");
      sb.classList.add("slideRight");
      setTimeout(() => {
        sb.classList.remove("slideRight");
      }, 300);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      reAspect();
    },400)
  }, [navIsHidden]);

  useEffect(() => {
    window.theme = "#123F55";
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        const ovl = document.getElementById("ovl");
        if (ovl) {
          ovl.classList.add('fadeOut')
        }
        setTimeout(() => {
          setModal("")
        },2050)
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setModal]);

  useEffect(() => {
    scroll({ top: 0 });
  }, [location.pathname]);

  useEffect(() => {
    if (modal) {
      const modalElement = document.getElementById("modal");
      if (modalElement) modalElement.focus();
    }
  }, [modal]);

  useLayoutEffect(() => {
    const handleResize = () => {
      setNavIsHidden(window.innerWidth < 768);
    };

    const debouncedResize = debounce(handleResize, 200);
    window.addEventListener("resize", debouncedResize);

    setTimeout(() => {
      handleResize();
    }, 500);

    document.title = "USGEAAN Admin - Dashboard";
    const token = localStorage.logintoken;
    if (!token) {
      return navigate("/");
    }
    setAllow(true);

    return () => window.removeEventListener("resize", debouncedResize);
  }, [navigate]);

  return allow ? (
    <div className="dash-app-body">
      <div className="fixed-top">
        <div className="mobile-nav-toggle mt-4 ms-3 d-lg-none pt-2">
          <button
            className="btn  themetxt bg-light border roundAf shadow-lg"
            onClick={() => setNavIsHidden((prev) => !prev)}
            aria-label="Toggle Navigation"
          >
            <FaBars />
          </button>
        </div>
      </div>
      <div className="d-flex">
        <div
          id="sb"
          onLoad={() => {
            reAspect();
          }}
          className="sidebar"
        >
          <Sidebar />
        </div>
        <div className="content">
          <nav className="navbar bg-light shadow-sm m-0 mb-4">
            <div className="container-fluid">
              <a className="navbar-brand d-flex m-0 themetxt" href="#">
                <img
                  src={user?.photo}
                  alt=""
                  className="logo me-2 w-[45px] h-[45px] roundAf object-cover"
                />
                <div className="my-auto">{user?.fullname}</div>
              </a>
              <div className="themebg p-[1px] rounded">
                <button
                  className="btn themetxt bg-light rounded"
                  onClick={() =>
                    confirm("Ready To Leave?") &&
                    (() => {
                      localStorage.clear();
                      setUser({});
                      navigate("/");
                      location.reload();
                    })()
                  }
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
          <Outlet />
        </div>
      </div>
      {modal && (
        <div
          id="ovl"
          className="modal-overlay fixed-top w-100 h-100 d-flex flex-column p-4"
          onClick={() => setModal("")}
        >
          <div
            className="bg-light shadow-lg m-auto rounded p-3 slideUp no-dec fancy-sc"
            id="modal"
            tabIndex={-1}
            onKeyDown={(e) => e.code === "Escape" && setModal("")}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header d-flex">
              <button
                className="close-btn ms-auto fs-3 shadow rounded bg-light hover:shadow-lg"
                onClick={() => setModal("")}
                aria-label="Close Modal"
              >
                <BiX />
              </button>
            </div>
            <div className="modal-body">{modal}</div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default DashAppBody;

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
