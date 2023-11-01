import React, { useState } from 'react';

function CategoryCreationForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { token } = JSON.parse(localStorage.getItem('user')) || {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryCreation = async () => {
    try {
      const response = await fetch('/api/category/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        console.log('Category created successfully');
        setSuccessMessage('Category created successfully'); 
        setFormData({ name: '', description: '' }); 
      } else if (response.status === 400) {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      } else {
        console.error('Category creation failed');
        setErrorMessage('An error occurred while creating the category.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while creating the category.');
    }
  };

  return (
    <div>
      <h2>Create a Category</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name} // Bind the input value to the state
        onChange={handleInputChange}
      />
      <label>Description:</label>
      <input
        type="text"
        name="description"
        value={formData.description} // Bind the input value to the state
        onChange={handleInputChange}
      />
      <button onClick={handleCategoryCreation}>Create Category</button>
    </div>
  );
}

export default CategoryCreationForm;
