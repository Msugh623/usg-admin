import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { useStateContext } from "../../state/StateContext";
import { requests } from "../../../api/routes";

const Testimonials = () => {
  const { testimonies, setTestimonies, setModal } = useStateContext();
  const [isFetching, setIsFetching] = useState(false);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    async function fetchTestimonies() {
      setIsFetching(true);
      try {
        const res = await requests.getTestimonies();
        setTestimonies(res?.data || []);
      } catch (error) {
        toast.error("Failed to fetch testimonials");
      } finally {
        setIsFetching(false);
      }
    }
    fetchTestimonies();
  }, [setTestimonies]);

  useEffect(() => {
    if (search) {
      setFiltered(
        testimonies.filter(
          (t) =>
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.testimonial.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFiltered(testimonies);
    }
  }, [search, testimonies]);

  async function deleteTestimony(id) {
    const tst = toast.loading("Deleting testimonial...");
    try {
      await requests.deleteTestimony(id);
      setTestimonies((prev) => prev.filter((t) => t._id !== id));
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      toast.dismiss(tst);
    }
  }

  return (
    <div className="container py-4">
      <h2>Testimonials</h2>
      <div className="mb-3 flex items-center">
        <input
          type="search"
          placeholder="Search by name or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control w-1/2"
        />
        <button
          className="btn btn-primary ms-3"
          onClick={() => setModal(<Adder />)}
        >
          Add New
        </button>
      </div>
      <div>
        {filtered.map((t) => (
          <div
            key={t._id}
            className="d-flex align-items-center border rounded p-3 mb-3"
          >
            <img
              src={t.image}
              alt={t.name}
              className="rounded me-3"
              style={{ width: 80, height: 80, objectFit: "cover" }}
            />
            <div className="flex-grow-1">
              <h5>{t.name}</h5>
              <p>{t.testimonial}</p>
            </div>
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => setModal(<Editor editData={t} />)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteTestimony(t._id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
        {!filtered.length && !isFetching && <div>No testimonials found.</div>}
      </div>
    </div>
  );
};

function Editor({ editData }) {
  const { setModal, setTestimonies } = useStateContext();
  const [data, setData] = useState({ ...editData });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }
  function handleFile(e) {
    const { files } = e.target;
    setData({ ...data, image: files[0] });
  }

  async function onSubmit() {
    const tst = toast.loading("Updating...");
    const fd = new FormData();
    try {
      if (data.image instanceof File) fd.append("image", data.image);
      Object.keys(data).forEach((key) => {
        if (data[key] && key !== "image") fd.append(key, data[key]);
      });
      await requests.putTestimony(editData._id, fd);
      const updated = await requests.getTestimonies();
      setTestimonies(updated?.data || []);
      toast.success("Updated successfully");
      setModal("");
    } catch (error) {
      toast.error("Update failed");
    } finally {
      toast.dismiss(tst);
    }
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-md max-w-lg w-full mx-auto">
      <h3>Edit Testimonial</h3>
      <div className="space-y-4">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={
                data.image instanceof File
                  ? URL.createObjectURL(data.image)
                  : data.image
              }
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              onClick={() => document.getElementById("testimony-image").click()}
            />
            <input
              type="file"
              id="testimony-image"
              className="hidden"
              onChange={handleFile}
              accept="image/*"
            />
          </div>
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={data.name || ""}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div>
          <label>Testimonial</label>
          <textarea
            name="testimonial"
            value={data.testimonial || ""}
            onChange={handleChange}
            className="form-control"
            rows={4}
            required
          />
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setModal("")}
          >
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={onSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Adder() {
  const { setModal, setTestimonies } = useStateContext();
  const [data, setData] = useState({ name: "", testimonial: "", image: null });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }
  function handleFile(e) {
    const { files } = e.target;
    setData({ ...data, image: files[0] });
  }

  async function onSubmit() {
    if (!data.name || !data.testimonial || !data.image) {
      toast.error("All fields are required");
      return;
    }
    const tst = toast.loading("Adding...");
    const fd = new FormData();
    try {
      fd.append("image", data.image);
      Object.keys(data).forEach((key) => {
        if (data[key] && key !== "image") fd.append(key, data[key]);
      });
      await requests.postTestimony(fd);
      const updated = await requests.getTestimonies();
      setTestimonies(updated?.data || []);
      toast.success("Added successfully");
      setModal("");
    } catch (error) {
      toast.error("Add failed");
    } finally {
      toast.dismiss(tst);
    }
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-md max-w-lg w-full mx-auto">
      <h3>Add Testimonial</h3>
      <div className="space-y-4">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={
                data.image
                  ? URL.createObjectURL(data.image)
                  : "https://via.placeholder.com/150"
              }
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              onClick={() =>
                document.getElementById("add-testimony-image").click()
              }
            />
            <input
              type="file"
              id="add-testimony-image"
              className="hidden"
              onChange={handleFile}
              accept="image/*"
            />
          </div>
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div>
          <label>Testimonial</label>
          <textarea
            name="testimonial"
            value={data.testimonial}
            onChange={handleChange}
            className="form-control"
            rows={4}
            required
          />
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setModal("")}
          >
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={onSubmit}>
            Add Testimonial
          </button>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
