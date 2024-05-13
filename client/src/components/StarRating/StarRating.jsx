import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./StarRating.css";
const StarRating = ({ rating, onChangeRating }) => {
  const starsRendering = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i <= rating ? "star active" : "star"}
          onClick={() => onChangeRating(i)}
        />
      );
    }
    return stars;
  };
  return <div>{starsRendering()}</div>;
};

export default StarRating;
