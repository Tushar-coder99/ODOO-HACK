import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../api'; // IMPORT

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/users/register`, { // USE IT HERE
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                alert('Registration Successful!');
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate('/');
                window.location.reload();
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            alert('Network Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="section" style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2 className="section-title">Register</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <button className="btn" type="submit" disabled={loading}>{loading ? 'Processing...' : 'Register'}</button>
            </form>
            <p style={{ marginTop: '1rem', textAlign: 'center' }}>Have an account? <Link to="/login" style={{ color: 'blue' }}>Login</Link></p>
        </div>
    );
};

export default Register;
