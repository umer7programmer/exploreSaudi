import React, { useState } from "react";
import StarRating from "../StarRating/StarRating";
import axios from "axios";
import { toast } from "react-toastify";

const Reviews = ({ sellerId }) => {
  const [rating, setRating] = useState(0);
  const [reviewsText, setReviewsText] = useState("");

  //handleChangeRating
  const handleChangeRating = (newRating) => {
    setRating(newRating);
  };
  //handleChangeReview
  const handleChangeReview = (e) => {
    setReviewsText(e.target.value);
  };

  //submit reviews
  const submitReviews = async () => {
    try {
      if (rating === 0) {
        alert("Please select a rating");
        return;
      }

      const res = await axios.post("http://localhost:8080/api/v1/user/rating", {
        sellerId: sellerId,
        rating,
        reviews: reviewsText,
      });
      if (res?.data?.success) {
        toast.success(res.data.message);
        setRating(0);
        setReviewsText("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <div className="d-flex flex-column gap-3 my-2">
      <h6>Add Reviews</h6>
      <StarRating rating={rating} onChangeRating={handleChangeRating} />
      <textarea
        value={reviewsText}
        onChange={(e) => handleChangeReview(e)}
        placeholder="Write your reviews"
        rows="5"
        required
      />
      <button
        onClick={submitReviews}
        className="btn text-light w-50"
        style={{ background: "#1dbf73" }}
      >
        Submit Review
      </button>
    </div>
  );
};

export default Reviews;
