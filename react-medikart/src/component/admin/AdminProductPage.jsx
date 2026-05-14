import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";
import {
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMediaQuery } from '@mui/material';

const AdminProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const itemsPerPage = 10;

  const fetchProducts = async () => {
    try {
      const response = await ApiService.getAllProducts();
      const productList = response.productList || [];
      setTotalPages(Math.ceil(productList.length / itemsPerPage));
      setProducts(
        productList.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch products"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      try {
        await ApiService.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Unable to delete product"
        );
      }
    }
  };

  return (
    <Container >
      {error ? (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      ) : (
        <Box style={{ marginLeft: isMobile ? '35px' : '230px', marginTop: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/admin/add-product")}
            sx={{ mb: 2 }}
          >
            Add Product
          </Button>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Image</TableCell>
                  
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>₹ {product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <img src={product.imageUrl} alt={product.name} style={{ width: "50px", height: "50px" }} />
                    </TableCell>
                    
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(product.id)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(product.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Box>
      )}
    </Container>
  );
};

export default AdminProductPage;