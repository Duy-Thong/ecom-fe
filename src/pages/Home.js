
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products');
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Our Products</h2>
            <div style={styles.productGrid}>
                {products.map(product => (
                    <div key={product.id} style={styles.productCard}>
                        <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            style={styles.productImage}
                        />
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                        <p>{product.description}</p>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        padding: '20px'
    },
    productCard: {
        border: '1px solid #ddd',
        padding: '15px',
        borderRadius: '8px',
        textAlign: 'center'
    },
    productImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '4px'
    }
};

export default Home;