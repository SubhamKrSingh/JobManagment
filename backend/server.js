const express = require("express");
const cors = require("cors");
const connectDB = require("./config/config");
const JobRoutes = require("./routes/Jobroutes");

require("dotenv").config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/job", JobRoutes);

// Change port to 3000 explicitly
const port = 3000;

app.listen(port, () => {
    console.log(`server running on ${port}`);
});