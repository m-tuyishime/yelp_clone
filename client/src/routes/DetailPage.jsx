import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../api/RestaurantFinder";
import StarRating from "../components/StarRating";
import { RestaurantsContext } from "../context/RestaurantsContext";

export const DetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurants[0]);
      };

      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);
  return <div>{selectedRestaurant && <StarRating rating={2.3} />}</div>;
};
