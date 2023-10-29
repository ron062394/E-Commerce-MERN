import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ProductList from '../components/ProductList';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';

function ProductPage() {
  const { id } = useParams();
  const { cart, dispatch } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const {user} = useAuthContext();


  useEffect(() => {
    fetch(`/api/product/get/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setStock(data.stock);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      if (!product) {
        alert('Product data is still loading. Please wait.');
        return;
      }

      const productId = id;

      if (quantity > stock) {
        alert('Order quantity exceeds available stock.');
        return;
      }

      const requestData = {
        productId,
        quantity: quantity,
      };

      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 200) {
        alert('Product added to the cart successfully');
        dispatch({ type: 'ADD_TO_CART', product: product });
        navigate('/shopping-cart'); // Redirect to "/shopping-cart"
      } else {
        alert('Failed to add the product to the cart');
      }
    } catch (error) {
      console.error('Error adding the product to the cart:', error);
    }
  };

  return (
    <div>
      {product ? (
        <div className='product-page'>
          <div className='product-page-container'>
            <img className='cart-image' src={product.images[0]} alt={product.title} />
              <div>
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                  <p className="price">${product.price.toFixed(2)}</p>
                  <p>Stock: {stock}</p>
                  <p>Sold: {product.quantitySold}</p> 
                  <p>Rating: {product.averageRating}</p> 
                  <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      max={stock}
                  />
          <button onClick={handleAddToCart}>Add to Cart</button>
              </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <ProductList/>
    </div>
  );
}

export default ProductPage;
