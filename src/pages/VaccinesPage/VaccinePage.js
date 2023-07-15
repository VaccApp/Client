import "./VaccinePage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";
const REALAPI_URL = "http://localhost:4001/api";

export default function VaccinePage(props) {
  const [vaccine, setVaccine] = useState([]);
  const { vaccineId } = useParams();

  const getAVaccine = () => {
    axios
      .get(`${REALAPI_URL}/vaccines/${vaccineId}`)
      .then((response) => {
        const oneVaccine = response.data;
        setVaccine(oneVaccine);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAVaccine();
  }, []);

  console.log(vaccine);

  return (
    <div>
      <div className="flex">
        <img src="/Syringe.png" alt="vacuna" />
        <h3>{vaccine.vaccineName}</h3>
      </div>
      <div className="infoText">
        <h4>Descripción</h4>
        <p>{vaccine.description}</p>
      </div>
    </div>
    // <div className="vaccineDetails">
    //   <table className="vaccine">
    //     <tbody>
    //       <tr>
    //         <td>Nombre: {vaccine.vaccineName}</td>
    //         <td>Descripción: {vaccine.description}</td>
    //         <td>Edad de vacunación: {vaccine.vaccinationAge}</td>
    //       </tr>
    //     </tbody>
    //   </table>

    //   {/* <Link to={`/vaccines/${vaccineId}/edit`}>
    //     <button className="volver">Editar</button>
    //   </Link> */}

    //   <Link to={"/vaccines"}>
    //     <button className="volver">Atrás</button>
    //   </Link>
    // </div>
  );
}
