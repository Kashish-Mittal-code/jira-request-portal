import "./App.css";
import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requestType: "",
    pageName: "",
    pageType: "",
    contentDetails: "",
    goLiveDate: "",
    priority: "",
    notes: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [ticketUrl, setTicketUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.requestType ||
      !formData.pageName
    ) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("Backend Response:", data);

      if (data.success) {
  setSuccessMessage(
    `✅ Jira Ticket Created Successfully! Ticket ID: ${data.issue}`
  );

  setTicketUrl(data.url);

        setFormData({
          name: "",
          email: "",
          requestType: "",
          pageName: "",
          pageType: "",
          contentDetails: "",
          goLiveDate: "",
          priority: "",
          notes: "",
        });
      } else {
        setErrorMessage("❌ Failed to create Jira Ticket.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("❌ Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          background: "#fff",
          padding: "35px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <div className="header">
          <h1>Website Request Portal</h1>
          <p>Create and manage website requests efficiently</p>
        </div>

        <div className="stats">
          <div className="stat-card">🚀 Fast Delivery</div>
          <div className="stat-card">📋 Jira Ready</div>
          <div className="stat-card">🎯 Easy Tracking</div>
        </div>

       {successMessage && (
  <div
    style={{
      background: "#d4edda",
      color: "#155724",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "15px",
      textAlign: "center",
      fontWeight: "600",
    }}
  >
    {successMessage}

    {ticketUrl && (
      <div style={{ marginTop: "8px" }}>
        <a
          href={ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#0052CC",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          🔗 Open Jira Ticket
        </a>
      </div>
    )}
  </div>
)}
        {errorMessage && (
          <div
            style={{
              background: "#f8d7da",
              color: "#721c24",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "15px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Request Type</label>
            <select
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select Request Type</option>
              <option value="New Page">New Page</option>
              <option value="Content Update">Content Update</option>
              <option value="Bug Fix">Bug Fix</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Page Name</label>
            <input
              type="text"
              name="pageName"
              value={formData.pageName}
              onChange={handleChange}
              placeholder="Enter page name"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Page Type</label>
            <select
              name="pageType"
              value={formData.pageType}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select Page Type</option>
              <option value="Landing Page">Landing Page</option>
              <option value="Product Page">Product Page</option>
              <option value="Blog Page">Blog Page</option>
              <option value="Documentation">Documentation</option>
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Content Details</label>
            <textarea
              name="contentDetails"
              value={formData.contentDetails}
              onChange={handleChange}
              rows="5"
              placeholder="Describe your requirements..."
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Go Live Date</label>
            <input
              type="date"
              name="goLiveDate"
              value={formData.goLiveDate}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label>Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Any extra details..."
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: loading ? "#6c757d" : "#0052CC",
              color: "#fff",
              border: "none",
              padding: "14px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating Jira Ticket..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "6px",
  border: "1px solid #dfe1e6",
  borderRadius: "8px",
  fontSize: "14px",
  boxSizing: "border-box",
};