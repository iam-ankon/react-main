


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const InquiryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/InquiryDatabase/inquiries/${id}/`)
      .then((response) => {
        setInquiry(response.data);
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inquiry details:", error);
      });
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      axios
        .delete(`http://127.0.0.1:8000/InquiryDatabase/inquiries/${id}/`)
        .then(() => {
          alert("Inquiry deleted successfully!");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting inquiry:", error);
        });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/InquiryDatabase/inquiries/${id}/`, formData)
      .then((response) => {
        alert("Inquiry updated successfully!");
        setInquiry(response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating inquiry:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (!inquiry) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Inquiry Details</h2>
      <div className="bg-white p-4 rounded shadow">
        {isEditing ? (
          <form onSubmit={handleSave}>
            {Object.keys(formData).map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  {field.replace(/_/g, " ")}
                </label>
                <input
                  className="block w-full p-2 border rounded"
                  type={typeof formData[field] === "number" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </form>
        ) : (
          <>
            {Object.entries(inquiry).map(([key, value]) => (
              <p key={key}>
                <strong>{key.replace(/_/g, " ")}:</strong> {value || "N/A"}
              </p>
            ))}
            <div className="mt-4">
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InquiryDetail;
