import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function App() {
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "Applied",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

  const stats = useMemo(() => {
    return {
      total: applications.length,
      applied: applications.filter((app) => app.status === "Applied").length,
      interview: applications.filter((app) => app.status === "Interview").length,
      rejected: applications.filter((app) => app.status === "Rejected").length,
      offer: applications.filter((app) => app.status === "Offer").length,
    };
  }, [applications]);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>
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

      <h2>Dashboard</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Total</h3>
          <p style={cardNumberStyle}>{stats.total}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Applied</h3>
          <p style={cardNumberStyle}>{stats.applied}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Interview</h3>
          <p style={cardNumberStyle}>{stats.interview}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Rejected</h3>
          <p style={cardNumberStyle}>{stats.rejected}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Offer</h3>
          <p style={cardNumberStyle}>{stats.offer}</p>
        </div>
      </div>

      <h2>Search & Filter</h2>

      <div style={{ marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Search by company or position"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            marginRight: "10px",
            marginBottom: "10px",
            padding: "8px",
            width: "260px",
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>
      </div>

      <h2>Applications</h2>

      {filteredApplications.length === 0 ? (
        <p>No matching applications found.</p>
      ) : (
        filteredApplications.map((app) => (
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

            <p>
              <strong>Status:</strong>
            </p>

            <select
              value={app.status}
              onChange={(e) => updateStatus(app.id, e.target.value)}
              style={{ marginBottom: "10px", padding: "6px" }}
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
                marginTop: "8px",
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

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "16px",
  textAlign: "center",
  backgroundColor: "#f8f8f8",
};

const cardTitleStyle = {
  margin: "0 0 8px 0",
  fontSize: "16px",
};

const cardNumberStyle = {
  margin: 0,
  fontSize: "24px",
  fontWeight: "bold",
};

export default App;