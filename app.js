const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const connectDB = require("./config/database");

const app = express();

// Load config
dotenv.config();

// Connect to database
connectDB();

// Express body parser
app.use(express.urlencoded({ extended: false }));

// EJS
app.set("view engine", "ejs");
app.set("views", [path.join(__dirname, "views")]);
app.use(expressLayouts);
app.set("layout", "layouts/main");

// Static folder
app.use(express.static(path.join(__dirname, "assets")));

// Routes
app.use("/", require("./routes/index.js"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is listen on port ${PORT}`));
