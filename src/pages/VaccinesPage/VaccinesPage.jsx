import "./Vaccines.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ApiVaccine from "../../components/Vaccine/ApiVaccine";

const API_URL = "http://localhost:5005";
const REALAPI_URL = "http://localhost:4001/api";

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
  const wuwu = Object.entries(vaccines);

  useEffect(() => {
    getAllVaccines();
  }, []);

  // const renderVaccines = () => {
  //   return wuwu.map((vaccine) => (
  //     <div key={vaccine._id} {...vaccine} className="vaccine">
  //       <h4>{vaccine.vaccineName}</h4>
  //       <p>Descripción: {vaccine.description}</p>
  //       <p>Edad de vacunación: {vaccine.vaccinationAge}</p>
  //     </div>
  //   ));
  // };

  return (
    <div>
      {wuwu.map((elm, idx) => {
        return <ApiVaccine key={idx} wuwu={elm} />;
      })}
      <h1>Vaccines Page</h1>
      {/* {vaccines ? renderVaccines() : <p>No hay vacunas.</p>} */}
    </div>
  );
}
