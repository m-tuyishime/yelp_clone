const db = require("../db");
const express = require("express");
const router = express.Router();

// Get all restaurants
router.get("/", async (req, res) => {
  const dbResults = await db.query("SELECT * FROM restaurants;");
  res.json({
    status: "success",
    dbResults: dbResults.rows.length,
    data: {
      restaurants: dbResults.rows,
    },
  });
});

// Get a restaurant
router.get("/:id", async (req, res) => {
  const restaurants = await db.query(
    "SELECT * FROM restaurants WHERE id = $1;",
    [req.params.id]
  );

  const reviews = await db.query(
    "SELECT * FROM reviews WHERE restaurant_id = $1;",
    [req.params.id]
  );

  if (restaurants.rowCount !== 0) {
    res.json({
      status: "success",
      dbResults: restaurants.rows.length,
      data: {
        restaurants: restaurants.rows,
        reviews: reviews.rows,
      },
    });
  } else {
    res.status(404).send("restaurant not found");
  }
});

// Create a restaurant
router.post("/", async (req, res) => {
  const dbResults = await db.query(
    `INSERT INTO restaurants (name, location, price_range)
      VALUES ($1, $2, $3) RETURNING *;`,
    [req.body.name, req.body.location, req.body.price_range]
  );

  res.status(201).json({
    status: "success",
    data: {
      restaurants: dbResults.rows,
    },
  });
});

// Update restaurants
router.put("/:id", async (req, res) => {
  const dbResults = await db.query(
    `UPDATE restaurants
      SET name = $1, location = $2, price_range = $3
      WHERE id = $4 RETURNING *;`,
    [req.body.name, req.body.location, req.body.price_range, req.params.id]
  );

  res.json({
    status: "success",
    data: {
      restaurants: dbResults.rows,
    },
  });
});

// Delete Restaurant
router.delete("/:id", async (req, res) => {
  await db.query(
    `DELETE FROM restaurants
      WHERE id = $1;`,
    [req.params.id]
  );
  res.status(204).send();
});

module.exports = router;
