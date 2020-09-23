const express = require('express');
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const PORT = 3000;

const expressLayouts = require("express-ejs-layouts");
const aboutRouter = require("./routes/aboutRouter");
const blogRouter = require("./routes/blogRouter");

app.set("view engine", "ejs");
app.set("layout", "layouts/main-layout");

app.use(expressLayouts);
app.use(express.static("./public"));

// Connect to Database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(result => {
    console.log("Connected to Database");
    // we'll listen for requests only once we've connected to the DB
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  })
  .catch(err => console.log(err));

// Routes
// HOME
app.get("/", (req, res) => res.render("blog"));

// ABOUT
app.use("/about", aboutRouter);

// BLOGS
app.use("/blogs", blogRouter);

// CONTACT
app.get("/contact", (req, res) => res.render("contact"));

// ADMIN
app.get("/admin", (req, res) => res.render("admin", { layout: "./layouts/admin-layout" }));

// 404 error
app.use((req, res) => res.render("404"));