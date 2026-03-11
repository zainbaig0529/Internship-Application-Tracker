import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "Applied",
  });

  const fetchApplications = async () => {
    const res = await axios.get("http://127.0.0.1:5000/applications");
    setApplications(res.data);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://127.0.0.1:5000/applications", form);

    setForm({
      company: "",
      position: "",
      status: "Applied",
    });

    fetchApplications();
  };

  const deleteApplication = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/applications/${id}`);
    fetchApplications();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://127.0.0.1:5000/applications/${id}`, {
      status: status,
    });

    fetchApplications();
  };

  return (
    <div style={{ padding: "30px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Internship Application Tracker</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          style={{ marginRight: "10px", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="text"
          placeholder="Position"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          style={{ marginRight: "10px", marginBottom: "10px", padding: "8px" }}
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          style={{ marginRight: "10px", marginBottom: "10px", padding: "8px" }}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>

        <button type="submit" style={{ padding: "8px 14px" }}>
          Add Application
        </button>
      </form>

      <h2>Applications</h2>

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        applications.map((app) => (
          <div
            key={app.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "12px",
            }}
          >
            <h3>{app.company}</h3>

            <p>
              <strong>Position:</strong> {app.position}
            </p>

            <select
              value={app.status}
              onChange={(e) => updateStatus(app.id, e.target.value)}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>

            <br />

            <button
              onClick={() => deleteApplication(app.id)}
              style={{
                marginTop: "10px",
                background: "#ff4d4d",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;