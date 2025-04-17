import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../state/StateContext'
import Delay from '../../components/Delay'
import { BiSearch, BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import { toast } from "react-toastify";
import { requests } from "../../../api/routes";

const News = () => {
  const { news, setModal, isFetching, setNews } = useStateContext();

  const [prsNews, setPrsNews] = useState([]);
  const [key, setKey] = useState("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    setPrsNews(
      news.filter((a) => {
        return (a?.title || "").toLowerCase().includes(key.toLowerCase());
      })
    );
  }, [key, news]);
  return (
    <div className="max-w-100 row pt-4" id="alumini-making-waves">
      <h2 className="px-4">News</h2>
      <div className="container noShade row mx-auto">
        <div
          className="pt-4"
          style={{
            maxHeight: "800px",
            overflowY: "auto",
          }}
        >
          <div
            className="d-flex bg-light p-3"
            style={{
              position: "sticky",
              top: "0px",
            }}
          >
            <div
              className={`d-flex my-auto transition cursor-[pointer] hover:rounded hover:shadow-lg hover:p-1 par ${
                search && "w-100"
              }`}
              onClick={() => {
                setSearch((prev) => !prev);
                setKey("");
              }}
            >
              <BiSearch className="fs-5 my-auto" />{" "}
              <span className="px-1 ">Search</span>
              {search && (
                <>
                  <input
                    type="search"
                    name=""
                    id=""
                    autoFocus
                    placeholder="Enter Alumini name to search..."
                    value={key}
                    onChange={({ target }) => setKey(target.value)}
                    onKeyDown={(e) =>
                      e.code == "Escape" &&
                      (() => {
                        setSearch(false);
                        setKey("");
                      })()
                    }
                    style={{
                      border: "none !important",
                    }}
                    className="h-100 my-auto bg-light outline-0 b-never slideRight ps-2 border-0 w-100 rounded"
                  />
                </>
              )}
              {search && !key && (
                <div className="my-auto slideRight">
                  {" "}
                  <BiX className="fs-4" />
                </div>
              )}
            </div>
            {!search && (
              <div
                className="ms-auto slideLeft themebg rounded p-2"
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
              top: "50px",
            }}
          >
            <div className="d-flex px-3">
              <div className=" text-muted w-[30%] min-w-[30%] md:w-[30%] md:min-w-[30%]">
                Title
              </div>
              <div className="me-auto"></div>
              <div className="ms-auto">
                <a className="text-dark no-dec text-muted pe-2">Action</a>
              </div>
            </div>
          </div>
          <div className="chap">
            {prsNews.map((hl, index) => (
              <div
                className={`p-2 py-4 pb-0 pt-1 ${
                  index % 2 == 0 && "bg-[#123F5520]"
                }`}
                key={"" + hl?.title + hl?.content}
              >
                <div className="d-flex ">
                  <div className="pt-3 pe-3">
                    <img
                      src={hl?.image}
                      alt={hl?.title}
                      className="min-w-[70px] my-auto max-w-[80px] object-cover mb-4"
                    />
                  </div>
                  <div className="max-w-[80%] my-auto">
                    <h4>
                      <div className="">{hl.title.slice(0, 64)}...</div>
                    </h4>
                    <div className="me-auto">
                      <a className="text-dark no-dec pe-2">
                        {hl?.content.slice(0, 64)}...
                      </a>
                    </div>
                  </div>
                  <div className="ms-auto m d-flex ps-3">
                    <div className="my-auto d-flex">
                      <div
                        className="ms-auto slideLeft btn border border-dark rounded p-2"
                        onClick={() => setModal(<Editor editData={hl} />)}
                      >
                        Edit
                      </div>
                      <div className="m-1"></div>
                      <div
                        className="ms-auto slideLeft border border-dark rounded p-2 pt-3"
                        onClick={() => {
                          confirm(
                            "Do you want to delete this Headline Story?"
                          ) &&
                            confirm("This Action Can not be undone") &&
                            (async () => {
                              const tst = toast.loading("Deleting...");
                              try {
                                await requests.deleteNews(hl._id);
                                setNews((await requests.getNews())?.latestNews);
                                toast.success("Headline Deleted successfully");
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
              </div>
            ))}
          </div>
          {!prsNews.length ? (
            <div className="p-3 h-100">
              <div className="phaser p-5">
                <Delay delay={2000}>
                  {key
                    ? "No Wave making Alumini found  matching your search, Try a different keyword"
                    : !isFetching
                    ? "Watch this space for Alumini Making Waves"
                    : ""}
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

export default News;

function Editor({ editData }) {
  const { setModal, setNews } = useStateContext();
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
    try {
      for (let item of keys) {
        if (data[item]) {
          fd.append(item, data[item]);
        }
      }
      const _ = await requests.putNews(editData?._id, fd);
      setNews((await requests.getNews())?.latestNews);
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
      <h4>Update Headline</h4>
      <>
        <div className="text-center mb-4">
          {/* <img
                    src={data?.image}
                    alt="Profile"
                    className="w-[100px] h-[100px] rounded-full object-cover mx-auto mb-3"
                /> */}
        </div>
        <div className="text-center mb-4">
          <h5 className="text-gray-700">{editData?.title} </h5>
        </div>
        <div className="mb-4">
          <div className="mb-3">
            <input
              type="file"
              accept="img/*,image/*"
              onChange={handleFile}
              className="form-control"
              placeholder="Title"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              onChange={handleChange}
              name="title"
              value={data.title}
              className="form-control"
              placeholder="Title"
            />
          </div>
          <div className="mb-3">
            <input
              type="url"
              onChange={handleChange}
              name="url"
              value={data.url}
              className="form-control"
              placeholder="URL"
            />
          </div>
          <textarea
            className="form-control w-full border rounded p-2"
            placeholder="Tag"
            rows="4"
            onChange={handleChange}
            name="content"
            value={data.content}
          ></textarea>
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
  const { setModal, setNews } = useStateContext();
  const [data, setData] = useState({
    title: "",
    content: "",
    image: "",
    url: "",
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
    try {
      for (let item of keys) {
        if (data[item]) {
          fd.append(item, data[item]);
        }
      }
      const _ = await requests.postNews(fd);
      setNews((await requests.getNews())?.latestNews);
      toast.success("Impact Story added successfully");
      setModal("");
    } catch (error) {
      toast.error(`ERROR: ${error?.response?.data?.message || error?.message}`);
    } finally {
      toast.dismiss(tst);
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg w-[400px] mx-auto">
      <h4>Add Headline</h4>
      <>
        <div className="text-center mb-4">
          {/* <img
                    src={data?.image}
                    alt="Profile"
                    className="w-[100px] h-[100px] rounded-full object-cover mx-auto mb-3"
                /> */}
        </div>
        <div className="text-center mb-4">
          <h5 className="text-gray-700">{data?.title} </h5>
        </div>
        <div className="mb-4">
          <div className="mb-3">
            <input
              type="file"
              accept="img/*,image/*"
              onChange={handleFile}
              className="form-control"
              placeholder="Title"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              onChange={handleChange}
              name="title"
              value={data.title}
              required
              className="form-control"
              placeholder="Title"
            />
          </div>

          <div className="mb-3">
            <input
              type="url"
              onChange={handleChange}
              name="url"
              value={data.url}
              required
              className="form-control"
              placeholder="URL"
            />
          </div>
          <textarea
            className="form-control w-full border rounded p-2"
            placeholder="content"
            rows="4"
            onChange={handleChange}
            name="content"
            required
            value={data.content}
          ></textarea>
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

