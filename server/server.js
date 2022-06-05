require("dotenv").config();
const express = require("express");

const restaurantsRouter = require('./routes/restaurants');


const app = express();
const PORT = process.env.PORT || 3005;

app.use('/api/v1/restaurants', restaurantsRouter);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
