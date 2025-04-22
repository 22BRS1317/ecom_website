import { useEffect, useReducer } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { motion } from "framer-motion";
import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        // Try to fetch from API first
        const result = await axios.get("/api/products");
        console.log('API Products:', result.data);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        // If API fails, use local data
        console.log('Using local data');
        console.log('Local Products:', data.products);
        dispatch({ type: "FETCH_SUCCESS", payload: data.products });
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4"
    >
      <Helmet>
        <title>Shopping Website</title>
      </Helmet>
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold text-green-500 mb-8">Featured Products</h1>
        <div className="products">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : products.length === 0 ? (
            <MessageBox variant="info">No products found</MessageBox>
          ) : (
            <Row className="g-4">
              {products.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Product product={product} />
                  </motion.div>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default HomeScreen;
