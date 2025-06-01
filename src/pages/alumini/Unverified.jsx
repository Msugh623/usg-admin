import React, { use, useEffect, useState } from "react";
import { useStateContext } from "../../state/StateContext";
import Delay from "../../components/Delay";
import { BiSearch, BiX } from "react-icons/bi";
import { toast } from "react-toastify";
import { requests } from "../../../api/routes";

const Unverified   = () => {
  const { users, setModal, setUsers,uv,setUv } = useStateContext();
  const [prsUsers, setPrsUsers] = useState([]);
  const [chapKey, setChapKey] = useState("");
  const [searchUsers, setSearchUsers] = useState(false);
  const experts = users.filter((user) => Boolean(user?.expert));
  const [common, setCommon] = useState([]);

  useEffect(() => {
    document.title = "USGEAAN Admin - Unverified Users";
    setPrsUsers(
      experts.filter((a) => {
        return (
          (a?.fullname || "").toLowerCase().includes(chapKey.toLowerCase()) ||
          (a?.cateogry || "").toLowerCase().includes(chapKey.toLowerCase())
        );
      })
    );
  }, [chapKey, users]);

  useEffect(() => {
    setCommon(users.filter((user) => !Boolean(user?.expert)));
  }, [users]);

  return (
    <div className="col-md-12 container row pt-4" id="alumini-making-waves">
      <h2 className="px-4">Unverified</h2>
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
              top: "-30px",
              zIndex: "11",
            }}
          >
            <div
              className={`d-flex my-auto transition cursor-[pointer] hover:rounded hover:shadow-lg hover:p-1 par ${
                searchUsers && "w-100"
              }`}
              onClick={() => {
                setSearchUsers((prev) => !prev);
                setChapKey("");
              }}
            >
              <BiSearch className="fs-5 my-auto" />{" "}
              <span className="px-1 ">Search</span>
              {searchUsers && (
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
                        setSearchUsers(false);
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
              {searchUsers && !chapKey && (
                <div className="my-auto slideRight">
                  {" "}
                  <BiX className="fs-4" />
                </div>
              )}
            </div>
          </div>

          {/* Chapter Card */}
          <div
            className="py-4 bg-white"
            style={{
              position: "sticky",
              top: "20px",
              zIndex: "10",
            }}
          >
            <div className="d-flex px-3">
              <div className=" text-muted w-[50%] min-w-[50%] md:w-[35%] md:min-w-[35%]">
                Name
              </div>
              <div className="me-auto">
                <a className="text-dark no-dec text-muted pe-2"></a>
              </div>
              <div className="ms-auto">
                <a className="text-dark no-dec text-muted pe-2">Action</a>
              </div>
            </div>
          </div>
          <div className="chap">
            {uv.map((user, index) => (
              <div
                className={`p-2 py-4 ${index % 2 == 0 && "bg-[#123F5520]"}`}
                key={"" + user?.fullname + user?.cateogry + user?._id}
              >
                <div className="d-flex ">
                  <h4 className="w-[50%] d-flex min-w-[50%] md:w-[35%] md:min-w-[35%]">
                    <img
                      src={user?.photo}
                      alt=""
                      className="me-2 w-[50px] h-[50px] my-auto rounded"
                    />
                    <span className="my-auto">{user.fullname}</span>
                  </h4>
                  <div className="me-auto my-auto">
                    <a className="text-dark no-dec pe-2">{user?.cateogry}</a>
                  </div>
                  <div className=" ms-auto my-auto d-flex ps-3">
                    <div
                      className="ms-auto slideLeft border border-dark rounded p-2 pt-3 cursor-pointer"
                      onClick={() => {
                          (async () => {
                            const tst = toast.loading("Verifying...");
                            try {
                              const _ = await requests.verifyUser(user._id);
                              const resUv = await requests.getUnverified();
                              setUv(resUv?.data);
                              toast.success("Dissmis Succesful");
                            } catch (err) {
                              toast.error(
                                "ERROR: " +
                                  (err.response.data.message ||
                                    err.response.data.error ||
                                    err.message)
                              );
                            } finally {
                              toast.dismiss(tst);
                            }
                          })();
                      }}
                    >
                      <div className="icon small m-auto ">Verify</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!prsUsers.length ? (
            <div className="p-3 h-100">
              <div className="phaser p-5">
                <Delay delay={2000}>
                  {chapKey
                    ? "No unverified user found  matching your search, Try a different keyword"
                    : "Watch this space for unverified"}
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

export default Unverified;