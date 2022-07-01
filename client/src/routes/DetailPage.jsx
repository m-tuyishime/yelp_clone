import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../api/RestaurantFinder";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import { RestaurantsContext } from "../context/RestaurantsContext";

export const DetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data);
      };

      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurant.restaurants[0].name}
          </h1>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};
