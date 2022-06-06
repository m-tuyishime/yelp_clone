import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RestaurantDetails } from "./routes/RestaurantDetails";
import { UpdateRestaurant } from "./routes/UpdateRestaurant";
import Home from "./routes/Home";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className="container">
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
    </RestaurantsContextProvider>
  );
};

export default App;
