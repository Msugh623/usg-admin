import { FaPen, FaSpinner } from "react-icons/fa";
import { useStateContext } from "../../state/StateContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { requests } from "../../../api/routes";

export default function Spotlight() {
  const { ams, setAms } = useStateContext();
  const [data, setData] = useState(ams);

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleImageChange(e) {
    const { files } = e.target;
    const file = files[0];

    const fd = new FormData();

   
    fd.append("image", file);

    
    Object.keys(data).forEach((key) => {
      if (data[key] && key !== "image") {
        fd.append(key, data[key]);
      }
    });

    
    submitFormData(fd);
  }

  
  async function submitFormData(formData) {
    const tst = toast.loading("Updating...");
    try {
      const _ = await requests.putSpotlight(ams?._id, formData);
      const res = (await requests.getAms()).data[0];
      setAms(res);
      setData(res);
      toast.success("Update successful");
    } catch (error) {
      toast.error(`ERROR: ${error?.response?.data?.message || error?.message}`);
    } finally {
      toast.dismiss(tst);
    }
  }

  
  async function onSubmit() {
    const tst = toast.loading("Updating...");
    const fd = new FormData();
    try {
      if (data.image instanceof File) {
        fd.append("image", data.image);
      }

      Object.keys(data).forEach((key) => {
        if (data[key] && key !== "image") {
          fd.append(key, data[key]);
        }
      });

      const _ = await requests.putSpotlight(ams?._id, fd);
      const res = (await requests.getAms()).data[0];
      setAms(res);
      setData(res);
      toast.success("Update successful");
    } catch (error) {
      toast.error(`ERROR: ${error?.response?.data?.message || error?.message}`);
    } finally {
      toast.dismiss(tst);
    }
  }

  useEffect(() => {
    setData(ams);
  }, [ams]);

  return ams?._id ? (
    <div className="row p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-6 tracking-wide">
        Alumni Spotlight
      </h2>

      {/* Profile Image and Quote */}
      <div className="d-flex flex-column items-center mb-6">
        <img
          src={data?.image}
          onClick={() => document.getElementById("imager").click()}
          alt={"Alumin Spotlight Image"}
          className="w-[150px] h-[150px] rounded-full border-4 border-white shadow-md cursor-pointer"
        />
        <input
          type="file"
          name="image"
          id="imager"
          className="d-none"
          onChange={handleImageChange}
        />
        <div className="relative mt-4 text-center  ">
          <input
            type="text"
            name="name"
            id="namer"
            className="form-control fw-bold mb-2"
            value={data?.name}
            onChange={handleChange}
          />
          <textarea
            className="w-full text-center bg-transparent min-w-[250px] resiz  e-none text-sm font-medium text-gray-700 leading-relaxed focus:outline-none"
            rows={3}
            value={data?.tag}
            onChange={handleChange}
            name="tag"
            id="tagger"
            placeholder="Tagline"
          />
          <FaPen className="absolute top-1 right-1 text-gray-500 cursor-pointer" />
        </div>
      </div>

      {/* Spotlight Text */}
      <div className="relative w-full bg-gray-100 border border-gray-300 rounded-lg p-4">
        <textarea
          className="w-full h-56 bg-transparent resize-none text-sm text-gray-800 leading-relaxed focus:outline-none"
          value={data?.details}
          onChange={handleChange}
          name="details"
          id="detailer"
          placeholder="Spotlight Details"
        />
        <FaPen className="absolute top-2 right-2 text-gray-500 cursor-pointer" />
      </div>
      <button
        className="btn btn-primary themebg mt-4 me-auto"
        onClick={onSubmit}
      >
        Save
      </button>
    </div>
  ) : (
    <>
      <div className="p-[100px] mt-[100px] d-flex text-center">
        <FaSpinner className="spinner m-auto fs-1 text-gray-500" />
      </div>
    </>
  );
}
