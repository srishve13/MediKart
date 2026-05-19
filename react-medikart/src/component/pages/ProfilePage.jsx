import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import "../../style/profile.css"; // Make sure this path is correct

import {
  Container,
  Typography,
  Button,
  Pagination as MuiPagination,
} from "@mui/material";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await ApiService.getLoggedInUserInfo();
      setUserInfo(response.user);
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Unable to fetch user info"
      );
    }
  };

  if (!userInfo) {
    return (
      <Container className="profile-page">
        <Typography variant="h5" textAlign="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  const handleAddressClick = () => {
    navigate(userInfo.address ? "/edit-address" : "/add-address");
  };

  const orderItemList = userInfo.orderItemList || [];
  const totalPages = Math.ceil(orderItemList.length / itemsPerPage);

  const paginatedOrders = orderItemList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container className="profile-page">
      <h2>Welcome, {userInfo.name}</h2>

      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          {/* User Info Section */}
          <div>
            <h3>User Information</h3>
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Phone Number:</strong> {userInfo.phoneNumber}</p>
          </div>

          {/* Address Section */}
          <div>
            <h3>Address</h3>
            {userInfo.address ? (
              <>
                <p><strong>Street:</strong> {userInfo.address.street}</p>
                <p><strong>City:</strong> {userInfo.address.city}</p>
                <p><strong>State:</strong> {userInfo.address.state}</p>
                <p><strong>Zip Code:</strong> {userInfo.address.zipCode}</p>
                <p><strong>Country:</strong> {userInfo.address.country}</p>
              </>
            ) : (
              <p>No Address information available</p>
            )}
            <Button
              variant="contained"
              color="primary"
              className="profile-button"
              onClick={handleAddressClick}
            >
              {userInfo.address ? "Edit Address" : "Add Address"}
            </Button>
          </div>

          {/* Order History Section */}
          <div>
            <h3>Order History</h3>
            {paginatedOrders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <ul>
                {paginatedOrders.map((order) => (
                  <li key={order.id}>
                    <img
                      src={order.product?.imageUrl}
                      alt={order.product?.name}
                    />
                    <div>
                      <h4>{order.product?.name}</h4>
                      <p><strong>Status:</strong> {order.status}</p>
                      <p><strong>Quantity:</strong> {order.quantity}</p>
                      <p><strong>Price:</strong> ₹ {order.price.toFixed(2)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <MuiPagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              color="primary"
              sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default ProfilePage;
