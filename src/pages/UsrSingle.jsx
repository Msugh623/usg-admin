import { useNavigate, useParams } from "react-router-dom";
import { FaPhone, FaEnvelope, FaSpinner, FaFacebook, FaLinkedin } from "react-icons/fa";
import { useStateContext } from "../state/StateContext";
import { BiChevronLeft } from "react-icons/bi";

export default function UserProfile() {
    const { id } = useParams();
    const { users } = useStateContext();
    const navigate = useNavigate()

    // Find user based on _id
    const user = users.find((user) => user?._id == id);

    if (!user) {
        return <div className="text-center text-gray-500 py-[200px]">
            <div>
                {/* {JSON.stringify(users)} */}
            </div>
            <span className="fs-1 pe-2 d-flex slideUp">{users.length ? '404' : <FaSpinner className="mx-auto spinner" />}</span>{users.length ? ' User not found . : .' : ''}
        </div>;
    }

    return (
        <div className="mx-auto p-6 bg-white border rounded-lg my-3 my-sm-5 min-w-[50vw] w-[fit-content] px-md-5 shadow-md slideUp">
            <button className="text-gray-600 text-xl shadow rounded-full fs-3 d-flex mb-4" onClick={() => navigate(-1)}>
                <BiChevronLeft />
            </button>
            <div className="row items-center py-5">
                <div className="col-md-5 d-flex">
                    <img
                        src={user?.photo}
                        alt={user?.fullname}
                        className="w-[180px] h-[180px] mt-0 ms-md-auto me-md-5 rounded-full object-cover mb-4" />
                </div>
                <div className="col-md-7">
                    <p className="text-gray-700 py-2 border-bottom pb-3">
                        <strong className="pe-3">Name:</strong> {user?.fullname}
                    </p>
                    <p className="text-gray-700 py-2 border-bottom pb-3">
                        <strong className="pe-3">State:</strong> {user?.state}
                    </p>
                    <p className="text-gray-700 py-2 border-bottom pb-3">
                        <strong className="pe-3">Programme Affiliation:</strong> {(user?.programme || []).map(prg => `${prg}, `)}
                    </p>
                    <p className="text-gray-700 py-2 border-bottom pb-3">
                        <strong className="pe-3">Industry:</strong> {user?.industry}
                    </p>
                    <div className="mt-4 d-flex py-2 border-bottom pb-3 ">
                        <strong className="me-2">Connect:</strong>
                        <div className="flex gap-3 mt-2 text-gray-600 icon">
                           {user?.showEmail&& <a href={`mailto:${user?.email}`} className="text-dark">
                                <FaEnvelope className="cursor-pointer hover:text-blue-500" />
                            </a>}
                            {user?.facebook&&<a href={user?.facebook} className="text-dark">
                                <FaFacebook className="cursor-pointer hover:text-blue-500" />
                            </a>}
                            {user?.linkedin&&<a href={user?.linkedin} className="text-dark">
                                <FaLinkedin className="cursor-pointer hover:text-blue-500" />
                            </a>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
