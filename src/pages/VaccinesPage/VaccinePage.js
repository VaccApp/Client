import "./VaccinePage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = "https://vaccapp.fly.dev";

export default function VaccinePage(props) {
  const [vaccine, setVaccine] = useState([]);
  const { vaccineId } = useParams();

  const getAVaccine = () => {
    axios
      .get(`${API_URL}/vaccines/${vaccineId}`)
      .then((response) => {
        const oneVaccine = response.data;
        setVaccine(oneVaccine);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAVaccine();
  }, [vaccineId]);

  console.log(vaccine);

  return (
    <div className="saveBottom">
      <div className="flex">
        <img src="/Syringe.png" alt="vacuna" className="vacuna2" />
        <h3>{vaccine.vaccineName}</h3>
      </div>
      <div className="infoText">
        <h4>Descripción</h4>
        <p>{vaccine.description}</p>
      </div>
      <aside>* Powered by VaccApp</aside>
    </div>
  );
}
