import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../api/RestaurantFinder";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import { RestaurantsContext } from "../context/RestaurantsContext";

export const DetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant, reviews, setReviews } =
    useContext(RestaurantsContext);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurants[0].name);
        setReviews(response.data.data.reviews);
      };

      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, [selectedRestaurant, reviews]);

  return (
    <div>
      {selectedRestaurant && reviews && (
        <>
          <h1 className="text-center display-1">{selectedRestaurant}</h1>
          <div className="mt-3">
            <Reviews reviews={reviews} />
          </div>
          <AddReview setReviews={setReviews} />
        </>
      )}
    </div>
  );
};
