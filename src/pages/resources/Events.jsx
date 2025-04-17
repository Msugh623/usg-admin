import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../state/StateContext'
import Delay from '../../components/Delay'
import { BiSearch, BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import { toast } from "react-toastify";
import { requests } from '../../../api/routes'

const Events = () => {
  const { events, setModal, isFetching, setEvents } = useStateContext();

  const [prsEvents, setPrsEvents] = useState([]);
  const [key, setKey] = useState("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    setPrsEvents(
      events.filter((a) => {
        return (a?.title || "").toLowerCase().includes(key.toLowerCase());
      })
    );
  }, [key, events]);

  return (
    <div className="col-md-12 container row pt-4" id="alumini-making-waves">
      <h2 className="px-4">Events</h2>
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
                Name
              </div>
              <div className="me-auto"></div>
              <div className="ms-auto">
                <a className="text-dark no-dec text-muted pe-2">Action</a>
              </div>
            </div>
          </div>
          <div className="chap">
            {prsEvents.map((ev, index) => (
              <div
                className={`p-4 flex items-center justify-between ${
                  index % 2 === 0 ? "bg-[#123F5520]" : "bg-white"
                }`}
                key={`${ev?.name}${ev?.whatsappLink}${index}`}
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">
                      {ev.name.slice(0, 70)}
                      {ev?.name > 70 && "..."}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {new Date(ev.date).toDateString() || "Date"}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="border border-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-200"
                    onClick={() => setModal(<Editor editData={ev} />)}
                  >
                    Edit
                  </button>
                  <button
                    className="border border-gray-300 text-red-600 px-4 py-2 rounded hover:bg-red-100"
                    onClick={() => {
                      confirm("Do you want to delete this Event?") &&
                        confirm("This Action Can not be undone") &&
                        (async () => {
                          const tst = toast.loading("Deleting...");
                          try {
                            await requests.deleteEvent(ev._id);
                            setEvents((await requests.getEvents())?.data);
                            toast.success("Event Deleted successfully");
                          } catch (error) {
                            toast.error(
                              `ERROR: ${
                                error?.response?.data?.message || error?.message
                              }`
                            );
                          } finally {
                            toast.dismiss(tst);
                          }
                        })();
                    }}
                  >
                    <FaTrash className="icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {!prsEvents.length ? (
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

export default Events;

function Editor({ editData }) {
  const { setModal, setEvents } = useStateContext();
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


  async function onSubmit() {
    const tst = toast.loading("Updating...");
    let fd = {}
    const keys = Object.keys(data);
    try {
      for (let item of keys) {
        if (data[item]) {
          fd = {
            ...data,
            [item]: data[item],
          };
        }
      }
      const _ = await requests.putEvent(editData?._id, fd);
      setEvents((await requests.getEvents())?.data);
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
      <h4>Update Event</h4>
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
              type="text"
              onChange={handleChange}
              name="name"
              value={data.name}
              className="form-control"
              placeholder="Event Name"
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
          <div className="mb-3">
            <input
              type="date"
              onChange={handleChange}
              className="form-control"
              placeholder="Title"
              name='date'
              value={((data?.date||'').split('T')[0]||data?.date)}
            />
          </div>
          <textarea
            className="form-control w-full border rounded p-2"
            placeholder="Event Description"
            rows="4"
            onChange={handleChange}
            name="description"
            value={data.description}
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
  const { setModal, setEvents } = useStateContext();
  const [data, setData] = useState({
    name: "",
    description: "",
    title: "",
    url: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }


  async function onSubmit() {
    const tst = toast.loading("Adding...");
    let fd = {}
    const keys = Object.keys(data);
    try {
      for (let item of keys) {
        if (data[item]) {
          fd = {
            ...data,
            [item]: data[item]
          }
        }
      }
      const _ = await requests.postEvent(fd);
      setEvents((await requests.getEvents())?.data);
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
      <h4>Add Event</h4>
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
              type="text"
              onChange={handleChange}
              name="name"
              value={data.name}
              className="form-control"
              placeholder="Event Name"
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
          <div className="mb-3">
            <input
              type="date"
              onChange={handleChange}
              className="form-control"
              placeholder=""
              name='date'
              value={data?.date}
            />
          </div>
          <textarea
            className="form-control w-full border rounded p-2"
            placeholder="Event Description"
            rows="4"
            onChange={handleChange}
            name="description"
            value={data.description}
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

