import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Grid, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Snackbar, Alert } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMediaQuery } from '@mui/material';

const AdminCategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await ApiService.getAllCategory();
            setCategories(response.categoryList || []);
        } catch (error) {
            console.log("Error fetching category list", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit-category/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this category?");
        if (confirmed) {
            try {
                await ApiService.deleteCategory(id);
                fetchCategories();
                setMessage("Category deleted successfully");
                setOpenSnackbar(true);
            } catch (error) {
                console.log("Error deleting category by id");
                setMessage("Error deleting category");
                setOpenSnackbar(true);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop:"10px" }}>
            <Grid container spacing={2} >
                <Grid item style={{ marginLeft: isMobile ? '35px' : '230px' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => navigate('/admin/add-category')}
                    >
                        Add Category
                    </Button>
                </Grid>

                <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                    <Table 
                        sx={{ 
                            width: "80%", 
                            borderRadius: "12px", 
                            overflow: "hidden", 
                            boxShadow: "0 2px 10px rgba(0,0,0,0.1)", 
                            marginLeft: { xs: 0, sm: 0, md: 25 } // Add left margin for desktop
                        }}
                    >
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell>ID</TableCell>
                                <TableCell>Category Name</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell>{category.id}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleEdit(category.id)} aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(category.id)} aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={message.includes("Error") ? "error" : "success"}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AdminCategoryPage;