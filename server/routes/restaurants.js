const db = require("../db");
const express = require("express");
const router = express.Router();


// Get all restaurants
router.get("/", async (req, res) => {
  const results = await db.query("select * from restaurants;");
  res.json({
    status: "success",
    results: results.rows.length,
    data: {
      restaurants: results.rows,
    },
  });
});

// Get a restaurant
router.get("/:id", async (req, res) => {
  const results = await db.query(
    `select * from restaurants where id = ${req.params.id};`
  );

  if (results.rows !== []) {
    res.json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } else {
    res.status(404).send("restaurant not found");
  }
});

// Create a restaurant
router.post("/", (req, res) => {
  res.status(201).json({
    status: "success",
    data: {
      restaurants: ["mcies"],
    },
  });
});

// Update restaurants
router.put("/:id", (req, res) => {
  res.json({
    status: "success",
    data: {
      restaurants: ["mcies"],
    },
  });
});

// Delete Restaurant
router.delete("/:id", (req, res) => {
  res.status(204).send();
});



module.exports = router;