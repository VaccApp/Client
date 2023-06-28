import "./Vaccines.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { render } from "@testing-library/react";
import VaccineCard from "../../components/Vaccine/VaccineCard";

const API_URL = "http://localhost:5005";

export default function VaccinesPage() {
  const [vaccines, setVaccines] = useState([]);

  const getAllVaccines = () => {
    axios
      .get(`${API_URL}/vaccines`)
      .then((response) => setVaccines(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllVaccines();
  }, []);

  const renderVaccines = () => {
    return vaccines.map((vaccine) => (
      <VaccineCard
        key={vaccine._id}
        {...vaccine}
        // esto no se si va aquí: refreshVaccines={getAllVaccines}
      />
    ));
  };

  return (
    <div>
      <h1>Vaccines Page</h1>
      {vaccines.length > 0 ? renderVaccines() : <p>No hay vacunas.</p>}
    </div>
  );
}
