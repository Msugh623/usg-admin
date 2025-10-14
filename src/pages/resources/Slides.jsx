import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { requests } from "../../../api/routes";
import { FaTrash } from "react-icons/fa";

// Slide data structure reference:
// {
//   _id,
//   heading,
//   text,
//   image: { web, mobile },
//   cta: { label, to },
//   extra: { schedule, location },
//   gradient,
//   textColor
// }

export default function Slides() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await requests.getSlides();
        setSlides(res?.data || res || []);
      } catch (e) {
        toast.error("Failed to load slides");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = slides.filter((s) => {
    if (!search) return true;
    return (
      s.heading?.toLowerCase().includes(search.toLowerCase()) ||
      s.text?.toLowerCase().includes(search.toLowerCase())
    );
  });

  async function remove(id) {
    if (!window.confirm("Delete this slide?")) return;
    try {
      await requests.deleteSlide(id);
      setSlides((prev) => prev.filter((s) => s._id !== id));
      toast.success("Slide deleted");
    } catch (e) {
      toast.error("Delete failed");
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex mb-3 gap-2">
        <input
          className="form-control"
          placeholder="Search slides..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() =>
            setModal(
              <SlideForm
                onClose={() => setModal(null)}
                onSave={(s) => setSlides((prev) => [s, ...prev])}
              />
            )
          }
        >
          Add Slide
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {!loading && !filtered.length && <div>No slides found.</div>}
      <div className="row g-3">
        {filtered.map((slide) => (
          <div key={slide._id} className="col-md-6">
            <div className="border rounded p-3 h-100 d-flex flex-column">
              <div className="d-flex justify-content-between">
                <h5>{slide.heading}</h5>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() =>
                      setModal(
                        <SlideForm
                          existing={slide}
                          onClose={() => setModal(null)}
                          onSave={(updated) =>
                            setSlides((prev) =>
                              prev.map((s) =>
                                s._id === updated._id ? updated : s
                              )
                            )
                          }
                        />
                      )
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => remove(slide._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <small className="text-muted">{slide.text}</small>
              <div className="mt-2">
                <strong>CTA:</strong> {slide.cta?.label} → {slide.cta?.to}
              </div>
              <div className="mt-1">
                <strong>Schedule:</strong> {slide.extra?.schedule || "-"}
              </div>
              <div className="mt-1">
                <strong>Location:</strong> {slide.extra?.location || "-"}
              </div>
              <div className="mt-2 d-flex gap-2">
                {slide.image?.web && (
                  <img
                    src={slide.image.web}
                    alt=""
                    style={{ width: 80, height: 50, objectFit: "cover" }}
                  />
                )}
                {slide.image?.mobile && (
                  <img
                    src={slide.image.mobile}
                    alt=""
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
                )}
              </div>
              <div className="mt-auto pt-2 small">
                <span className="badge text-bg-light">
                  Text Class: {slide.textColor || "default"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal}
    </div>
  );
}

function SlideForm({ existing, onClose, onSave }) {
  const [data, setData] = useState(
    () =>
      existing || {
        heading: "",
        text: "",
        image: { web: "", mobile: "" }, // Will hold File objects when user selects files
        cta: { label: "", to: "" },
        extra: { schedule: "", location: "" },
        gradient:
          "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
        textColor: "text-dark",
      }
  );
  const [saving, setSaving] = useState(false);

  function update(path, value) {
    setData((prev) => {
      const clone = structuredClone(prev);
      const segs = path.split(".");
      let ref = clone;
      for (let i = 0; i < segs.length - 1; i++) ref = ref[segs[i]];
      ref[segs[segs.length - 1]] = value;
      return clone;
    });
  }

  function preview(val) {
    if (!val) return "";
    if (val instanceof File) return URL.createObjectURL(val);
    return val; // assume string URL
  }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("heading", data.heading || "");
      formData.append("text", data.text || "");
      formData.append("gradient", data.gradient || "");
      formData.append("textColor", data.textColor || "");
      // CTA
      formData.append("cta[label]", data.cta.label || "");
      formData.append("cta[to]", data.cta.to || "");
      // Extra
      formData.append("extra[schedule]", data.extra.schedule || "");
      formData.append("extra[location]", data.extra.location || "");
      // Images - backend expects 'image' and 'mobileImage' as file field names
      if (data.image.web instanceof File) {
        formData.append("image", data.image.web); // main (web/desktop) image
      } else if (data.image.web) {
        formData.append("existingImage", data.image.web); // let backend retain if not replaced
      }
      if (data.image.mobile instanceof File) {
        formData.append("mobileImage", data.image.mobile); // mobile image
      } else if (data.image.mobile) {
        formData.append("existingMobileImage", data.image.mobile);
      }

      let res;
      if (existing?._id) {
        res = await requests.putSlide(existing._id, formData);
      } else {
        res = await requests.postSlide(formData);
      }
      const slide = res?.data || res;
      toast.success(existing ? "Slide updated" : "Slide created");
      onSave(slide);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-backdrop d-flex align-items-center justify-content-center">
      <div
        className="bg-white p-4 rounded shadow"
        style={{ maxWidth: 600, width: "100%" }}
      >
        <h5>{existing ? "Edit Slide" : "Add Slide"}</h5>
        <form onSubmit={submit} className="mt-3">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Heading</label>
              <input
                className="form-control"
                value={data.heading}
                onChange={(e) => update("heading", e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">CTA Label</label>
              <input
                className="form-control"
                value={data.cta.label}
                onChange={(e) => update("cta.label", e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Text</label>
              <textarea
                className="form-control"
                rows={3}
                value={data.text}
                onChange={(e) => update("text", e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">CTA URL</label>
              <input
                className="form-control"
                value={data.cta.to}
                onChange={(e) => update("cta.to", e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Schedule</label>
              <input
                className="form-control"
                value={data.extra.schedule}
                onChange={(e) => update("extra.schedule", e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Location</label>
              <input
                className="form-control"
                value={data.extra.location}
                onChange={(e) => update("extra.location", e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Gradient</label>
              <input
                className="form-control"
                value={data.gradient}
                onChange={(e) => update("gradient", e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Text Color Class</label>
              <input
                className="form-control"
                value={data.textColor}
                onChange={(e) => update("textColor", e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Web Image</label>
              <div className="d-flex flex-column gap-2">
                {preview(data.image.web) && (
                  <img
                    src={preview(data.image.web)}
                    alt="web preview"
                    style={{ width: 120, height: 70, objectFit: "cover" }}
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => update("image.web", e.target.files?.[0])}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Mobile Image</label>
              <div className="d-flex flex-column gap-2">
                {preview(data.image.mobile) && (
                  <img
                    src={preview(data.image.mobile)}
                    alt="mobile preview"
                    style={{ width: 90, height: 70, objectFit: "cover" }}
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => update("image.mobile", e.target.files?.[0])}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
          <p className="mt-3 small text-muted">
            If you don't select a new image, the existing one will be retained.
          </p>
        </form>
      </div>
    </div>
  );
}
