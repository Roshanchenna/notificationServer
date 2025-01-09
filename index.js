const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Webhook endpoint
app.post("/FI/Notification", (req, res) => {
  console.log("Webhook notification received!");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  // Send a response back to acknowledge the notification
  res.status(200).send("Notification received!");
});

app.get("/", (req, res) => {
  res.send("server is running and working fine, and Hi from Roshan Chenna");
});

app.get('/health', (req, res) => {
  res.status(200).send('Healthy');
});

app.get("/FI", (req, res) => {
  res.send("FI is working");
});
// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
});

