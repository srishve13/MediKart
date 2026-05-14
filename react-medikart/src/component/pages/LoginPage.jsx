import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { 
    Container, 
    Typography, 
    TextField, 
    Button, 
    Grid, 
    Snackbar, 
    Alert 
} from '@mui/material';
import Loader from '../Loader';  // Import the Loader component

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);  // Loading state to show Loader
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Start loader
        try {
            const response = await ApiService.loginUser(formData);
            if (response.status === 200) {
                setMessage("User Successfully Logged in");
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate("/profile");
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response?.data.message || error.message || "Unable to login a user");
            setOpenSnackbar(true);
        } finally {
            setLoading(false);  // Stop loader
        }
    }

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
        setMessage(null);
    };

    return (
        <Container maxWidth="sm">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginTop: '20px' }}>
                        Login
                    </Typography>
                    {message && (
                        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                            <Alert onClose={handleSnackbarClose} severity={message.includes('Successfully') ? 'success' : 'error'}>
                                {message}
                            </Alert>
                        </Snackbar>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '10px' }}>
                                <Typography variant="body2">
                                    Don't have an account? <a href="/register" style={{ textDecoration: 'none', color: '#3f51b5' }}>Register</a>
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </>
            )}
        </Container>
    )
}

export default LoginPage;