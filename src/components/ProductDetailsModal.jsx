import { useSelector } from 'react-redux';
import { Box, Modal, Typography, Grid, Rating, List, ListItem, ListItemText } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh',
  overflowY: 'auto',
};

export default function ProductDetailsModal({ open, handleClose }) {
  const { selectedProduct } = useSelector((state) => state.products);

  if (!selectedProduct) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Grid container spacing={4}>
          {/* Top Left: Product Image */}
          <Grid item xs={12} md={6}>
            <img
              src={selectedProduct.images[0]}
              alt={selectedProduct.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </Grid>

          {/* Top Right: Product Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {selectedProduct.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {selectedProduct.description}
            </Typography>
            <Typography variant="h6" color="primary">
              ${selectedProduct.price}
            </Typography>
            <Typography variant="body2">Estoque disponível: {selectedProduct.stock}</Typography>
            <Typography variant="body2">Nota:</Typography>
            <Rating value={selectedProduct.rating} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Entrega: Fast delivery within 7 days
            </Typography>
          </Grid>
        </Grid>

        {/* Reviews Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Avaliações
          </Typography>
          <List>
            {selectedProduct.reviews?.map((review, index) => (
              <ListItem key={index} sx={{ border: '1px solid #ddd', mb: 2, borderRadius: '4px' }}>
                <ListItemText
                  primary={`${review.reviewerName} (${review.rating} ★)`}
                  secondary={
                    <>
                      <Typography component="span">
                        {new Date(review.date).toLocaleDateString()}
                      </Typography>
                      {' — '}
                      {review.comment}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Modal>
  );
}
