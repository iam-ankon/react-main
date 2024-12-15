import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const OrderForm = () => {
  const { id } = useParams(); // For editing existing order
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const isEditing = Boolean(id);

  // Initialize form data with default values
  const initializeFormData = () => {
    return {
      supplier_name: "",
      buyer_name: "",
      master_order_no: "",
      image: null,
      customer: "",
      order_no: "",
      description: "",
      items: 0,
      total_value: "",
      shipped: false,
      value: "",
      qty: 0,
      shipment_date: "",
      season_year: "",
      ref_no: "",
      factory_shipment: "",
      remarks: "",
      garment: "",
      fabrication: "",
      fabric_weight: "",
      wash_description: "",
      genders: "",
      color: "",
      unit_price: "",
      size_range: "",
      selling_price: "",
      price_in_dz: "",
      commission: "",
      department: "",
      purchase_order_received_date: "",
      tech_receive_date: "",
      lc_received_date: "",
      pi_sent_date: "",
      cargo_handover_date: "",
      current_status: "",
      ic_issue_date: "",
      commission_received_date: "",
      invoice_no: "",
      shipped_by: "",
      processed_by: "",
      discount: "",
      shipped_qty: 0,
      invoice_amount: "",
      final_inspection_date: "",
      ex_factory_date: "",
      etd_date: "",
      eta_date: "",
      remarks_2: "",
      no_of_catron: "",
      remarks_3: "",
      leadtime: "",
      line_allocation: "",
      line_name: "",
      wgr: "",
      input: "",
      output: "",
    };
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form data:", formData);

      const response = await axios.post(
        "http://127.0.0.1:8000/DatabaseDesign/orders/",
        formData
      );
      console.log("Response from server:", response.data);
      alert("Inquiry added successfully!");

      onInquiryAdded(response.data);
      setFormData({
        supplier_name: "",
        buyer_name: "",
        master_order_no: "",
        image: null,
        customer: "",
        order_no: "",
        description: "",
        items: 0,
        total_value: "",
        shipped: false,
        value: "",
        qty: 0,
        shipment_date: "",
        season_year: "",
        ref_no: "",
        factory_shipment: "",
        remarks: "",
        garment: "",
        fabrication: "",
        fabric_weight: "",
        wash_description: "",
        genders: "",
        color: "",
        unit_price: "",
        size_range: "",
        selling_price: "",
        price_in_dz: "",
        commission: "",
        department: "",
        purchase_order_received_date: "",
        tech_receive_date: "",
        lc_received_date: "",
        pi_sent_date: "",
        cargo_handover_date: "",
        current_status: "",
        ic_issue_date: "",
        commission_received_date: "",
        invoice_no: "",
        shipped_by: "",
        processed_by: "",
        discount: "",
        shipped_qty: 0,
        invoice_amount: "",
        final_inspection_date: "",
        ex_factory_date: "",
        etd_date: "",
        eta_date: "",
        remarks_2: "",
        no_of_catron: "",
        remarks_3: "",
        leadtime: "",
        line_allocation: "",
        line_name: "",
        wgr: "",
        input: "",
        output: "",
      });
    } catch (error) {
      console.error("Error creating inquiry:", error);
      alert("Failed to add inquiry. Please check console for details.");
    }
  };



  // Fetch order data if editing
  useEffect(() => {
    if (isEditing) {
      axios
        .get(`http://127.0.0.1:8000/DatabaseDesign/orders/${id}/`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching order:", error);
        });
    } else {
      setFormData(initializeFormData());
    }
  }, [id, isEditing]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const requestData = new FormData();
  //   Object.entries(formData).forEach(([key, value]) => {
  //     requestData.append(key, value);
  //   });

  //   const request = isEditing
  //     ? axios.put(`http://127.0.0.1:8000/DatabaseDesign/orders/${id}/`, requestData, {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       })
  //     : axios.post(`http://127.0.0.1:8000/DatabaseDesign/orders/`, requestData, {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       });

  //   request
  //     .then(() => {
  //       alert(`Order ${isEditing ? "updated" : "created"} successfully!`);
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.error("Error saving order:", error.response ? error.response.data : error.message);
  //     });
  // };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {isEditing ? "Edit Order" : "Create Order"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {Object.keys(initializeFormData()).map((field) => {
          if (field === "image") {
            return (
              <div key={field}>
                <label className="block text-sm font-semibold mb-1">Upload Image</label>
                <input
                  type="file"
                  name={field}
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            );
          }
          if (field === "shipped") {
            return (
              <div key={field}>
                <label className="block text-sm font-semibold mb-1">{field.replace(/_/g, " ")}</label>
                <input
                  type="checkbox"
                  name={field}
                  checked={formData[field] || false}
                  onChange={handleChange}
                  className="p-2"
                />
              </div>
            );
          }
          if (field.includes("date")) {
            return (
              <div key={field}>
                <label className="block text-sm font-semibold mb-1">{field.replace(/_/g, " ")}</label>
                <input
                  type="date"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            );
          }
          return (
            <div key={field}>
              <label className="block text-sm font-semibold mb-1">{field.replace(/_/g, " ")}</label>
              <input
                type="text"
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          );
        })}
        <button
          type="submit"
          className="col-span-1 md:col-span-2 lg:col-span-3 bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
