// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../api/axios";

// const OrderDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8000/DatabaseDesign/orders/${id}/`)
//       .then((response) => {
//         setOrder(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching order details:", error);
//       });
//   }, [id]);

//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this order?")) {
//       axios
//         .delete(`http://127.0.0.1:8000/DatabaseDesign/orders/${id}/`)
//         .then(() => {
//           alert("Order deleted successfully!");
//           navigate("/");
//         })
//         .catch((error) => {
//           console.error("Error deleting order:", error);
//         });
//     }
//   };

//   if (!order) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Order Details</h1>
//       <div className="bg-white shadow rounded p-4">
//         {Object.entries(order).map(([key, value]) => (
//           <p key={key}>
//             <strong>{key.replace(/_/g, " ")}:</strong> {value || "N/A"}
//           </p>
//         ))}
//       </div>
//       <div className="mt-4">
//         <button
//           onClick={() => navigate(`/orders/${id}/edit`)}
//           className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
//         >
//           Edit
//         </button>
//         <button
//           onClick={handleDelete}
//           className="bg-red-600 text-white px-4 py-2 rounded"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderDetail;







// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../api/axios";

// const OrderDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8000/DatabaseDesign/orders/${id}/`)
//       .then((response) => {
//         setOrder(response.data);
//         setFormData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching order details:", error);
//       });
//   }, [id]);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this inquiry?")) {
//       axios
//         .delete(`http://127.0.0.1:8000/DatabaseDesign/orders/${id}/`)
//         .then(() => {
//           alert("Order deleted successfully!");
//           navigate("/");
//         })
//         .catch((error) => {
//           console.error("Error deleting order:", error);
//         });
//     }
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     axios
//       .put(`http://127.0.0.1:8000/DatabaseDesign/orders/${id}/`, formData)
//       .then((response) => {
//         alert("order updated successfully!");
//         setorder(response.data);
//         setIsEditing(false);
//       })
//       .catch((error) => {
//         console.error("Error updating order:", error);
//       });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   if (!order) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Inquiry Details</h2>
//       <div className="bg-white p-4 rounded shadow">
//         {isEditing ? (
//           <form onSubmit={handleSave}>
//             {Object.keys(formData).map((field) => (
//               <div key={field} className="mb-4">
//                 <label className="block text-sm font-semibold mb-2">
//                   {field.replace(/_/g, " ")}
//                 </label>
//                 <input
//                   className="block w-full p-2 border rounded"
//                   type={typeof formData[field] === "number" ? "number" : "text"}
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             ))}
//             <button
//               type="submit"
//               className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//             >
//               Save
//             </button>
//           </form>
//         ) : (
//           <>
//             {Object.entries(order).map(([key, value]) => (
//               <p key={key}>
//                 <strong>{key.replace(/_/g, " ")}:</strong> {value || "N/A"}
//               </p>
//             ))}
//             <div className="mt-4">
//               <button
//                 onClick={handleEdit}
//                 className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 mr-2"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderDetail;





import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!id) {
      alert("Order ID is missing!");
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/DatabaseDesign/orders/${id}/`)
      .then((response) => {
        console.log("Order fetched:", response.data); // Debug
        setOrder(response.data);
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        alert("Failed to fetch order details.");
      });
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      axios
        .delete(`http://127.0.0.1:8000/DatabaseDesign/orders/${id}/`)
        .then(() => {
          alert("Order deleted successfully!");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting order:", error);
        });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/DatabaseDesign/orders/${id}/`, formData)
      .then((response) => {
        alert("Order updated successfully!");
        setOrder(response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating order:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (!order) {
    return <div>Loading order details...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
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
                  value={formData[field] || ""}
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
            {Object.entries(order).map(([key, value]) => (
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

export default OrderDetail;
