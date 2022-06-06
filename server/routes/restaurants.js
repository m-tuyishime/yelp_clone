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
  const dbResults = await db.query(
    "SELECT * FROM restaurants WHERE id = $1;",
    [req.params.id]
  );

  if (dbResults.rowCount !== 0) {
    res.json({
      status: "success",
      dbResults: dbResults.rows.length,
      data: {
        restaurants: dbResults.rows,
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
      [req.query.name, req.query.location, req.query.price_range]
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
      [req.query.name, req.query.location, req.query.price_range, req.params.id]
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
      [req.query.name]
  );
  res.status(204).send();
});



module.exports = router;