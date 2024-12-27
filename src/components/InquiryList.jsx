import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const InquiryList = () => {
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/InquiryDatabase/inquiries/")
      .then((response) => {
        setInquiries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inquiries:", error);
      });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/inquiries/${id}`);
  };

  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <table
        className="table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            {[
              "Inquiries id",
              "Request QTY",
              "Buyer Name",
              "Supplier Name",
              "Proposed Shipment Date",
              "Inquery Received Date",
            ].map((header, index) => (
              <th
                key={index}
                style={{
                  padding: "1vw 2vw", // Responsive padding (viewport-based units)
                  textAlign: "left", // Align text to the left
                  border: "1px solid #ccc",
                }}
              >
                {header}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className="inquiry-card cursor-pointer"
            onClick={() => handleCardClick(inquiry.id)}
          >
            <h3>{inquiry.inquiry_no}</h3>
            <p>
              <strong>Buyer:</strong> {inquiry.buyer_name}
            </p>
            <p>
              <strong>Supplier:</strong> {inquiry.supplier_name}
            </p>
            <p>
              <strong>Shipment Date:</strong> {inquiry.proposed_shipment_date}
            </p>
          </div>
        ))} */}
          {inquiries.map((inquiry, rowIndex) => (
            <tr
              key={rowIndex}
              className="inquiry-card cursor-pointer"
              onClick={() => handleCardClick(inquiry.id)}
            >
              <td
                style={{
                  padding: "1vw 2vw", // Match padding with <th>
                  border: "1px solid #ccc",
                }}
              >
                <div className="font-bold">{inquiry.inquiry_no}</div>
              </td>

              <td style={{ padding: "1vw 2vw", border: "1px solid #ccc" }}>
                {inquiry.request_qty}
              </td>
              <td style={{ padding: "1vw 2vw", border: "1px solid #ccc" }}>
                {inquiry.buyer_name}
              </td>
              <td style={{ padding: "1vw 2vw", border: "1px solid #ccc" }}>
                {inquiry.supplier_name}
              </td>
              <td style={{ padding: "1vw 2vw", border: "1px solid #ccc" }}>
                {inquiry.proposed_shipment_date}
              </td>
              <td style={{ padding: "1vw 2vw", border: "1px solid #ccc" }}>
                {inquiry.inquiry_received_date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InquiryList;
