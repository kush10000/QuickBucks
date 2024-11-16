const express = require("express");
const mainRouter = require("./routes/index");
const cors = require('cors');
require('dotenv').config();

const app = express();

const corsOptions = {
    origin: ['http://localhost:5173', 'https://quickbux.netlify.app/', 'http://quickbux.netlify.app/'], // Add both local and deployed client URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    credentials: true, // Allow credentials
    allowedHeaders: ['Content-Type', 'Authorization'], // Add any custom headers if necessary
    exposedHeaders: ['Authorization'] // Expose any headers if needed on the client side
  };
  
  // Use CORS with options
app.use(cors(corsOptions)); 
app.use(express.json());



app.use("/api/v1",mainRouter);

app.listen(3000);
