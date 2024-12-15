// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "../api/axios";

// const OrderList = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/DatabaseDesign/orders/")
//       .then((response) => {
//         setOrders(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching orders:", error);
//       });
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Orders</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {orders.map((order) => (
//           <div key={order.id} className="border rounded shadow p-4">
//             <h2 className="text-xl font-semibold mb-2">
//               {order.master_order_no}
//             </h2>
//             <p>
//               <strong>Supplier:</strong> {order.supplier_name}
//             </p>
//             <p>
//               <strong>Buyer:</strong> {order.buyer_name}
//             </p>
//             <Link
//               to={`/order/${order.id}`}
//               className="text-blue-500 underline mt-2 block"
//             >
//               View Details
//             </Link>
//           </div>
//         ))}
//       </div>
//       <Link
//         to="/orders/new"
//         className="bg-green-500 text-white px-4 py-2 rounded mt-4 inline-block"
//       >
//         Create New Order
//       </Link>
//     </div>
//   );
// };

// export default OrderList;





import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/DatabaseDesign/orders/")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/orders/${id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="inquiry-card cursor-pointer"
            onClick={() => handleCardClick(order.id)}
          >
            <h2 className="text-xl font-semibold mb-2">
              {order.master_order_no}
            </h2>
            <p>
              <strong>Supplier:</strong> {order.supplier_name}
            </p>
            <p>
              <strong>Buyer:</strong> {order.buyer_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
