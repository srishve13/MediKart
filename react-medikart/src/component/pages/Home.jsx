import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";
import { Container, Typography } from "@mui/material";
import Loader from "../Loader";


const Home = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loader state
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true when starting to fetch
      try {
        let allProducts = [];
        const queryparams = new URLSearchParams(location.search);
        const searchItem = queryparams.get("search");

        if (searchItem) {
          const response = await ApiService.searchProducts(searchItem);
          allProducts = response.productList || [];
        } else {
          const response = await ApiService.getAllProducts();
          allProducts = response.productList || [];
        }

        setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
        setProducts(allProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
      } catch (error) {
        setError(
          error.response?.data?.message ||
          error.message ||
          "Unable to fetch products"
        );
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, [location.search, currentPage]);

  return (
    <Container
      maxWidth={false}
      sx={{
        flex: 1,
        paddingTop: 4,
        paddingBottom: 4,
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8fbff, #eef4ff)",
      }}
    >
      {loading ? ( // Check if loading
        <Loader /> // Show loader
      ) : error ? (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      ) : (
        <div>
          <ProductList products={products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </Container>
  );
};

export default Home;