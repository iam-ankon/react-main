

import React, { useState } from "react";
import axios from "../api/axios";

const InquiryForm = ({ onInquiryAdded }) => {
  const [formData, setFormData] = useState({
    inquiry_no: "",
    request_qty: 0,
    proposed_shipment_date: "",
    inquiry_received_date: "",
    buyer_name: "",
    supplier_name: "",
    proposed_supplier_name: "",
    fob_in_pcs: 0,
    fob_in_dz: 0,
    fabric_1_unit_price: 0,
    fabric_2_unit_price: 0,
    fabric_3_unit_price: 0,
    total_accessories_price: 0,
    consumption: 0,
    print_cost: 0,
    wash_cost: 0,
    emb_cost: 0,
    others_cost: 0,
    commission: 0,
    commercial_cost: 0,
    test_cost: 0,
    zipper_cost: 0,
    thread_cost: 0,
    label_cost: 0,
    hangtag_cost: 0,
    care_label_cost: 0,
    addition_label_cost: 0,
    button_cost: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form data:", formData);

      const response = await axios.post(
        "http://127.0.0.1:8000/InquiryDatabase/inquiries/",
        formData
      );
      console.log("Response from server:", response.data);
      alert("Inquiry added successfully!");

      onInquiryAdded(response.data);
      setFormData({
        inquiry_no: "",
        request_qty: 0,
        proposed_shipment_date: "",
        inquiry_received_date: "",
        buyer_name: "",
        supplier_name: "",
        proposed_supplier_name: "",
        fob_in_pcs: 0,
        fob_in_dz: 0,
        fabric_1_unit_price: 0,
        fabric_2_unit_price: 0,
        fabric_3_unit_price: 0,
        total_accessories_price: 0,
        consumption: 0,
        print_cost: 0,
        wash_cost: 0,
        emb_cost: 0,
        others_cost: 0,
        commission: 0,
        commercial_cost: 0,
        test_cost: 0,
        zipper_cost: 0,
        thread_cost: 0,
        label_cost: 0,
        hangtag_cost: 0,
        care_label_cost: 0,
        addition_label_cost: 0,
        button_cost: 0,
      });
    } catch (error) {
      console.error("Error creating inquiry:", error);
      alert("Failed to add inquiry. Please check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add Inquiry</h2>
      {Object.keys(formData).map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            {field.replace(/_/g, " ")}
          </label>
          <input
              className="block w-full p-2 mb-4 border rounded"
              type={
                field.includes("date")
                  ? "date"
                  : typeof formData[field] === "number"
                  ? "number"
                  : "text"
              }
              name={field}
              placeholder={field.replace(/_/g, " ")}
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
        Add Inquiry
      </button>
    </form>
  );
};

export default InquiryForm;
