import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import centerService from "../../services/center.service";

export default function CentersPage() {
  const [centers, setCenters] = useState(null);

  useEffect(() => {
    const getCenters = () => {
      centerService
        .getAll()
        .then((response) => setCenters(response.data))
        .catch((error) => console.log(error));
    };
    getCenters();
  }, []);

  console.log("Aquiiiii", centers);

  const renderCenters = () => {
    const centersTitles = Object.values(centers).map((center) => center.title);

    return centersTitles.map((title) => {
      return (
        <div key={title}>
          <p>Nombre: {title}</p>
        </div>
      );
    });
  };

  return (
    <div>
      <h1>Centers Page</h1>
      {centers && renderCenters()}
      {Object.keys(centers)}
    </div>
  );
}
