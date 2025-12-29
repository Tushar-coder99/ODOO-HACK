import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Package, Search, ShieldCheck } from 'lucide-react'; // Added ShieldCheck icon for Admin
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState('');
  
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!location.pathname.startsWith('/search')) {
      setKeyword('');
    }
  }, [location.pathname]);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    window.location.reload();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">SHOPMATE.</Link>

      {/* Search Bar */}
      <form onSubmit={submitHandler} style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', padding: '5px 15px', borderRadius: '50px', width: '30%' }}>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem' }}
        />
        <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Search size={18} color="#64748b" />
        </button>
      </form>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">All Products</Link></li>
        <li>
          <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ShoppingCart size={20} /> 
            {cart.length > 0 && <span style={{ background: 'red', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '0.7rem' }}>{cart.length}</span>}
          </Link>
        </li>
        
        {userInfo ? (
           <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
             
             {/* Admin Link (Only visible if isAdmin is true) */}
             {userInfo.isAdmin && (
               <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#dc2626', fontWeight: 'bold' }}>
                  <ShieldCheck size={18} /> Admin
               </Link>
             )}

             <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Package size={18} /> My Orders
             </Link>

             <span style={{ fontWeight: 'bold', borderLeft: '1px solid #ccc', paddingLeft: '15px' }}>
                {userInfo.name}
             </span>
             <button onClick={logoutHandler} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
                Logout
             </button>
           </li>
        ) : (
           <li><Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><User size={20}/> Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
