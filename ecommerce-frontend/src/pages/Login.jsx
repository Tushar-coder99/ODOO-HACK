import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../api'; // IMPORT

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/users/login`, { // USE IT HERE
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Login Successful');
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/');
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Network Error");
    }
  };

  return (
    <div className="section" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2 className="section-title">Sign In</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <button className="btn" type="submit">Login</button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>New Customer? <Link to="/register" style={{ color: 'blue' }}>Register</Link></p>
    </div>
  );
};

export default Login;
