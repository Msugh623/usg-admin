import React, { useEffect, useState } from "react";
import { useStateContext } from "../../state/StateContext";
import Delay from "../../components/Delay";
import { BiSearch, BiX } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { requests } from "../../../api/routes";

const Chapters = () => {
  const { chapters, setModal, setChapters } = useStateContext();

  const [prsChapters, setChapterss] = useState([]);
  const [chapKey, setChapKey] = useState("");
  const [searchChapters, setSearchChapters] = useState(false);

  useEffect(() => {
    setChapterss(
      chapters.filter((a) => {
        return (a?.name || "").toLowerCase().includes(chapKey.toLowerCase());
      })
    );
  }, [chapKey, chapters]);
  return (
    <div className="row  pt-4" id="alumini-making-waves">
      <h2 className="px-4">Chapters</h2>
      <div className="noShade  mx-4">
        <div className="pt-4" style={{}}>
          <div
            className="d-flex bg-light p-3"
            style={{
              position: "sticky",
              top: "-10px",
            }}
          >
            <div
              className={`d-flex my-auto transition cursor-[pointer] hover:rounded hover:shadow-lg hover:p-1 par ${
                searchChapters && "w-100"
              }`}
              onClick={() => {
                setSearchChapters((prev) => !prev);
                setChapKey("");
              }}
            >
              <BiSearch className="fs-5 my-auto" />{" "}
              <span className="px-1 ">Search</span>
              {searchChapters && (
                <>
                  <input
                    type="search"
                    name=""
                    id=""
                    autoFocus
                    placeholder="Enter Alumini name to search..."
                    value={chapKey}
                    onChange={({ target }) => setChapKey(target.value)}
                    onKeyDown={(e) =>
                      e.code == "Escape" &&
                      (() => {
                        setSearchChapters(false);
                        setChapKey("");
                      })()
                    }
                    style={{
                      border: "none !important",
                    }}
                    className="h-100 my-auto bg-light outline-0 b-never slideRight ps-2 border-0 w-100 rounded"
                  />
                </>
              )}
              {searchChapters && !chapKey && (
                <div className="my-auto slideRight">
                  {" "}
                  <BiX className="fs-4" />
                </div>
              )}
            </div>
            {!searchChapters && (
              <div
                className="ms-auto slideLeft themebg rounded p-2 cursor-pointer"
                onClick={() => setModal(<Adder />)}
              >
                Add New
              </div>
            )}
          </div>

          {/* Chapter Card */}
          <div
            className="py-4 bg-white"
            style={{
              position: "sticky",
              top: "60px",
            }}
          >
            <div className="d-flex px-3">
              <div className=" text-muted w-[30%] min-w-[30%] md:w-[30%] md:min-w-[30%]">
                Name
              </div>
              <div className="me-auto">
                <a className="text-dark no-dec text-muted pe-2">Coordinator</a>
              </div>
              <div className="me-auto">
                <a className="text-dark no-dec text-muted pe-2">Link</a>
              </div>
              <div className="ms-auto">
                <a className="text-dark no-dec text-muted pe-2">Action</a>
              </div>
            </div>
          </div>
          <div className="chap">
            {prsChapters.map((chapter, index) => (
              <div
                className={`p-2 py-4 ${index % 2 == 0 && "bg-[#123F5520]"}`}
                key={"" + chapter?.name + chapter?.whatsappLink + index}
              >
                <div className="d-flex ">
                  <h4 className="w-[30%] min-w-[30%] md:w-[30%] md:min-w-[30%]">
                    {chapter.name}
                  </h4>
                  <div className="me-auto">
                    {chapter?.coordinator
                      ? chapter?.coordinator
                      : "Not Available"}
                  </div>
                  <div className="me-auto">
                    <a
                      href={
                        chapter?.whatsappLink === ""
                          ? "#"
                          : chapter?.whatsappLink
                      }
                      className="text-dark no-dec pe-2"
                    >
                      {chapter?.whatsappLink
                        ? chapter?.whatsappLink
                        : "Not Available"}
                    </a>
                  </div>
                  <div className=" ms-auto d-flex ps-3">
                    <div
                      className="ms-auto slideLeft border border-dark rounded p-2 cursor-pointer"
                      onClick={() => setModal(<Editor editData={chapter} />)}
                    >
                      Edit
                    </div>
                    <div className="m-1"></div>
                    <div
                      className="ms-auto slideLeft border border-dark rounded p-2 pt-3 cursor-pointer"
                      onClick={() => {
                        confirm("Do you want to delete this State Chapter?") &&
                          confirm("This Action Can not be undone") &&
                          (async () => {
                            const tst = toast.loading("Deleting...");
                            try {
                              await requests.deleteChapter(chapter._id);
                              setChapters((await requests.getChapters()).data);
                              toast.success("Deleted successfully");
                            } catch (error) {
                              toast.error(
                                `ERROR: ${
                                  error?.response?.data?.message ||
                                  error?.message
                                }`
                              );
                            } finally {
                              toast.dismiss(tst);
                            }
                          })();
                      }}
                    >
                      <FaTrash className="icon" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!prsChapters.length ? (
            <div className="p-3 h-100">
              <div className="phaser p-5">
                <Delay delay={2000}>
                  {chapKey
                    ? "No Wave making chapter found  matching your search, Try a different keyword"
                    : "Watch this space for Chapters"}
                </Delay>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Chapters;

function Editor({ editData }) {
  const { setModal, setChapters } = useStateContext();
  const [data, setData] = useState({
    ...editData,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleFile(e) {
    const { files } = e.target;
    setData({
      ...data,
      ["image"]: files[0],
    });
  }

  async function onSubmit() {
    const tst = toast.loading("Updating...");
    const fd = new FormData();
    const keys = Object.keys(data);
    let obj = {};
    try {
      for (let item of keys) {
        if (data[item]) {
          obj[item] = data[item];
        }
      }
      const _ = await requests.putChapter(editData?._id, obj);
      setChapters((await requests.getChapters()).data);
      toast.success("Update successful");
      setModal("");
    } catch (error) {
      toast.error(`ERROR: ${error?.response?.data?.message || error?.message}`);
    } finally {
      toast.dismiss(tst);
    }
  }
  return (
    <div className="p-4 bg-white rounded-lg w-[400px] mx-auto">
      <h4>Update Chapter</h4>
      <>
        <div className="text-center mb-4">
          {/* <img
                    src={data?.image}
                    alt="Profile"
                    className="w-[100px] h-[100px] rounded-full object-cover mx-auto mb-3"
                /> */}
        </div>
        <div className="text-center mb-4">
          {/* <h5 className="text-gray-700">{data?.name} </h5> */}
        </div>
        <div className="mb-4">
          {/* <div className="mb-3">
                            <input type="file" accept='img/*,image/*' onChange={handleFile} className="form-control" placeholder='Title'/>
                        </div> */}
          <div className="mb-3">
            <input
              type="text"
              onChange={handleChange}
              name="name"
              value={data.name}
              className="form-control"
              placeholder="Chapter Name"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              onChange={handleChange}
              name="coordinator"
              value={data.coordinator}
              className="form-control"
              placeholder="Chapter Coordinator"
            />
          </div>
          <input
            type="url"
            className="form-control w-full border rounded p-2"
            placeholder="Chapters's Whatsapp Link"
            rows="4"
            onChange={handleChange}
            name="whatsappLink"
            value={data.whatsappLink}
          ></input>
        </div>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setModal("")}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onSubmit}>
            Update
          </button>
        </div>
      </>
    </div>
  );
}

function Adder() {
  const { setModal, setChapters } = useStateContext();
  const [data, setData] = useState({
    name: "",
    whatsappLink: "",
    coordinator: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleFile(e) {
    const { files } = e.target;
    setData({
      ...data,
      ["image"]: files[0],
    });
  }

  async function onSubmit() {
    const tst = toast.loading("Adding...");
    const fd = new FormData();
    const keys = Object.keys(data);
    let obj = {};

    try {
      for (let item of keys) {
        if (data[item]) {
          obj[item] = data[item];
        }
      }
      const _ = await requests.postChapter(obj);
      setChapters((await requests.getChapters()).data);
      toast.success("Chapter Story added successfully");
      setModal("");
    } catch (error) {
      toast.error(`ERROR: ${error?.response?.data?.message || error?.message}`);
    } finally {
      toast.dismiss(tst);
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg w-[400px] mx-auto">
      <h4>Add Chapter</h4>
      <>
        <div className="text-center mb-4">
          {/* <img
                    src={data?.image}
                    alt="Profile"
                    className="w-[100px] h-[100px] rounded-full object-cover mx-auto mb-3"
                /> */}
        </div>
        <div className="text-center mb-4">
          {/* <h5 className="text-gray-700">{data?.name} </h5> */}
        </div>
        <div className="mb-4">
          <div className="mb-3">
            <input
              type="text"
              onChange={handleChange}
              name="name"
              value={data.name}
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              onChange={handleChange}
              name="coordinator"
              value={data.coordinator}
              className="form-control"
              placeholder="Chapter Coordinator"
            />
          </div>
          <input
            type="url"
            className="form-control w-full border rounded p-2"
            placeholder="Whatsapp Link"
            onChange={handleChange}
            name="whatsappLink"
            value={data.whatsappLink}
          ></input>
        </div>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setModal("")}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onSubmit}>
            Save
          </button>
        </div>
      </>
    </div>
  );
}
