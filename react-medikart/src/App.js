import './App.css';
import { BrowserRouter, Routes, Route,useLocation  } from 'react-router-dom';
import { ProtectedRoute, AdminRoute } from './service/Guard';
import Navbar from './component/common/Navbar';
import Sidebar from './component/common/Sidebar';
import Footer from './component/common/Footer';
import { CartProvider } from './component/context/CartContext';
import Home from './component/pages/Home';
import ProductDetailsPage from './component/pages/ProductDetailsPage';
import CategoryListPage from './component/pages/CategoryListPage';
import CategoryProductsPage from './component/pages/CategoryProductsPage';
import CartPage from './component/pages/CartPage';
import RegisterPage from './component/pages/RegisterPage';
import LoginPage from './component/pages/LoginPage';
import ProfilePage from './component/pages/ProfilePage';
import AddressPage from './component/pages/AddressPage';
import AdminPage from './component/admin/AdminPage';
import AdminCategoryPage from './component/admin/AdminCategoryPage';
import AddCategory from './component/admin/AddCategory';
import EditCategory from './component/admin/EditCategory';
import AdminProductPage from './component/admin/AdminProductPage';
import AddProductPage from './component/admin/AddProductPage';
import EditProductPage from './component/admin/EditProductPage';
import AdminOrdersPage from './component/admin/AdminOrderPage';
import AdminOrderDetailsPage from './component/admin/AdminOrderDetailsPage';
// Material UI imports
import { Box, CssBaseline } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline /> {/* This helps in providing consistent padding/margin across devices */}
      <CartProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <ConditionalNavbarOrSidebar /> {/* Conditional component for Navbar or Sidebar */}
          
          {/* Main content container */}
          <Routes>
            {/* Our Routes */}
            <Route exact path='/' element={<Home />} />
            <Route path='/product/:productId' element={<ProductDetailsPage />} />
            <Route path='/categories' element={<CategoryListPage />} />
            <Route path='/category/:categoryId' element={<CategoryProductsPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />

            <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} />} />
            <Route path='/add-address' element={<ProtectedRoute element={<AddressPage />} />} />
            <Route path='/edit-address' element={<ProtectedRoute element={<AddressPage />} />} />

            <Route path='/admin' element={<AdminRoute element={<AdminPage />} />} />
            <Route path='/admin/categories' element={<AdminRoute element={<AdminCategoryPage />} />} />
            <Route path='/admin/add-category' element={<AdminRoute element={<AddCategory />} />} />
            <Route path='/admin/edit-category/:categoryId' element={<AdminRoute element={<EditCategory />} />} />
            <Route path='/admin/products' element={<AdminRoute element={<AdminProductPage />} />} />
            <Route path='/admin/add-product' element={<AdminRoute element={<AddProductPage />} />} />
            <Route path='/admin/edit-product/:productId' element={<AdminRoute element={<EditProductPage />} />} />

            <Route path='/admin/orders' element={<AdminRoute element={<AdminOrdersPage />} />} />
            <Route path='/admin/order-details/:itemId' element={<AdminRoute element={<AdminOrderDetailsPage />} />} />
          </Routes>

          {/* Footer is rendered here based on the current route */}
          <ConditionalFooter />
        </Box>
      </CartProvider>
    </BrowserRouter>
  );
}

// Conditional rendering component for Sidebar or Navbar
function ConditionalNavbarOrSidebar() {
  const location = useLocation();

  // Check if current path is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return isAdminRoute ? <Sidebar /> : <Navbar />;
}

// Conditional Footer rendering component
function ConditionalFooter() {
  const location = useLocation();

  // Check if the current path is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Only render the Footer if the current route is not an admin route
  return !isAdminRoute ? <Footer /> : null;
}

export default App;