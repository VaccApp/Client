import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import centerService from "../../services/center.service";
import Map from "../../components/Map/Map";

export default function CentersPage() {
  const [centers, setCenters] = useState("");
  const [chosenCenter, setChosenCenter] = useState("");

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
    const centersLatitude = centers["@graph"].map(
      (center) => center.location.latitude
    );
    const centersLongitude = centers["@graph"].map(
      (center) => center.location.longitude
    );

    return centers["@graph"].map((center, index) => {
      return (
        <div key={center["@id"]} className="center-card">
          <div className="center-card-header">
            <input
              type="radio"
              name="center"
              style={{ cursor: "pointer" }}
              className="form-check-input"
              onChange={() => {
                setChosenCenter(center);
                console.log("Centro elegido", chosenCenter);
              }}
            />
            <h4>
              <Link to={centersWeb[index]}>
                {index + 1}
                {". "}
                {centersTitles[index]}
              </Link>
            </h4>
          </div>
          <p>
            {centersAdresses[index]}, {centersZipCodes[index]}
          </p>
          <p>Latitud: {centersLatitude[index]}</p>
          <p>Longitud: {centersLongitude[index]}</p>
          <hr />
        </div>
      );
    });
  };

  return (
    centers && (
      <div className="centers-page saveBottom saveTop">
        <div className="apano">
          <img src="/Calendar.png" alt="apano" className="apano"></img>
          <p>...</p>
          <p>...</p>
          <p>...</p>

          <p>...</p>
        </div>
        <div className="white fixed-top">
          {/* <h1 className="wei">Centros de vacunación</h1> */}
          {!chosenCenter && (
            <Map
              lng={-3.7033387}
              lat={40.4167278}
              chosenCenter={chosenCenter}
            />
          )}
          {chosenCenter && (
            <Map
              lng={chosenCenter.location.longitude}
              lat={chosenCenter.location.latitude}
              chosenCenter={chosenCenter}
            />
          )}
          <p>{chosenCenter.title}</p>
        </div>

        <hr />
        <div className="centers-container">{renderCenters()}</div>
      </div>
    )
  );
}
