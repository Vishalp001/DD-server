const router = require('express').Router();
const dotenv = require('dotenv');
dotenv.config();
const STRIPEKEY = process.env.STRIPEKEY;
const stripe = require('stripe')(STRIPEKEY);

router.post('/', async (req, res) => {
  const {products} = req.body;

  const lineItems = products?.map((product) => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: product.productName,
      },
      unit_amount: product.productPrice * 100,
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });
  const response = res.json({id: session.id});
  console.log(response, 'response');
});

module.exports = router;
