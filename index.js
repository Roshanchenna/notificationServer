const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Port for your server

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Webhook endpoint
app.post('/webhook-receiver', (req, res) => {
    console.log('Webhook notification received!');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);

    // Send a response back to acknowledge the notification
    res.status(200).send('Notification received!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
