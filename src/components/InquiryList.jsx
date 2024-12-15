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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Inquiries</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inquiries.map((inquiry) => (
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
        ))}
      </div>
    </div>
  );
};

export default InquiryList;
