import { Link } from 'react-router-dom';
import { products } from '../data';

const ProductList = () => {
  return (
    <div className="section">
      <h2 className="section-title">All Products</h2>
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} />
              <div className="card-body">
                <h3>{product.name}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{product.category}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <span className="card-price">${product.price}</span>
                  <button className="btn" style={{ padding: '5px 15px', fontSize: '0.8rem' }}>View</button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
