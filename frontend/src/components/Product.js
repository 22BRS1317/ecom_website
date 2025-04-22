import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { motion } from 'framer-motion';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    
    // Check if we're using the backend API or local data
    if (item._id) {
      try {
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
          window.alert('Sorry. Product is out of stock');
          return;
        }
      } catch (err) {
        window.alert('Error checking stock');
        return;
      }
    } else {
      if (item.countInStock < quantity) {
        window.alert('Sorry. Product is out of stock');
        return;
      }
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const handleImageError = (e) => {
    console.error('Image load error for:', product.name, 'Image path:', product.image);
    e.target.onerror = null;
    e.target.src = '/images/placeholder.jpg';
  };

  return (
    <Card className="product-card h-100 shadow-lg bg-dark text-white">
      <Link to={`/product/${product.slug}`}>
        <div className="image-container" style={{ height: '300px', overflow: 'hidden' }}>
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.name}
            className="product-image"
            style={{
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
            onError={handleImageError}
          />
        </div>
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product.slug}`} className="text-decoration-none">
          <Card.Title className="text-white">{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text className="text-white">${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button 
            variant="outline-danger" 
            disabled 
            className="mt-auto w-100"
          >
            Out of stock
          </Button>
        ) : (
          <Button 
            onClick={() => addToCartHandler(product)}
            variant="outline-success"
            className="mt-auto w-100 hover-effect"
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
