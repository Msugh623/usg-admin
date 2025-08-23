import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Navbar from "./components/Nav";
import { BsTriangle } from "react-icons/bs";
import GetStarted from "./pages/GetStarted";
import DashAppBody from "./components/DashAppBody";
import Profiler from "./pages/Profiler";
import UpdateProfile from "./pages/auth/UpdateProfile";
import Main from "./pages/dash/Main";
import AMW from "./pages/alumini/AMW";
import Impact from "./pages/alumini/Impact";
import Chapters from "./pages/alumini/Chapters";
import Spotlight from "./pages/alumini/Spotlight";
import Resources from "./pages/resources/Resources";
import News from "./pages/resources/News";
import Events from "./pages/resources/Events";
import About from "./pages/resources/About";
import Leaders from "./pages/resources/Leaders";
import { ToastContainer } from "react-toastify";
import Expert from "./pages/alumini/Expert";
import Unverified from "./pages/alumini/Unverified";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<GetStarted />} />
          </Route>
          <Route path="/dashboard" element={<DashAppBody />}>
            <Route index element={<Profiler />} />
            <Route path="profile/update" element={<UpdateProfile />} />
            <Route path="main" element={<Main />} />
            <Route path="alumni-making-waves" element={<AMW />} />
            <Route path="impact-stories" element={<Impact />} />
            <Route path="chapters" element={<Chapters />} />
            <Route path="alumini-spotlight" element={<Spotlight />} />
            <Route path="resources" element={<Resources />} />
            <Route path="news" element={<News />} />
            <Route path="events" element={<Events />} />
            <Route path="about" element={<About />} />
            <Route path="leaders" element={<Leaders />} />
            <Route path="expert" element={<Expert />} />
            <Route path="unverified" element={<Unverified />} />

            {/* 404 handler for /dashboard */}
            <Route
              path="/dashboard/:path"
              element={
                <>
                  <div className="p-3">
                    <div className="phaser rounded d-flex my-5 text-center w-100 py-[100px]">
                      {
                        <div className="mx-auto d-flex text-center">
                          {" "}
                          <BsTriangle className="fs-5 mt-1 icon me-2" />{" "}
                          {"404 ENOENT Unable to display page"}
                        </div>
                      }
                    </div>
                  </div>
                </>
              }
            />
          </Route>

          <Route
            path="*"
            element={
              <>
                <Navbar />
                <div className="p-3">
                  <div className="phaser rounded d-flex my-5 text-center w-100 py-[100px]">
                    {
                      <div className="mx-auto d-flex text-center">
                        {" "}
                        <BsTriangle className="fs-5 mt-1 icon me-2" />{" "}
                        {location.pathname.includes("donate")
                          ? "404 ENOENT"
                          : "404 ENOENT"}
                      </div>
                    }
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </Router>
      <ToastContainer position="top-right" />
    </>
  );
};

export default App;
