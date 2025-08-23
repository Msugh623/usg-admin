import { useEffect, useState } from "react";
import { BiSearch, BiX } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { requests } from "../../../api/routes";
import { useStateContext } from "../../state/StateContext";
import Delay from "../../components/Delay";

const Leaders = () => {
  const { leaders = [], setLeaders, setModal } = useStateContext();
  const [localLeaders, setLocalLeaders] = useState([]);
  const [search, setSearch] = useState(false);
  const [key, setKey] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [prsLeaders, setPrsLeaders] = useState([]);

  useEffect(() => {
    async function fetchLeaders() {
      setIsFetching(true);
      try {
        const res = await requests.getLeaders();
        if (res?.data) {
          setLocalLeaders(res.data);
          if (typeof setLeaders === "function") {
            setLeaders(res.data);
          }
        }
      } catch (error) {
        console.error("Error fetching leaders:", error);
      } finally {
        setIsFetching(false);
      }
    }

    fetchLeaders();
  }, [setLeaders]);

  useEffect(() => {
    if (key) {
      setPrsLeaders(
        (leaders.length ? leaders : localLeaders).filter(
          (leader) =>
            leader.name.toLowerCase().includes(key.toLowerCase()) ||
            leader.position.toLowerCase().includes(key.toLowerCase())
        )
      );
    } else {
      setPrsLeaders(leaders.length ? leaders : localLeaders);
    }
  }, [key, leaders, localLeaders]);

  async function deleteLeader(id) {
    const tst = toast.loading("Deleting leader...");
    try {
      await requests.deleteLeader(id);
      setLocalLeaders((prev) => prev.filter((leader) => leader._id !== id));
      if (typeof setLeaders === "function") {
        setLeaders((prev) => prev.filter((leader) => leader._id !== id));
      }
      toast.success("Leader deleted successfully");
    } catch (error) {
      toast.error(`ERROR: ${error?.response?.data?.message || error?.message}`);
    } finally {
      toast.dismiss(tst);
    }
  }

  return (
    <div className="col-md-12 container row pt-4" id="leaders">
      <h2 className="px-4">Leaders</h2>
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
                    placeholder="Search by name or position..."
                    value={key}
                    onChange={({ target }) => setKey(target.value)}
                    onKeyDown={(e) =>
                      e.code === "Escape" &&
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
                className="ms-auto slideLeft themebg rounded p-2 cursor-pointer"
                onClick={() => setModal(<Adder />)}
              >
                Add New
              </div>
            )}
          </div>

          <div
            className="py-4 bg-white"
            style={{
              position: "sticky",
              top: "50px",
            }}
          >
            <div className="d-flex px-3">
              <div className="text-muted w-[30%] min-w-[30%] md:w-[30%] md:min-w-[30%]">
                Name
              </div>
              {/* <div className="me-auto">
                <span className="text-dark no-dec text-muted pe-2">Position / Level</span>
              </div> */}
              <div className="ms-auto">
                <span className="text-dark no-dec text-muted pe-2">Action</span>
              </div>
            </div>
          </div>
          <div className="leader-list">
            {prsLeaders.map((leader, index) => (
              <div
                className={`p-4 flex items-center justify-between ${
                  index % 2 === 0 ? "bg-[#123F5520]" : "bg-white"
                }`}
                key={`${leader?.name}${leader?.position}${index}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="pt-3 pe-3">
                    <img
                      src={leader?.image}
                      alt={leader?.name}
                      className="min-w-[70px] min-h-[70px] max-w-[80px] max-h-[80px] rounded-full object-cover mb-4"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">
                      {leader.name}
                    </h4>
                    <p className="text-xs text-gray-500">{leader.position}</p>
                    <p className="text-xs mt-1 inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 capitalize">
                      {leader.level || "board"}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="border border-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-200"
                    onClick={() => setModal(<Editor editData={leader} />)}
                  >
                    Edit
                  </button>
                  <button
                    className="border border-gray-300 text-red-600 px-4 py-2 rounded hover:bg-red-100"
                    onClick={() => {
                      if (window.confirm(`Delete ${leader.name}?`)) {
                        deleteLeader(leader._id);
                      }
                    }}
                  >
                    <FaTrash className="icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {!prsLeaders.length ? (
            <div className="p-3 h-100">
              <div className="phaser p-5">
                <Delay delay={2000}>
                  {key
                    ? "No leaders found matching your search. Try a different keyword."
                    : !isFetching
                    ? "No leaders added yet. Click 'Add New' to add leaders."
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

function Editor({ editData }) {
  const { setModal, setLeaders } = useStateContext();
  const [data, setData] = useState({
    ...editData,
  });
  const [updatedLeadersData, setUpdatedLeadersData] = useState(null);

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
      image: files[0],
    });
  }

  async function onSubmit() {
    const tst = toast.loading("Updating...");
    const fd = new FormData();
    try {
      // Handle image file if it exists
      if (data.image instanceof File) {
        fd.append("image", data.image);
      }

      // Append other fields
      Object.keys(data).forEach((key) => {
        if (data[key] && key !== "image") {
          fd.append(key, data[key]);
        }
      });

      await requests.putLeader(editData?._id, fd);
      const response = await requests.getLeaders();
      const updatedLeaders = response?.data || [];
      setUpdatedLeadersData(updatedLeaders);

      if (typeof setLeaders === "function") {
        setLeaders(updatedLeaders);
      }

      toast.success("Leader updated successfully");
      setModal("");
    } catch (error) {
      toast.error(`ERROR: ${error?.response?.data?.message || error?.message}`);
    } finally {
      toast.dismiss(tst);
    }
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-md max-w-lg w-full mx-auto">
      <h3 className="text-xl font-semibold mb-4">Edit Leader</h3>

      <div className="space-y-4">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={
                data.image instanceof File
                  ? URL.createObjectURL(data.image)
                  : data.image
              }
              alt="Leader preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              onClick={() => document.getElementById("leader-image").click()}
            />
            <button
              className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => document.getElementById("leader-image").click()}
            >
              +
            </button>
            <input
              type="file"
              id="leader-image"
              className="hidden"
              onChange={handleFile}
              accept="image/*"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={data.position || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={data.bio || ""}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Level
          </label>
          <select
            id="level"
            name="level"
            value={data.level || "board"}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="board">Board</option>
            <option value="executive">Executive</option>
            <option value="member">Member</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={() => setModal("")}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={onSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Adder() {
  const { setModal, setLeaders } = useStateContext();
  const [updatedLeadersData, setUpdatedLeadersData] = useState(null);
  const [data, setData] = useState({
    name: "",
    position: "",
    bio: "",
    level: "board",
    image: null,
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
      image: files[0],
    });
  }

  async function onSubmit() {
    if (!data.name || !data.position) {
      toast.error("Name and position are required");
      return;
    }

    if (!data.image) {
      toast.error("Leader image is required");
      return;
    }

    const tst = toast.loading("Adding leader...");
    const fd = new FormData();
    try {
      // Add image file
      fd.append("image", data.image);

      // Add other fields
      Object.keys(data).forEach((key) => {
        if (data[key] && key !== "image") {
          fd.append(key, data[key]);
        }
      });

      await requests.postLeader(fd);
      const response = await requests.getLeaders();
      const updatedLeaders = response?.data || [];
      setUpdatedLeadersData(updatedLeaders);

      if (typeof setLeaders === "function") {
        setLeaders(updatedLeaders);
      }

      toast.success("Leader added successfully");
      setModal("");
    } catch (error) {
      toast.error(`ERROR: ${error?.response?.data?.message || error?.message}`);
    } finally {
      toast.dismiss(tst);
    }
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-md max-w-lg w-full mx-auto">
      <h3 className="text-xl font-semibold mb-4">Add New Leader</h3>

      <div className="space-y-4">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={
                data.image
                  ? URL.createObjectURL(data.image)
                  : "https://via.placeholder.com/150"
              }
              alt="Leader preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              onClick={() =>
                document.getElementById("new-leader-image").click()
              }
            />
            <button
              className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() =>
                document.getElementById("new-leader-image").click()
              }
            >
              +
            </button>
            <input
              type="file"
              id="new-leader-image"
              className="hidden"
              onChange={handleFile}
              accept="image/*"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="new-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="new-name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="new-position"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Position
          </label>
          <input
            type="text"
            id="new-position"
            name="position"
            value={data.position}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="new-bio"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bio
          </label>
          <textarea
            id="new-bio"
            name="bio"
            value={data.bio}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="new-level"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Level
          </label>
          <select
            id="new-level"
            name="level"
            value={data.level}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="board">Board</option>
            <option value="national">National</option>
            <option value="subcommittee">Subcommittee</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={() => setModal("")}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={onSubmit}
          >
            Add Leader
          </button>
        </div>
      </div>
    </div>
  );
}

export default Leaders;
