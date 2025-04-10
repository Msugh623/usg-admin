import { useEffect, useState } from "react";
import { requests } from "../../api/routes";
import { FaClock, FaPhone, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import Delay from "../components/Delay";
import { useStateContext } from "../state/StateContext";

const Contact = () => {
  const {setTitle}=useStateContext()
  const [isLoading, setIsLoading] = useState(false)
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
      setTitle('Contact Us')
  },[])

  return (
    <>
      {/* Header Section */}
      <header className="bg-gray-200 text-center mb-12 py-12 m-0" /*</>style={{backgroundColor:'#FEF8F3'}}*/>
        <h1 className="text-2xl slideUp mt-5 pt-2 fw-bold">
          Contact Us
        </h1>
        <Delay delay={100}>
          <p className="mb-4 slideUp slideUp mt-2">
            Here to help you connect, grow, and succeed
          </p>
        </Delay>
      </header>

      {/* Main Section */}
      <div className="container pt-5">
        <div className="row ">
          {/* Left Section - Form */}
          <Delay delay={200}>
            <div className="col-md-6 slideUp px-md-4 pe-md-5">
              <h4 className="text-2xl fw-bold mb-3 lg:text-3xl font-bold mb-6">
                Let’s Get in Touch!
              </h4>
              {!glitch ? <form className="" onSubmit={(e) => {
                e.preventDefault();
                (async () => {
                  try {
                    setIsLoading(true)
                    const _ = await requests.send({
                      email: document.getElementById('email').value,
                      name: document.getElementById('name').value,
                      message: document.getElementById('message').value
                    })
                    alert("We have recieved your message, and we'll try our best to  get back to you as soon as possible.")
                    confirm("Subscribe to our newsletter?") && window.getStarted()
                    setModal('')
                    setGlitch('jfkfdj')
                    setTimeout(() => setGlitch(false), 300)
                  } catch (err) {
                    setModal('')
                    alert('ERROR: ' + err.message)
                  } finally {
                    setIsLoading(false)
                  }
                })()
              }}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    placeholder="Your name *"
                    required
                    id="name"
                    className="w-full p-3 border form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    required
                    id="email"
                    placeholder="Your email address *"
                    className="w-full p-3 border form-control"
                  />
                </div>
                <div className="form-group mb-3" >
                  <textarea
                    required
                    id="message"
                    placeholder="Your message"
                    rows="5"
                    className="w-full p-3 border form-control"
                  />
                </div>
                {!isLoading ?
                  <button
                    type="submit"
                    className="themebg slideUp text-white w-full px-5 rounded fw-bold border-0 lg:w-auto px-6 py-3 rounded-lg hover:bg-green-700 transition"
                    style={{
                      background: '#03AD19'
                    }}
                  >
                    Send message
                  </button>
                  : <div className='d-flex slideUp'><FaSpinner className='spinner fs-3' /> <div className="me-2"></div> Please Wait while we process your message</div>
                }
              </form>
                : ''}
            </div>
          </Delay>

          {/* Right Section - Address and Map */}
          <Delay delay={300}>
          <div className="col-md-6 slideUp mt-5 mt-md-0">
            <div className="flex items-center text-gray-600 mb-2">
              <span className="mr-2 text-green-500 pe-1 ">
                <FaPhone/>
              </span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <span className="mr-2 text-orange-500 pe-1 ">
                <FaClock/>
              </span>
              Mon - Friday: 9am–5pm; Sat & Sun: ⦰
            </div>
            <iframe
              title="Map"
              className="w-full h-64 rounded-lg border w-100 h-75"
              style={{
                minHeight: '300px'
              }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31691.140330987486!2d7.398574476647924!3d9.066710757564585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104dd8940231f3a9%3A0x89f75a7e6a4bb853!2sAbuja!5e0!3m2!1sen!2sng!4v1698560165145!5m2!1sen!2sng"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          </Delay>
        </div>
      </div>

      {/* CTA Section */}
      <section className="px-6 lg:px-36 py-10 container mt-5">
        <div className="themebg text-light d-flex p-5" style={{ backgroundColor: '#03AD19' }}>
          <h4 className="fw-bold lg:text-left text-lg lg:text-2xl font-semibold text-light my-auto lg:mb-0">
            Do you wish to join the community?
          </h4>
          <Link to={'/get-started'} className={`bg-light no-dec ms-auto border-0 px-3 py-2 fw-bold rounded themetxt font-semibold py-2 px-6 hover:bg-gray-100 transition hover:text-[${window.theme}]`} style={{}} onClick={() => window.getStarted()}>
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
};

export default Contact;
