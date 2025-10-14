import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('error');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.url}/product/viewallproducts`);
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch products. ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`${config.url}/product/delete`, { params: { id } });
      setProducts(products.filter(product => product.id !== id)); // remove from UI
      setSnackbarMessage('Product deleted successfully!');
      setSeverity('success');
      setOpenSnackbar(true);
      setError('');
    } catch (err) {
      setSnackbarMessage('Failed to delete product. ' + err.message);
      setSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ textDecoration: 'underline' }}>
        All Products
      </Typography>

      {error && <Typography color="error" align="center">{error}</Typography>}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>₹{product.cost}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" href={product.url} target="_blank" rel="noopener noreferrer">
                    Visit
                  </Button>
                </TableCell>
                <TableCell>
                  <iframe
                    src={`${config.url}/product/displayproductimage?id=${product.id}`}
                    title={`Product-${product.id}`}
                    className="table-image"
                    style={{ width: '100px', height: '100px', borderRadius: '4px' }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={severity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ViewAllProducts;
