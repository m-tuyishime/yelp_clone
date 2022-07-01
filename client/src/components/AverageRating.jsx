import React from "react";
import StarRating from "./StarRating";

const AverageRating = ({ restaurant, showZero }) => {
  if (!restaurant.count && !showZero) {
    return <span className="text-warning">0 reviews</span>;
  }
  return (
    <>
      <StarRating rating={restaurant.average_rating} />
      <span className="text-warning ml-1">({restaurant.count || 0})</span>
    </>
  );
};

export default AverageRating;
