// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { removeFromCart } from './cartSlice.js'; // Make sure to provide the correct path.

// const Cart = ({ cartItems }) => { 
//     const dispatch = useDispatch();

//     const handleRemoveFromCart = (productId) => {
//         dispatch(removeFromCart({ id: productId }));
//     }

//     return (
//         <div>
//             <h2>Your Cart</h2>
//             {cartItems.map(item => (
//                 <div key={item.id}>
//                     <span>{item.name}</span>
//                     <span>{item.price}</span>
//                     <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Cart;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./cart.css";

const calculatePrice = (quantity) => {
  const basePrice = 25;
  const pricePerUnit = 25;
  return basePrice + (pricePerUnit * quantity);
};

const Cart = () => {
  const [isCheckoutClicked, setIsCheckoutClicked] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Crocin 650",
      price: "25/-",
      quantity: 1,
    },
    {
      id: 2,
      name: "T-Bact 5gm",
      price: "75/-",
      quantity: 1,
    },

  ]);

  const handleCheckout = () => {
    setIsCheckoutClicked(true);
  };

  const handleIncrement = (itemId) => {
    const newQuantity = cartItems.find((item) => item.id === itemId).quantity + 1;
    const newPrice = calculatePrice(newQuantity);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity, price: newPrice } : item
      )
    );
  };

  const handleDecrement = (itemId) => {
    const newQuantity = cartItems.find((item) => item.id === itemId).quantity - 1;
    const newPrice = calculatePrice(newQuantity);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity, price: newPrice } : item
      )
    );
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="item-details">
              <span className="item-name">{item.name}</span>
              <span className="item-price">{item.price}</span>
            </div>
            <div className="item-quantity">
              <button onClick={() => handleIncrement(item.id)}>+</button>
              <span className="quantity">{item.quantity}</span>
              <button onClick={() => handleDecrement(item.id)}>-</button>
            </div>
          </li>
        ))}
      </ul>

      {isCheckoutClicked ? (
        <Link to="/payment">
          <button className="checkout-btn">Proceed to Payment</button>
        </Link>
      ) : (
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;








