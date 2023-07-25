import "./VaccinesPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ApiVaccine from "../../components/Vaccine/ApiVaccine";
import vaccineApiService from "../../services/api.service";
// const REALAPI_URL = "https://api-madrid.fly.dev/api";

export default function VaccinesPage() {
  const [vaccines, setVaccines] = useState([]);

  const getAllVaccines = () => {
    vaccineApiService
      .getVaccines()
      .then(({ data }) => {
        console.log("DAATA", data);
        const sortedVaccines = data.reduce((acc, val) => {
          if (acc.hasOwnProperty(val.vaccinationAge)) {
            acc[val.vaccinationAge].push(val);
          } else {
            acc[val.vaccinationAge] = [];
            acc[val.vaccinationAge].push(val);
          }
          return acc;
        }, {});
        setVaccines(sortedVaccines);
      })

      .catch((error) => console.log(error));
  };
  const apiVaccines = Object.entries(vaccines);
  console.log(apiVaccines);

  useEffect(() => {
    getAllVaccines();
  }, []);

  return (
    <div className="saveBottom">
      <h1>Vacunación en la comunidad de Madrid</h1>

      {apiVaccines.map((elm, idx) => {
        return <ApiVaccine key={idx} apiVaccines={elm} />;
      })}
      <aside>*Powered by VaccApp</aside>
    </div>
  );
}
