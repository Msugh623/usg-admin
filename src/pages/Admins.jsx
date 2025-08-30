import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../../api/api";

const ADMIN_FILE = "/admin.txt";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const superAdmin = ["msugh@gmail.com", "osazee.isonarae@gmail.com"];

  useEffect(() => {
    async function fetchAdmins() {
      setIsLoading(true);
      try {
        const res = await api.get("/auth/admin-emails");
        setAdmins(res.data.emails);
      } catch (error) {
        toast.error("Failed to load admin emails");
      } finally {
        setIsLoading(false);
      }
    }
    fetchAdmins();
  }, []);

  async function addAdmin(e) {
    e.preventDefault();
    if (!newEmail || !newEmail.includes("@")) {
      toast.error("Enter a valid email");
      return;
    }
    if (admins.includes(newEmail)) {
      toast.error("Email already exists");
      return;
    }
    setIsLoading(true);
    try {
      // Call backend to set isAdmin: true for the user with this email
      const res = await api.post("/auth/make-admin", { email: newEmail });
      toast.success("Admin privileges granted");
      setAdmins((prev) => [...prev, newEmail]);
      setNewEmail("");
    } catch (error) {
      toast.error("Failed to add admin");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container py-4">
      <h2>Admin Management</h2>
      <form className="mb-4 d-flex" onSubmit={addAdmin}>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Enter admin email"
          className="form-control me-2"
          required
        />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Add Admin
        </button>
      </form>
      <h5>Allowed Admin Emails:</h5>
      <ul className="list-group">
        {admins.map((email) => (
          <li
            key={email}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{email}</span>
            <button
              className="btn btn-danger btn-sm"
              disabled={isLoading}
              onClick={async () => {
                if (!window.confirm(`Remove admin privileges from ${email}?`))
                  return;
                setIsLoading(true);
                if (superAdmin.includes(email)) {
                  toast.error("Cannot remove super admin");
                  setIsLoading(false);
                  return;
                }
                try {
                  await api.post("/auth/remove-admin", { email });
                  setAdmins((prev) => prev.filter((e) => e !== email));
                  toast.success("Admin privileges removed");
                } catch (error) {
                  toast.error("Failed to remove admin");
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              Remove
            </button>
          </li>
        ))}
        {!admins.length && (
          <li className="list-group-item">No admins found.</li>
        )}
      </ul>
    </div>
  );
};

export default Admins;
