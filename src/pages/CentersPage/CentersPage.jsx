import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import centerService from "../../services/center.service";

export default function CentersPage() {
  const [centers, setCenters] = useState("");

  useEffect(() => {
    const getCenters = () => {
      centerService
        .getAll()
        .then((response) => setCenters(response.data))
        .catch((error) => console.log(error));
    };
    getCenters();
  }, []);

  console.log("Array de centros", centers["@graph"]);

  const renderCenters = () => {
    const centersTitles = centers["@graph"].map((center) => center.title);
    const centersAdresses = centers["@graph"].map(
      (center) => center.address["street-address"]
    );
    const centersZipCodes = centers["@graph"].map(
      (center) => center.address["postal-code"]
    );
    const centersWeb = centers["@graph"].map((center) => center.relation);

    return centers["@graph"].map((center, index) => {
      return (
        <div key={center["@id"]} className="center-card">
          <h4>
            <Link to={centersWeb[index]}>{centersTitles[index]}</Link>
          </h4>
          <p>
            {centersAdresses[index]}, {centersZipCodes[index]}
          </p>
          <hr />
        </div>
      );
    });
  };

  return (
    centers && (
      <div className="centers-page">
        <h1>Centros de vacunación</h1>
        <hr />
        <div className="centers-container">{renderCenters()}</div>
      </div>
    )
  );
}
