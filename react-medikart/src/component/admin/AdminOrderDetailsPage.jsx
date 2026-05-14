import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { styled } from "@mui/system";  // MUI styled for custom styles
import { Typography, Box, Button, Select, MenuItem, Snackbar, useMediaQuery, useTheme } from "@mui/material";

const OrderStatus = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"];

// Styled components for responsiveness
const OrderDetailsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const OrderItemDetails = styled(Box)(({ theme }) => ({
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const AdminOrderDetailsPage = () => {
  const { itemId } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState({});

  // Get the theme and useMediaQuery to detect mobile screen
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  // Detect screen width below 'sm'

  useEffect(() => {
    fetchOrderDetails(itemId);
  }, [itemId]);

  const fetchOrderDetails = async (itemId) => {
    try {
      const response = await ApiService.getOrderItemById(itemId);
      setOrderItems(response.orderItemList);
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const handleStatusChange = (orderItemId, newStatus) => {
    setSelectedStatus({ ...selectedStatus, [orderItemId]: newStatus });
  };

  const handleSubmitStatusChange = async (orderItemId) => {
    try {
      await ApiService.updateOrderitemStatus(orderItemId, selectedStatus[orderItemId]);
      setMessage('Order item status was successfully updated');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || 'Unable to update order item status');
    }
  };

  return (
    <OrderDetailsContainer>
      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={() => setMessage('')}
        message={message}
      />
      <Typography variant="h4">Order Details</Typography>
      {orderItems.length ? (
        orderItems.map((orderItem) => (
          <OrderItemDetails key={orderItem.id} style={{ marginLeft: isMobile ? '35px' : '230px' }}>
            <Box>
              <Typography variant="h5">Order Information</Typography>
              <Typography><strong>Order Item ID:</strong> {orderItem.id}</Typography>
              <Typography><strong>Quantity:</strong> {orderItem.quantity}</Typography>
              <Typography><strong>Total Price:</strong> ₹ {orderItem.price}</Typography>
              <Typography><strong>Order Status:</strong> {orderItem.status}</Typography>
              <Typography><strong>Date Ordered:</strong> {new Date(orderItem.createdAt).toLocaleDateString()}</Typography>
            </Box>
            <Box>
              <Typography variant="h5">User Information</Typography>
              <Typography><strong>Name:</strong> {orderItem.user.name}</Typography>
              <Typography><strong>Email:</strong> {orderItem.user.email}</Typography>
              <Typography><strong>Phone:</strong> {orderItem.user.phoneNumber}</Typography>
              <Typography><strong>Role:</strong> {orderItem.user.role}</Typography>
              <Box>
                <Typography variant="h5">Delivery Address</Typography>
                <Typography><strong>Country:</strong> {orderItem.user.address?.country}</Typography>
                <Typography><strong>State:</strong> {orderItem.user.address?.state}</Typography>
                <Typography><strong>City:</strong> {orderItem.user.address?.city}</Typography>
                <Typography><strong>Street:</strong> {orderItem.user.address?.street}</Typography>
                <Typography><strong>Zip Code:</strong> {orderItem.user.address?.zipcode}</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="h5">Product Information</Typography>
              <img src={orderItem.product.imageUrl} alt={orderItem.product.name} style={{ maxWidth: '100%', height: 'auto' }} />
              <Typography><strong>Name:</strong> {orderItem.product.name}</Typography>
              <Typography><strong>Description:</strong> {orderItem.product.description}</Typography>
              <Typography><strong>Price:</strong> ₹ {orderItem.product.price}</Typography>
            </Box>
            {/* Applying conditional marginLeft based on screen size */}
            <Box >
              <Typography variant="h5">Change Status</Typography>
              <Select
                value={selectedStatus[orderItem.id] || orderItem.status}
                onChange={(e) => handleStatusChange(orderItem.id, e.target.value)}
              >
                {OrderStatus.map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                onClick={() => handleSubmitStatusChange(orderItem.id)}
                style={{ marginLeft: '10px' }}
              >
                Update Status
              </Button>
            </Box>
          </OrderItemDetails>
        ))
      ) : (
        <Typography>Loading order details ....</Typography>
      )}
    </OrderDetailsContainer>
  );
};

export default AdminOrderDetailsPage;