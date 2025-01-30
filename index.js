const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const redis = require("redis");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(bodyParser.json());


// connection for redis
const redisClient = redis.createClient({
  socket: {
    host: 'master.redis-cache-1a-test.sudini.aps1.cache.amazonaws.com',
    port: 6379,
    connectTimeout: 10000
  },
});

console.log('Attempting to connect to Redis...');

(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Redis connection failed:', error);
  }
})();


// Webhook endpoint
app.post("/FI/Notification", (req, res) => {
  console.log("Webhook notification received!");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  // Send a response back to acknowledge the notification
  res.status(200).send("Notification received!");
});

app.get("/", (req, res) => {
  res.send("Hi from the Server");
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

