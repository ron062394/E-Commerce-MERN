import React, { useState } from 'react';

function ShippingInfo({ onShippingChange }) {
  const [shippingData, setShippingData] = useState({
    name: '',
    contactNumber: '', // Add contactNumber field
    address: '',
    city: '',
    postalCode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedShippingData = { ...shippingData, [name]: value };
    setShippingData(updatedShippingData);
    onShippingChange(updatedShippingData); // Notify the parent component of changes
  };

  return (
    <div>
      <h2>Shipping Information</h2>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={shippingData.name}
        onChange={handleInputChange}
      />
      <label>Contact Number:</label>
      <input
        type="text"
        name="contactNumber"
        placeholder="Contact Number"
        value={shippingData.contactNumber}
        onChange={handleInputChange}
      />
      <label>Address:</label>
      <input
        type="text"
        name="address"
        placeholder="Shipping Address"
        value={shippingData.address}
        onChange={handleInputChange}
      />
      <label>City:</label>
      <input
        type="text"
        name="city"
        placeholder="City"
        value={shippingData.city}
        onChange={handleInputChange}
      />
      <label>Postal Code:</label>
      <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={shippingData.postalCode}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default ShippingInfo;
