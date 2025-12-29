import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../api'; // IMPORT

const ProductList = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/products`); // USE IT HERE
        const data = await res.json();
        
        if (keyword) {
            const searchTerm = keyword.toLowerCase();
            const filtered = data.filter(p => 
                p.name.toLowerCase().includes(searchTerm) || 
                p.category.toLowerCase().includes(searchTerm)
            );
            setProducts(filtered);
        } else {
            setProducts(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword]);

  if (loading) return <h2 style={{textAlign: 'center', marginTop: '50px'}}>Loading...</h2>;

  return (
    <div className="section">
      <h2 className="section-title">{keyword ? `Search Results for "${keyword}"` : 'All Products'}</h2>
      {products.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h3>No products found for "{keyword}"</h3>
            <Link to="/products"><button className="btn" style={{ marginTop: '1rem' }}>View All Products</button></Link>
          </div>
      ) : (
          <div className="grid">
            {products.map((product) => (
              <div key={product._id} className="card">
                <Link to={`/product/${product._id}`}><img src={product.image} alt={product.name} /></Link>
                <div className="card-body">
                  <Link to={`/product/${product._id}`}><h3>{product.name}</h3></Link>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{product.category}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <span className="card-price">${product.price}</span>
                    <Link to={`/product/${product._id}`}><button className="btn" style={{ padding: '5px 15px', fontSize: '0.8rem' }}>View</button></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
      )}
    </div>
  );
};

export default ProductList;
