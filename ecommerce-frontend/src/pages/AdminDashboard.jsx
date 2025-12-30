import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');

  const [newProduct, setNewProduct] = useState({
    name: '', price: '', category: '', image: '', description: ''
  });

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/');
    } else {
      fetchProducts();
      fetchOrders();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        setProducts(data);
    } catch (error) { console.error(error); }
  };

  const fetchOrders = async () => {
    try {
        const res = await fetch(`${API_URL}/orders`);
        const data = await res.json();
        setOrders(data);
    } catch (error) { console.error(error); }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Delete product?')) {
        await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
        fetchProducts(); 
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
    });
    alert('Product Created!');
    setNewProduct({ name: '', price: '', category: '', image: '', description: '' }); 
    fetchProducts();
  };

  // NEW: Handler to mark as Delivered
  const handleMarkDelivered = async (orderId) => {
    if (window.confirm('Mark this order as Delivered?')) {
        try {
            await fetch(`${API_URL}/orders/${orderId}/deliver`, { method: 'PUT' });
            fetchOrders(); // Refresh list to show new status
        } catch (error) {
            alert('Error updating order');
        }
    }
  };

  return (
    <div className="section" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h2 className="section-title">Admin Dashboard</h2>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button className="btn" onClick={() => setActiveTab('products')} style={{ background: activeTab === 'products' ? 'var(--primary)' : '#cbd5e1' }}>Manage Products</button>
        <button className="btn" onClick={() => setActiveTab('orders')} style={{ background: activeTab === 'orders' ? 'var(--primary)' : '#cbd5e1' }}>All Orders</button>
      </div>

      {activeTab === 'products' && (
        <div>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
                <h3 style={{marginBottom: '1rem'}}>Add New Product</h3>
                <form onSubmit={handleCreateProduct} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input type="text" placeholder="Name" required value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} style={{ padding: '10px' }} />
                    <input type="number" placeholder="Price" required value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} style={{ padding: '10px' }} />
                    <input type="text" placeholder="Category" required value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} style={{ padding: '10px' }} />
                    <input type="text" placeholder="Image URL" required value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} style={{ padding: '10px' }} />
                    <textarea placeholder="Description" required value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} style={{ gridColumn: 'span 2', padding: '10px' }} />
                    <button className="btn" type="submit" style={{ gridColumn: 'span 2' }}>Create Product</button>
                </form>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead>
                        <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
                            <th style={{ padding: '12px' }}>NAME</th>
                            <th style={{ padding: '12px' }}>PRICE</th>
                            <th style={{ padding: '12px' }}>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '12px' }}>{product.name}</td>
                                <td style={{ padding: '12px' }}>${product.price}</td>
                                <td style={{ padding: '12px' }}>
                                    <button onClick={() => handleDeleteProduct(product._id)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>DELETE</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}

      {/* UPDATED ORDERS TAB */}
      {activeTab === 'orders' && (
        <div>
            <h3 style={{marginBottom: '1rem'}}>Customer Orders ({orders.length})</h3>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                        <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
                            <th style={{ padding: '12px' }}>ID</th>
                            <th style={{ padding: '12px' }}>USER</th>
                            <th style={{ padding: '12px' }}>TOTAL</th>
                            <th style={{ padding: '12px' }}>STATUS</th>
                            <th style={{ padding: '12px' }}>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '12px', fontSize: '0.85rem' }}>{order._id}</td>
                                <td style={{ padding: '12px' }}>{order.user?.name || 'Unknown'}</td>
                                <td style={{ padding: '12px', fontWeight: 'bold' }}>${order.totalPrice.toFixed(2)}</td>
                                <td style={{ padding: '12px' }}>
                                    {order.isDelivered ? (
                                        <span style={{ color: 'green', fontWeight:'bold' }}>Delivered</span>
                                    ) : (
                                        <span style={{ color: 'orange', fontWeight:'bold' }}>Processing</span>
                                    )}
                                </td>
                                <td style={{ padding: '12px' }}>
                                    {!order.isDelivered && (
                                        <button 
                                            onClick={() => handleMarkDelivered(order._id)}
                                            style={{ background: '#2563eb', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                                        >
                                            Mark Delivered
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
