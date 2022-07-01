require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const restaurantsRouter = require("./routes/restaurants");

const app = express();
const PORT = process.env.PORT || 3005;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());
app.use("/api/v1/restaurants", restaurantsRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
