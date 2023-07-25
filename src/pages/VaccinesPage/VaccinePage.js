import "./VaccinePage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import vaccineApiService from "../../services/api.service";

// const REALAPI_URL = "https://api-madrid.fly.dev";

export default function VaccinePage(props) {
  const [vaccine, setVaccine] = useState([]);
  const { vaccineId } = useParams();

  const getOneVaccine = (vaccineId) => {
    vaccineApiService
      .getAVaccine(vaccineId)
      .then((response) => {
        const oneVaccine = response.data;
        console.log("oneVaccine", oneVaccine);
        setVaccine(oneVaccine);
      })
      .catch((error) => console.log(error));
  };

  console.log("VAC2C", vaccine);

  useEffect(() => {
    getOneVaccine();
  }, [vaccineId]);

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
