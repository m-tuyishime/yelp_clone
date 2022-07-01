const db = require("../db");
const express = require("express");
const router = express.Router();

// GET
const getRestaurantQuery = `SELECT * 
FROM restaurants
LEFT JOIN (
  SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating
  FROM reviews
  GROUP BY restaurant_id
) reviews
ON restaurants.id = reviews.restaurant_id`;

// Get all restaurants
router.get("/", async (req, res) => {
  const restaurants = await db.query(getRestaurantQuery + ";");
  res.json({
    status: "success",
    dbResults: restaurants.rows.length,
    data: {
      restaurants: restaurants.rows,
    },
  });
});

// Get a restaurant
router.get("/:id", async (req, res) => {
  const restaurants = await db.query(getRestaurantQuery + " WHERE id = $1;", [
    req.params.id,
  ]);

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

// POST
// Create a restaurant
router.post("/", async (req, res) => {
  const { name, location, price_range } = req.body;
  const dbResults = await db.query(
    `INSERT INTO restaurants (name, location, price_range)
      VALUES ($1, $2, $3) RETURNING *;`,
    [name, location, price_range]
  );

  res.status(201).json({
    status: "success",
    data: {
      restaurants: dbResults.rows,
    },
  });
});

// Create a review
router.post("/:id/addReview", async (req, res) => {
  const { name, review, rating } = req.body;
  const dbResults = await db.query(
    `INSERT INTO reviews (restaurant_id, name, review, rating)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`,
    [req.params.id, name, review, rating]
  );
  res.status(201).json({
    status: "success",
    data: {
      review: dbResults.rows,
    },
  });
});

// PUT
// Update restaurants
router.put("/:id", async (req, res) => {
  const { name, location, price_range } = req.body;
  const dbResults = await db.query(
    `UPDATE restaurants
      SET name = $1, location = $2, price_range = $3
      WHERE id = $4 RETURNING *;`,
    [name, location, price_range, req.params.id]
  );

  res.json({
    status: "success",
    data: {
      restaurants: dbResults.rows,
    },
  });
});

// DELETE
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
