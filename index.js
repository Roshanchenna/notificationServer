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
    host: "redis-cache-for-test.sudini.ng.0001.aps1.cache.amazonaws.com",
    port: 6379,
    timeout: 10000
  }
});

(async () => {
  try {
    await redisClient.connect();
    console.log("redis connected")
  } catch (err) {
    console.log(err);
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

// ... existing code ...

app.get("/", async (req, res) => {
  try {
    const cacheKey = await redisClient.get("testKey");
    if (cacheKey) return res.send("hi from the cached Key")
    // Set a key-value pair in Redis
    await redisClient.set("testKey", "Hello, Redis!", { EX: 10 });
    res.send("Hi from the Server. Data cached in Redis.");
  } catch (err) {
    console.error("Error writing to Redis:", err);
    res.status(500).send("Error writing to Redis");
  }
});

// ... existing code ...

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

