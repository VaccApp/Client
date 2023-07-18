import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import centerService from "../../services/center.service";
import Map from "../../components/Map/Map";

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
    const centersLatitude = centers["@graph"].map((center) => center.location.latitude);
    const centersLongitude = centers["@graph"].map((center) => center.location.longitude);

    return centers["@graph"].map((center, index) => {
      return (
        <div key={center["@id"]} className="center-card">
          <h4>
            <Link to={centersWeb[index]}>{centersTitles[index]}</Link>
          </h4>
          <p>
            {centersAdresses[index]}, {centersZipCodes[index]}
          </p>
          <p>Latitud: {centersLatitude[index]}</p>
          <p>Longitud: {centersLongitude[index]}</p>
          {/* <Map lng={centersLongitude[index]} lat={centersLatitude[index]} /> */}
          {/* <Map lng={-3.7} lat={40.4} htmlId={index} /> */}
          <hr />
        </div>
      );
    });
  };

  return (
    centers && (
      <div className="centers-page">
        <h1>Centros de vacunación</h1>
        <Map lng={-3.7} lat={40.42} />
        <hr />
        <div className="centers-container">{renderCenters()}</div>
      </div>
    )
  );
}
