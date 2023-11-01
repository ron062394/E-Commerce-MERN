import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products from the API
    fetch('/api/product/list')
      .then((response) => response.json())
      .then((data) => {
        // Select the last 20 items
        const last20Products = data.slice(-20);
        setProducts(last20Products);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div className='section-title'>
        <span className='span-divider'></span>
          Discover what's new!
        <span className='span-divider'></span>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <div className='product-container'>
              <img src={product.images[0]} alt={product.title} />
              <div className="title-container">
                <h3>{product.title}</h3>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </div>
            <Link to={`/product/${product._id}`}>Add to Cart</Link>
          </div>
        )).reverse()}
      </div>
    </div>
  );
}

export default ProductList;
