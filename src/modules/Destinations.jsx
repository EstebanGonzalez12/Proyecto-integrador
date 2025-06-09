import React, { useState } from "react";
import DestinationCard from "../components/DestinationCard";
import { images } from "../assets/images";
import "./Destinations.css";
import Barra from "../components/Barra";

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const destinations = [
    { name: "Cartagena", image: images.cartagena },
    { name: "Madrid", image: images.madrid },
    { name: "Punta Cana", image: images.puntacana },
    { name: "Rio de Janeiro", image: images.rio },
    { name: "Lima", image: images.lima },
    { name: "Ciudad de Panama", image: images.panama },
    
  ];

  return (
    <>
      <Barra onSearch={setSearchTerm} />
      <div className="destinations-container">
        {destinations
          .filter((dest) =>
            dest.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((dest, idx) => (
            <DestinationCard key={idx} {...dest} />
          ))}
      </div>
    </>
  );
};

export default Destinations;
