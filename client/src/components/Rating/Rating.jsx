import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
const Rating = ({ rating }) => {
  return (
    <div>
      <span className="text-warning">
        <FontAwesomeIcon
          icon={rating >= 1 ? faStar : rating >= 0.5 ? faStarHalfAlt : null}
        />
      </span>
      <span className="text-warning">
        <FontAwesomeIcon
          icon={rating >= 2 ? faStar : rating >= 1.5 ? faStarHalfAlt : null}
        />
      </span>
      <span className="text-warning">
        <FontAwesomeIcon
          icon={rating >= 3 ? faStar : rating >= 2.5 ? faStarHalfAlt : null}
        />
      </span>
      <span className="text-warning">
        <FontAwesomeIcon
          icon={rating >= 4 ? faStar : rating >= 3.5 ? faStarHalfAlt : null}
        />
      </span>
      <span className="text-warning">
        <FontAwesomeIcon
          icon={rating >= 5 ? faStar : rating >= 4.5 ? faStarHalfAlt : null}
        />
      </span>
    </div>
  );
};

export default Rating;
