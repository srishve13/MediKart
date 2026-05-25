import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";
import '../../style/home.css';

const CategoryProductsPage = () => {
    const { categoryId } = useParams();  // Get the category ID from URL parameters
    const [products, setProducts] = useState([]);  // State to hold the list of products
    const [currentPage, setCurrentPage] = useState(1);  // Current page for pagination
    const [totalPages, setTotalPages] = useState(0);  // Total number of pages
    const [error, setError] = useState(null);  // State to handle errors

    useEffect(() => {
        if (categoryId) {
            fetchProducts();  
        } else {
            setError("Category ID is required."); 
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId, currentPage]);

    const fetchProducts = async () => {
        try {
            console.log("Fetching products for category ID:", categoryId);
            const response = await axios.get(`http://medikart-backend-im3c.onrender.com/product/get-by-category-id/${categoryId}`);
            console.log("API Response:", response); // Log the full response
    
            if (response.data && response.data.productList) {
                setProducts(response.data.productList);
                setTotalPages(Math.ceil(response.data.totalPages || 1));
            } else {
                console.log("No products found in the response.");
                setProducts([]);
                setTotalPages(0);
            }
        } catch (error) {
            // Log the full error for more insight
            console.error("Error fetching products:", error); 
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            }
            if (error.response && error.response.status === 404) {
                setError("No products found for this category.");
            } else {
                setError(error.response?.data?.message || error.message || 'Unable to fetch products.');
            }
        }
    };
    

    return (
        <div className="home">
            {error ? (
                <p className="error-message">{error}</p>  // Display error message
            ) : products.length === 0 ? (
                <p>No products available in this category.</p>  // Message if no products are found
            ) : (
                <div>
                    <ProductList products={products} />
                    <Pagination
                        currentPage={currentPage}  // Current page for pagination
                        totalPages={totalPages}  // Total pages for pagination
                        onPageChange={(page) => setCurrentPage(page)}  // Update current page
                    />
                </div>
            )}
        </div>
    );
};

export default CategoryProductsPage;