import React, { useEffect, useState } from "react";
import { useStateContext } from "../../state/StateContext";
import { toast } from "react-toastify";
import { requests } from "../../../api/routes";
import { FaSpinner } from "react-icons/fa";

const About = () => {
  const { about, setAbout } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    ...(about || {}),
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function onSubmit() {
    const tst = toast.loading("Updating...");
    setIsLoading(true);
    const fd = new FormData();
    const keys = Object.keys(data);
    try {
      for (let item of keys) {
        if (data[item]) {
          fd.append(item, data[item]);
        }
      }
      const _ = await requests.putAbout(about?._id, fd);
      const res = (await requests.getAbout()).data[0];
      setAbout(res);
      setData(res);
      toast.success("Update successful");
    } catch (error) {
      toast.error(`ERROR: ${error?.response?.data?.message || error?.message}`);
    } finally {
      toast.dismiss(tst);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setData(about);
  }, [about]);

  return (
    <div className="space-y-8 p-6 slideUp">
      <h2 className="text-lg font-semibold d-flex text-gray-800 mb-6 tracking-wide">
        <span className="my-auto">Alumni Spotlight</span>
        
      </h2>
      <div className="ms-auto my-auto">
          {!isLoading &&about?._id?  (
            <button
              className="btn my-auto themebg me-auto"
              onClick={()=>onSubmit()}
            >
              Save
            </button>
          ) : (
            <>
              <div className=" d-flex text-center">
                <FaSpinner className="spinner fs-1 text-gray-500" />
              </div>
            </>
          )}
        </div>
      {/* Section 1: Who we are */}
      <div className="themebg text-white rounded-lg p-6">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <span>Who we are</span>
          <span className="text-sm text-gray-300">✏️</span>
        </h2>
        <textarea
          className="w-full bg-transparent text-white mt-4 text-sm resize-none outline-none"
          rows="5"
          onChange={handleChange}
          value={data?.whoWeAre}
          name="whoWeAre"
        />
      </div>

      {/* Section 2: What we do */}
      <div className="bg-gray-100 shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <span>What we do</span>
          <span className="text-sm text-gray-500">✏️</span>
        </h2>
        <textarea
          className="w-full bg-transparent text-gray-800 mt-4 text-sm resize-none outline-none"
          rows="5"
          onChange={handleChange}
          value={data?.whatWeDo}
          name="whatWeDo"
        />
      </div>

      {/* Section 3: How it started */}
      <div className="themebg text-white rounded-lg p-6">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <span>How it started</span>
          <span className="text-sm text-gray-300">✏️</span>
        </h2>
        <textarea
          className="w-full bg-transparent text-white mt-4 text-sm resize-none outline-none"
          rows="5"
          onChange={handleChange}
          value={data?.howItStarted}
          name="howItStarted"
        />
      </div>

      <div className="bg-gray-100 shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <span>Our Impact</span>
          <span className="text-sm text-gray-500">✏️</span>
        </h2>
        <textarea
          className="w-full bg-transparent text-gray-800 mt-4 text-sm resize-none outline-none"
          rows="5"
          onChange={handleChange}
          value={data?.impact}
          name="impact"
        />
        <div className=" themebg text-light text-center text-sm mt-4 p-4 rounded">
          This initiative paved the way for a seamless transition to an elected
          body that will drive the association's long-term goals.
        </div>
      </div>
    </div>
  );
};

export default About;
