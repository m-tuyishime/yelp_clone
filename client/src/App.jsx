import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RestaurantDetails } from "./routes/RestaurantDetails";
import { UpdateRestaurant } from "./routes/UpdateRestaurant";
import { Home } from "./routes/Home";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/restaurants/:id/update"
            element={<UpdateRestaurant />}
          />
          <Route
            exact
            path="/restaurants/:id"
            element={<RestaurantDetails />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
