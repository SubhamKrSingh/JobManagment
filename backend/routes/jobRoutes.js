const express = require("express");
const router = express.Router();
const { createCompany, getCompaines } = require("../controller/JobController");

// Define your job routes here
router.get("/", getCompaines);
// Add this new route for /companies
router.get("/companies", getCompaines);

// Update to use the controller function
router.post("/create-company", createCompany);

// Export the router
module.exports = router;