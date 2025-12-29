import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { API_URL } from '../api'; // IMPORT

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/products/${id}`); // USE IT HERE
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/cart');
  };

  if (loading) return <h2 style={{textAlign: 'center', marginTop: '50px'}}>Loading...</h2>;
  if (!product) return <h2 style={{textAlign: 'center', marginTop: '50px'}}>Product Not Found</h2>;

  return (
    <div className="section detail-container">
      <div className="detail-image"><img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '12px' }} /></div>
      <div className="detail-info">
        <span style={{ background: '#e2e8f0', padding: '5px 10px', borderRadius: '4px', fontSize: '0.9rem' }}>{product.category}</span>
        <h1>{product.name}</h1>
        <p className="card-price" style={{ fontSize: '2rem', margin: '1rem 0' }}>${product.price}</p>
        <p className="detail-desc">{product.description}</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
          <button className="btn" onClick={handleBuyNow} style={{ background: '#64748b' }}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
