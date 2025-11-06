import React, { useEffect, useState } from "react";
import { useStateContext } from "../../state/StateContext";
import Delay from "../../components/Delay";
import { BiSearch, BiX } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { requests } from "../../../api/routes";

const ProgramPresidents = () => {
  const { setModal } = useStateContext();
  const [presidents, setPresidents] = useState([]);
  const [filteredPresidents, setFilteredPresidents] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPresidents();
  }, []);

  async function fetchPresidents() {
    setLoading(true);
    try {
      const res = await requests.getProgramPresidents();
      setPresidents(res?.data || []);
      setFilteredPresidents(res?.data || []);
    } catch (error) {
      toast.error("Failed to load program presidents");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setFilteredPresidents(
      presidents.filter((p) => {
        return (
          (p?.name || "").toLowerCase().includes(searchKey.toLowerCase()) ||
          (p?.program || "").toLowerCase().includes(searchKey.toLowerCase())
        );
      })
    );
  }, [searchKey, presidents]);

  async function deletePresident(id) {
    if (!confirm("Do you want to delete this Program President?")) return;
    if (!confirm("This action cannot be undone")) return;

    const tst = toast.loading("Deleting...");
    try {
      await requests.deleteProgramPresident(id);
      setPresidents((prev) => prev.filter((p) => p._id !== id));
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error(`ERROR: ${error?.response?.data?.message || error?.message}`);
    } finally {
      toast.dismiss(tst);
    }
  }

  return (
    <div className="row pt-4" id="program-presidents">
      <h2 className="px-4">Program Presidents</h2>
      <div className="noShade mx-4">
        <div className="pt-4">
          <div
            className="d-flex bg-light p-3"
            style={{
              position: "sticky",
              top: "-10px",
            }}
          >
            <div
              className={`d-flex my-auto transition cursor-[pointer] hover:rounded hover:shadow-lg hover:p-1 par ${
                searchActive && "w-100"
              }`}
              onClick={() => {
                setSearchActive((prev) => !prev);
                setSearchKey("");
              }}
            >
              <BiSearch className="fs-5 my-auto" />{" "}
              <span className="px-1">Search</span>
              {searchActive && (
                <>
                  <input
                    type="search"
                    autoFocus
                    placeholder="Enter name or program to search..."
                    value={searchKey}
                    onChange={({ target }) => setSearchKey(target.value)}
                    onKeyDown={(e) =>
                      e.code === "Escape" &&
                      (() => {
                        setSearchActive(false);
                        setSearchKey("");
                      })()
                    }
                    style={{
                      border: "none !important",
                    }}
                    className="h-100 my-auto bg-light outline-0 b-never slideRight ps-2 border-0 w-100 rounded"
                  />
                </>
              )}
              {searchActive && !searchKey && (
                <div className="my-auto slideRight">
                  {" "}
                  <BiX className="fs-4" />
                </div>
              )}
            </div>
            {!searchActive && (
              <div
                className="ms-auto slideLeft themebg rounded p-2 cursor-pointer"
                onClick={() => setModal(<Adder onSuccess={fetchPresidents} />)}
              >
                Add New
              </div>
            )}
          </div>

          {/* Header */}
          <div
            className="py-4 bg-white"
            style={{
              position: "sticky",
              top: "60px",
            }}
          >
            <div className="d-flex px-3">
              <div className="text-muted w-[25%] min-w-[25%] md:w-[25%] md:min-w-[25%]">
                Name
              </div>
              <div className="me-auto text-muted">Program</div>
              
              <div className="ms-auto text-muted">Action</div>
            </div>
          </div>

          {/* List */}
          <div className="presidents-list">
            {loading && <div className="p-3">Loading...</div>}
            {!loading &&
              filteredPresidents.map((president, index) => (
                <div
                  className={`p-2 py-4 ${index % 2 === 0 && "bg-[#123F5520]"}`}
                  key={president._id || index}
                >
                  <div className="d-flex">
                    <h4 className="w-[25%] min-w-[25%] md:w-[25%] md:min-w-[25%]">
                      {president.name}
                    </h4>
                    <div className="me-auto">
                      {president?.program || "Not Available"}
                    </div>
                    
                    <div className="ms-auto d-flex ps-3">
                      <div
                        className="ms-auto slideLeft border border-dark rounded p-2 cursor-pointer"
                        onClick={() =>
                          setModal(
                            <Editor
                              editData={president}
                              onSuccess={fetchPresidents}
                            />
                          )
                        }
                      >
                        Edit
                      </div>
                      <div className="m-1"></div>
                      <div
                        className="ms-auto slideLeft border border-dark rounded p-2 pt-3 cursor-pointer"
                        onClick={() => deletePresident(president._id)}
                      >
                        <FaTrash className="icon" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {!loading && !filteredPresidents.length && (
            <div className="p-3 h-100">
              <div className="phaser p-5">
                <Delay delay={2000}>
                  {searchKey
                    ? "No program presidents found matching your search. Try a different keyword"
                    : "No program presidents added yet"}
                </Delay>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramPresidents;

function Editor({ editData, onSuccess }) {
  const { setModal } = useStateContext();
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
    try {
      await requests.putProgramPresident(editData?._id, data);
      toast.success("Update successful");
      setModal("");
      onSuccess();
    } catch (error) {
      toast.error(`ERROR: ${error?.response?.data?.message || error?.message}`);
    } finally {
      toast.dismiss(tst);
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg w-[400px] mx-auto">
      <h4>Update Program President</h4>
      <div className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={data.name || ""}
            className="form-control"
            placeholder="President Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            onChange={handleChange}
            name="program"
            value={data.program || ""}
            className="form-control"
            placeholder="Program Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            onChange={handleChange}
            name="email"
            value={data.email || ""}
            className="form-control"
            placeholder="Email Address"
          />
        </div>
        <div className="mb-3">
          <input
            type="tel"
            onChange={handleChange}
            name="phone"
            value={data.phone || ""}
            className="form-control"
            placeholder="Phone Number"
          />
        </div>
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
    </div>
  );
}

function Adder({ onSuccess }) {
  const { setModal } = useStateContext();
  const [data, setData] = useState({
    name: "",
    program: "",
    email: "",
    phone: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onSubmit() {
    if (!data.name || !data.program) {
      toast.error("Name and program are required");
      return;
    }

    const tst = toast.loading("Adding...");
    try {
      await requests.postProgramPresident(data);
      toast.success("Program President added successfully");
      setModal("");
      onSuccess();
    } catch (error) {
      toast.error(`ERROR: ${error?.response?.data?.message || error?.message}`);
    } finally {
      toast.dismiss(tst);
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg w-[400px] mx-auto">
      <h4>Add Program President</h4>
      <div className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={data.name}
            className="form-control"
            placeholder="President Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            onChange={handleChange}
            name="program"
            value={data.program}
            className="form-control"
            placeholder="Program Name"
            required
          />
        </div>
        
      </div>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setModal("")}
        >
          Cancel
        </button>
        <button className="btn btn-primary" onClick={onSubmit}>
          Add
        </button>
      </div>
    </div>
  );
}
