import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart } = useCart();

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="section" style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h2>Your cart is empty</h2>
                <Link to="/products">
                    <button className="btn" style={{ marginTop: '1rem' }}>Start Shopping</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="section" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Shopping Cart</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item._id} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                            <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.1rem' }}>{item.name}</h3>
                                <p style={{ color: '#64748b' }}>Quantity: {item.quantity}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                                    <span style={{ fontWeight: 'bold' }}>${item.price}</span>
                                    {/* Updated to use _id */}
                                    <button onClick={() => removeFromCart(item._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary" style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Order Summary</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', paddingTop: '1rem' }}>
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <Link to="/checkout">
                        <button className="btn" style={{ width: '100%', marginTop: '1.5rem' }}>Proceed to Checkout</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
