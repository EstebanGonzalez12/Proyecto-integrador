import React from "react";
import { Link } from "react-router-dom";

const DestinationCard = ({ image, name }) => {
  return (
    <div className="destination-card">
      <img src={image} alt={name} className="destination-image" />
      <Link to={`/${name.toLowerCase().replace(/\s+/g, "-")}`}>
        <button className="destination-button">{name}</button>
      </Link>
    </div>
  );
};

export default DestinationCard;
