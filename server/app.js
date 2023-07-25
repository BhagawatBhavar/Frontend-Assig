// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', async (req, res) => {
    const { stockSymbol, date } = req.body;

    if (!stockSymbol || !date) {
        return res.status(400).json({ error: "StockName and date are required." });
    }

    try {
        const apiKey = process.env.REACT_APP_POLYGON_API_KEY;
        const response = await axios.get(`https://api.polygon.io/v1/open-close/${stockSymbol}/${date}?apiKey=${apiKey}`);

        const { open, high, low, close, volume } = response.data;
        const result = {
            open,
            high,
            low,
            close,
            volume
        };

        return res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching  data:", error.message);
        return res.status(500).json({ error: "Error fetching  data. Please try again later." });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));