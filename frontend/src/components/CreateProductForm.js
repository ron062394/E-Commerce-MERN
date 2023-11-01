import React, { useState, useEffect } from 'react';

function ProductPostingForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    stock: 0, // Include the stock field
    images: [''],
    categoryId: '', // The selected category ID
    tags: [],
  });
  const [categories, setCategories] = useState([]); // To store categories

  useEffect(() => {
    // Fetch categories when the component mounts
    fetch('/api/category/all')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the JWT token from local storage
      const token = localStorage.getItem('token');
      
      // Send a POST request to your backend API to create the product with the JWT token
      const response = await fetch('/api/product/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the JWT token in the header
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Product created successfully
        console.log('Product created successfully');
        // Reset the form or perform any other actions
        setFormData({
          title: '',
          description: '',
          price: 0,
          stock: 0, // Reset the stock field
          images: [''],
          categoryId: '',
          tags: [],
        });
      } else if (response.status === 403) {
        // Handle permission denied (seller role required)
        console.error('Permission denied');
      } else {
        // Handle other errors
        console.error('Product creation failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='create-listing-form'>
      <h4>Create a listing</h4>
      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Stock: {/* Add the stock field input */}
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Images (comma-separated URLs):
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Category:
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tags (comma-separated):
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
}

export default ProductPostingForm;
