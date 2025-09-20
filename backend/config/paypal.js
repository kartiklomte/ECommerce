const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: 'sandbox', 
  client_id: process.env.paypalClientId,
  client_secret: process.env.paypalClientSecretKey
});

module.exports = paypal;