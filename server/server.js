require("dotenv").config();
const express = require("express");
const port = 8000;
const helmet = require("helmet");
const morgan = require("morgan");
const { connectToServer } = require("./connection");
const userRoutes = require("./routes/user");
const folderRoutes = require("./routes/folder");
const pdfRoutes = require("./routes/pdf");
const cors = require("cors");

const app = express().use(helmet()).use(morgan("tiny"));
app.use(cors());

app.use(express.json());
app.use(userRoutes);
app.use(folderRoutes);
app.use(pdfRoutes);

app.get("/hello", (req, res) => {
    res.status(200).json({ status: 200, message: "Hello World!" });
});

const startServer = () => {
    connectToServer(() => {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    });
};

startServer();
