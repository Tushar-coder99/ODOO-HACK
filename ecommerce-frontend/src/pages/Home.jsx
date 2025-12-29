import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../api'; // IMPORT THE URL

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`); // USE IT HERE
        const data = await res.json();
        setFeaturedProducts(data.slice(0, 3)); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <h2 style={{textAlign: 'center', marginTop: '50px'}}>Loading...</h2>;

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>Upgrade Your Lifestyle</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: '0.9' }}>
            Discover the latest trends in electronics, fashion, and more.
          </p>
          <Link to="/products">
            <button className="btn">Shop Now</button>
          </Link>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Featured Collections</h2>
        <div className="grid">
          {featuredProducts.map((product) => (
            <div key={product._id} className="card">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="card-body">
                <Link to={`/product/${product._id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <p className="card-price">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
