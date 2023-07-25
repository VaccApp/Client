import "./VaccinesPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ApiVaccine from "../../components/Vaccine/ApiVaccine";

const API_URL = "https://vaccapp.fly.dev/";
const REALAPI_URL = "https://api-madrid.fly.dev";

export default function VaccinesPage() {
  const [vaccines, setVaccines] = useState([]);

  const getAllVaccines = () => {
    axios
      .get(`${REALAPI_URL}/vaccines`)
      .then(({ data }) => {
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

  // const renderVaccines = () => {
  //   return apiVaccines.map((vaccine) => (
  //     <div key={vaccine._id} {...vaccine} className="vaccine">
  //       <h4>{vaccine.vaccineName}</h4>
  //       <p>Descripción: {vaccine.description}</p>
  //       <p>Edad de vacunación: {vaccine.vaccinationAge}</p>
  //     </div>
  //   ));
  // };

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
