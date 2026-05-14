import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { useCart } from "../context/CartContext";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const incrementItem = (product) => {
    dispatch({ type: "INCREMENT_ITEM", payload: product });
  };

  const decrementItem = (product) => {
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem && cartItem.quantity > 1) {
      dispatch({ type: "DECREMENT_ITEM", payload: product });
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: product });
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!ApiService.isAuthenticated()) {
      setMessage("You need to login first before you can place an order");
      setTimeout(() => {
        setMessage("");
        navigate("/login");
      }, 3000);
      return;
    }

    const orderItems = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const orderRequest = {
      totalPrice,
      items: orderItems,
    };

    try {
      const response = await ApiService.createOrder(orderRequest);
      setMessage(response.message);

      setTimeout(() => {
        setMessage("");
      }, 5000);

      if (response.status === 200) {
        dispatch({ type: "CLEAR_CART" });
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || error.message || "Failed to place an order"
      );
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      {message && (
        <Typography variant="body1" color="error">
          {message}
        </Typography>
      )}

      {cart.length === 0 ? (
        <Typography variant="body1">Your cart is empty</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    
                    <Typography variant="body1">{item.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <img src={item.imageUrl} alt={item.name} style={{ width: '50px' }} />
                    
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{item.description}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={() => decrementItem(item)}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1" sx={{ mx: 1 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton onClick={() => incrementItem(item)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">₹ {item.price.toFixed(2)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" color="error" onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item })}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {cart.length > 0 && (
        <Box sx={{ mt: 4, textAlign: 'right' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Total: ₹ {totalPrice.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
          >
            Proceed To Pay
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;