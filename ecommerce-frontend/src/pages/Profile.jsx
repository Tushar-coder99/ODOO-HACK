import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api';

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      const fetchOrders = async () => {
        try {
          const res = await fetch(`${API_URL}/orders/myorders/${userInfo._id}`);
          const data = await res.json();
          setOrders(data);
        } catch (error) { console.error(error); }
      };
      fetchOrders();
    }
  }, [navigate, userInfo]);

  return (
    <div className="section" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 className="section-title">My Profile</h2>
      <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
        <h3>User Details</h3>
        <p><strong>Name:</strong> {userInfo?.name}</p>
        <p><strong>Email:</strong> {userInfo?.email}</p>
      </div>

      <h3>My Orders</h3>
      {orders.length === 0 ? <p>No orders found.</p> : (
        <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          {orders.map((order) => (
            <div key={order._id} style={{ border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Order ID: <span style={{fontSize:'0.8rem', color:'#64748b'}}>#{order._id}</span></span>
                
                {/* NEW: Display Delivery Status */}
                <div>
                    <span style={{ marginRight: '10px', fontWeight: 'bold', color: order.isDelivered ? 'green' : 'orange' }}>
                        {order.isDelivered ? 'Delivered' : 'Processing'}
                    </span>
                    <span style={{ color: 'green', fontWeight:'bold' }}>${order.totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {order.orderItems.map((item) => (
                   <div key={item.product} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f1f5f9', padding: '5px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                     <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                     <div><p style={{ fontSize: '0.9rem', fontWeight: '500', margin: 0 }}>{item.name}</p></div>
                   </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Profile;
