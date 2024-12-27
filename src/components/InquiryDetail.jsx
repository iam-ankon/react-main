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

  // Disable the Save button if no changes are made
  const isSaveDisabled = JSON.stringify(formData) === JSON.stringify(inquiry);

  return (
    <div className="max-w-4xl mx-auto    flex justify-center">
      <h2 className="text-3xl font-semibold text-center mb-6 ">
        Inquiry Details
      </h2>
      <div className="space-y-6  flex justify-center">
        {isEditing ? (
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(formData).map((field) => (
                <div key={field} className="flex flex-col">
                  <label
                    htmlFor={field}
                    className="text-sm font-medium text-gray-700 mb-2"
                  >
                    {field.replace(/_/g, " ")}
                  </label>
                  <input
                    className="input input-bordered w-full p-2 border rounded-md"
                    type={
                      typeof formData[field] === "number" ? "number" : "text"
                    }
                    name={field}
                    id={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className={`btn btn-primary w-full mt-6 ${
                isSaveDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSaveDisabled}
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="overflow-x-auto  flex justify-center">
            <div className="flex justify-center items-center min-h-screen">
              <div className="w-full max-w-4xl">
                <table className="w-full table-auto border-collapse border border-gray-200">
                  <thead>
                    <tr className="text-sm text-gray-600 bg-gray-100">
                      <th className="p-3 text-center border border-gray-300">
                        {" "}
                        {/* Centered header */}
                        Field
                      </th>
                      <th className="p-3 text-center border border-gray-300">
                        {" "}
                        {/* Centered header */}
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(inquiry).map(([key, value]) => (
                      <tr key={key} className="odd:bg-gray-50 text-center">
                        {" "}
                        {/* Center the entire row */}
                        <td className="p-4 text-sm font-semibold border border-gray-300">
                          {" "}
                          {/* Centered field */}
                          {key.replace(/_/g, " ")}
                        </td>
                        <td className="p-4 text-sm border border-gray-300">
                          {" "}
                          {value || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "12rem", marginTop: "10px" }}>
          <button
            onClick={handleEdit}
            style={{ backgroundColor: "blue", color: "white" }}
            className="px-4 py-2 rounded mr-4"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            style={{ backgroundColor: "red", color: "white" }}
            className="px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetail;

{
  /* <table className="w-full table-auto border-collapse border border-gray-200">
<thead>
  <tr className="text-sm text-gray-600 bg-gray-100">
    <th className="p-3 text-left border border-gray-300">
      Field
    </th>
    <th className="p-3 text-left border border-gray-300">
      Value
    </th>
  </tr>
</thead>
<tbody>
  {Object.entries(inquiry).map(([key, value]) => (
    <tr key={key} className="odd:bg-gray-50">
      <td className="p-4 text-sm font-semibold border border-gray-300">
        {key.replace(/_/g, " ")}
      </td>
      <td className="p-4 text-sm border border-gray-300">
        {value || "N/A"}
      </td>
    </tr>
  ))}
</tbody>
</table>
<div className="mt-6 flex justify-end space-x-4">
<button onClick={handleEdit} className="btn btn-warning">
  Edit
</button>
<button onClick={handleDelete} className="btn btn-error">
  Delete
</button>
</div> */
}
