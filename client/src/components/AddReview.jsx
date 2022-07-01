import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import RestaurantFinder from "../api/RestaurantFinder";

const AddReview = ({ setReviews }) => {
  const [name, setName] = useState("");
  const [review, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await RestaurantFinder.post(`/${id}/addReview`, {
      name,
      review,
      rating,
    });
    setReviews("");
    setName("");
    setReviewText("");
    setRating("");
  };

  return (
    <div className="mb-2">
      <form action="" onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="name"
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="form-select"
              required
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea
            value={review}
            onChange={(e) => setReviewText(e.target.value)}
            id="Review"
            className="form-control"
          ></textarea>
        </div>
        <button className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
};

export default AddReview;
