import "./Vaccines.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import VaccineCard from "../../components/Vaccine/VaccineCard";
import ApiVaccine from "../../components/Vaccine/ApiVaccine";

const API_URL = "http://localhost:5005";
const REALAPI_URL = "http://localhost:4001/api";

export default function VaccinesPage() {
  const [vaccines, setVaccines] = useState([]);

  const getAllVaccines = () => {
    axios
      .get(`${REALAPI_URL}/vaccines`)
      .then((response) => {
        const sortedVaccines = response.data;
        sortedVaccines.sort(function (a, b) {
          if (a.vaccinationAge > b.vaccinationAge) {
            return 1;
          }
          if (a.vaccinationAge < b.vaccinationAge) {
            return -1;
          }
          return 0;
        });
        setVaccines(sortedVaccines);
      })

      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllVaccines();
  }, []);

  const renderVaccines = () => {
    return vaccines.map((vaccine) => (
      <div key={vaccine._id} {...vaccine} className="vaccine">
        <h4>{vaccine.vaccineName}</h4>
        <p>Descripción: {vaccine.description}</p>
        <p>Edad de vacunación: {vaccine.vaccinationAge}</p>
      </div>
      // esto no se si va aquí: refreshVaccines={getAllVaccines}
    ));
  };

  return (
    <div>
      <ApiVaccine />
      <h1>Vaccines Page</h1>
      {vaccines.length > 0 ? renderVaccines() : <p>No hay vacunas.</p>}
    </div>
  );
}
