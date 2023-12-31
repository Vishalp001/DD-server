const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productRout = require('./routes/product');
const authRoute = require('./routes/auth');
const cartRoute = require('./routes/cart');
const userRoute = require('./routes/user');
const orderRoute = require('./routes/order');
const paymentRoute = require('./routes/payment');

// const orderRoute = require('./routes/order');

const PORT = process.env.PORT || 8080;
// const PORT = 5000
const cors = require('cors');
const Product = require('./models/Product');
app.use(cors());

// Enable CORS for a specific origin
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Origin',
    'https://e-commerce-store-2a892.web.app'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static(__dirname));

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Update all product Quantity
// const newStockQuantity = 5; // Replace with the new stock quantity
// Product.updateMany(
//   {}, // Empty filter means all documents match
//   {$set: {stockQuantity: newStockQuantity}}
// )
//   .then((result) => {
//     console.log('Number of products updated:', result.nModified);
//   })
//   .catch((error) => {
//     console.error('Error updating products:', error);
//   })
//   .finally(() => {
//     mongoose.disconnect();
//   });

app.use('/api/auth', authRoute);
app.use('/api/product', productRout);
app.use('/api/cart', cartRoute);
app.use('/api/user', userRoute);
app.use('/api/order', orderRoute);
app.use('/api/create-checkout-session', paymentRoute);

app.get('/', (req, res) => {
  res.send('Hello to Blog API');
});

app.listen(PORT, () => {
  console.log('Backend is running.');
});
