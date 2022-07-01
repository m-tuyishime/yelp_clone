import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  return (
    <div className="row-cols-3 row mb-2">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="card text-white bg-primary mb-3 me-4"
          style={{ maxWidth: "30%" }}
        >
          <div className="card-header d-flex justify-content-between">
            <span>{review.name}</span>
            <span>
              <StarRating rating={review.rating} />
            </span>
          </div>
          <div className="card-body">
            <p className="card-text">{review.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
