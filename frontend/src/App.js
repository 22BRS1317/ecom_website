import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import MapScreen from './screens/MapScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    secondary: {
      main: '#FF5722',
      light: '#FF8A50',
      dark: '#C41C00',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div
          className={
            sidebarIsOpen
              ? fullBox
                ? 'site-container active-cont d-flex flex-column full-box'
                : 'site-container active-cont d-flex flex-column'
              : fullBox
              ? 'site-container d-flex flex-column full-box'
              : 'site-container d-flex flex-column'
          }
        >
          <ToastContainer position="bottom-center" limit={1} />
          <AppBar position="static" elevation={0}>
            <Toolbar sx={{ py: 1 }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography 
                variant="h6" 
                component={Link} 
                to="/" 
                sx={{ 
                  flexGrow: 1, 
                  textDecoration: 'none', 
                  color: 'inherit', 
                  fontWeight: 'bold', 
                  fontSize: '1.5rem',
                  background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Shopping Website
              </Typography>
              <SearchBox />
              <IconButton 
                color="inherit" 
                component={Link} 
                to="/cart"
                sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                <Badge 
                  badgeContent={cart.cartItems.reduce((a, c) => a + c.quantity, 0)} 
                  color="secondary"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#FF5722',
                      color: 'white',
                      fontWeight: 'bold',
                    }
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              {userInfo ? (
                <>
                  <IconButton 
                    color="inherit" 
                    onClick={handleMenu}
                    sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                  >
                    <PersonIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        borderRadius: 2,
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <MenuItem 
                      component={Link} 
                      to="/profile" 
                      onClick={handleClose}
                      sx={{ 
                        '&:hover': { backgroundColor: 'rgba(76,175,80,0.1)' },
                        borderRadius: 1,
                        mx: 1,
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem 
                      component={Link} 
                      to="/orderhistory" 
                      onClick={handleClose}
                      sx={{ 
                        '&:hover': { backgroundColor: 'rgba(76,175,80,0.1)' },
                        borderRadius: 1,
                        mx: 1,
                      }}
                    >
                      Order History
                    </MenuItem>
                    <MenuItem 
                      onClick={() => { handleClose(); signoutHandler(); }}
                      sx={{ 
                        '&:hover': { backgroundColor: 'rgba(255,87,34,0.1)' },
                        borderRadius: 1,
                        mx: 1,
                      }}
                    >
                      Sign Out
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <IconButton 
                  color="inherit" 
                  component={Link} 
                  to="/signin"
                  sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                >
                  <PersonIcon />
                </IconButton>
              )}
            </Toolbar>
          </AppBar>

          <div
            className={
              sidebarIsOpen
                ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
                : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
            }
          >
            <Nav className="flex-column text-white w-100 p-2">
              <Nav.Item>
                <strong>Categories</strong>
              </Nav.Item>
              {categories.map((category) => (
                <Nav.Item key={category}>
                  <LinkContainer
                    to={{ pathname: '/search', search: `category=${category}` }}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    <Nav.Link>{category}</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              ))}
            </Nav>
          </div>

          <AnimatePresence mode="wait">
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Container className="mt-3">
                <Routes>
                  <Route path="/product/:slug" element={<ProductScreen />} />
                  <Route path="/cart" element={<CartScreen />} />
                  <Route path="/search" element={<SearchScreen />} />
                  <Route path="/signin" element={<SigninScreen />} />
                  <Route path="/signup" element={<SignupScreen />} />
                  <Route
                    path="/forget-password"
                    element={<ForgetPasswordScreen />}
                  />
                  <Route
                    path="/reset-password/:token"
                    element={<ResetPasswordScreen />}
                  />

                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfileScreen />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/map"
                    element={
                      <ProtectedRoute>
                        <MapScreen />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/placeorder" element={<PlaceOrderScreen />} />
                  <Route
                    path="/order/:id"
                    element={
                      <ProtectedRoute>
                        <OrderScreen />
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route
                    path="/orderhistory"
                    element={
                      <ProtectedRoute>
                        <OrderHistoryScreen />
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route
                    path="/shipping"
                    element={<ShippingAddressScreen />}
                  ></Route>
                  <Route path="/payment" element={<PaymentMethodScreen />}></Route>
                  {/* Admin Routes */}
                  <Route
                    path="/admin/dashboard"
                    element={
                      <AdminRoute>
                        <DashboardScreen />
                      </AdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/admin/orders"
                    element={
                      <AdminRoute>
                        <OrderListScreen />
                      </AdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/admin/users"
                    element={
                      <AdminRoute>
                        <UserListScreen />
                      </AdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/admin/products"
                    element={
                      <AdminRoute>
                        <ProductListScreen />
                      </AdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/admin/product/:id"
                    element={
                      <AdminRoute>
                        <ProductEditScreen />
                      </AdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/admin/user/:id"
                    element={
                      <AdminRoute>
                        <UserEditScreen />
                      </AdminRoute>
                    }
                  ></Route>

                  <Route path="/" element={<HomeScreen />} />
                </Routes>
              </Container>
            </motion.main>
          </AnimatePresence>

          <footer>
            <div className="text-center">All rights reserved</div>
          </footer>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
