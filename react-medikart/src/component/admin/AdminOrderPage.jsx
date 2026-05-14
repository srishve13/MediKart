import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Pagination,
  useMediaQuery,
  Box,
} from "@mui/material";
import ApiService from "../../service/ApiService";

const OrderStatus = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
];

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Check for small screens (mobile devices)
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(min-width:600px) and (max-width:960px)");

  useEffect(() => {
    fetchOrders();
  }, [searchStatus, currentPage]);

  const fetchOrders = async () => {
    try {
      let response;
      if (searchStatus) {
        response = await ApiService.getAllOrderItemsByStatus(searchStatus);
      } else {
        response = await ApiService.getAllOrders();
      }
      const orderList = response.orderItemList || [];
      setTotalPages(Math.ceil(orderList.length / itemsPerPage));
      setOrders(orderList);
      setFilteredOrders(
        orderList.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch orders"
      );
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setStatusFilter(filterValue);
    setCurrentPage(1);

    if (filterValue) {
      const filtered = orders.filter((order) => order.status === filterValue);
      setFilteredOrders(filtered.slice(0, itemsPerPage));
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    } else {
      setFilteredOrders(orders.slice(0, itemsPerPage));
      setTotalPages(Math.ceil(orders.length / itemsPerPage));
    }
  };

  const handleSearchStatusChange = (e) => {
    setSearchStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleOrderDetails = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <Container maxWidth="lg">
      <Box style={{ marginLeft: isMobile ? '35px' : '230px', marginTop: "10px" }}>
        <Typography variant="h4" gutterBottom>
          Orders
        </Typography>
        {error && <Typography color="error">{error}</Typography>}

        {/* Filter Section */}
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Filter By Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={handleFilterChange}
                label="Filter By Status"
              >
                <MenuItem value="">All</MenuItem>
                {OrderStatus.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Search By Status</InputLabel>
              <Select
                value={searchStatus}
                onChange={handleSearchStatusChange}
                label="Search By Status"
              >
                <MenuItem value="">All</MenuItem>
                {OrderStatus.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Orders Table */}
        <TableContainer component={Paper}>
          <Table aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Date Ordered</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>₹ {order.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOrderDetails(order.id)}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Grid container justifyContent="center" marginTop={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            color="primary"
          />
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminOrdersPage;