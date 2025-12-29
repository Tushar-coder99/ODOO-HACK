import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api'; // IMPORT API URL

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    card: ''
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo) {
        alert('Please login to place an order');
        navigate('/login');
        return;
    }

    const orderData = {
        orderItems: cart.map(item => ({
            product: item._id, 
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity
        })),
        shippingAddress: formData.address,
        totalPrice: total,
        user: userInfo._id
    };

    try {
        // Updated fetch to use API_URL
        const res = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });

        if (res.ok) {
            alert('Payment Successful! Order Saved.');
            clearCart();
            navigate('/profile');
        } else {
            const data = await res.json();
            alert(`Order Failed: ${data.message || 'Unknown Error'}`);
        }
    } catch (error) {
        console.error("Order Error:", error);
        alert('Network Error while placing order');
    }
  };

  if (cart.length === 0) return <h2 style={{textAlign:'center', marginTop:'50px'}}>Cart is Empty</h2>;

  return (
    <div className="section" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="section-title">Checkout</h2>
      <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Order Summary: ${total.toFixed(2)}</h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            required 
            onChange={handleChange}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e1' }}
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            required 
            onChange={handleChange}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e1' }}
          />
          <textarea 
            name="address" 
            placeholder="Shipping Address" 
            required 
            onChange={handleChange}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e1', minHeight: '80px' }}
          />
          <input 
            type="text" 
            name="card" 
            placeholder="Card Number (Fake: 1234 5678 9000)" 
            required 
            onChange={handleChange}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e1' }}
          />
          
          <button className="btn" type="submit" style={{ marginTop: '1rem' }}>Pay Now</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
