import "./Vaccines.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

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
  }, []);

  console.log(vaccineId);

  return (
    <div className="vaccineDetails">
      <table className="vaccine">
        <tbody>
          <tr>
            <td>Nombre:</td>
            <td>Enfermedad:</td>
            <td>Dosis:</td>
          </tr>
          <tr>
            <td>{vaccine.name}</td>
            <td>{vaccine.disease}</td>
            <td>{vaccine.dose}</td>
          </tr>
          <tr>
            <td>Fabricante:</td>
            <td>Nº serie:</td>
            <td>Caducidad:</td>
          </tr>
          <tr>
            <td>{vaccine.creator}</td>
            <td>{vaccine.batch}</td>
            <td>{vaccine.expires}</td>
          </tr>
        </tbody>
      </table>

      <Link to={`/vaccines/${vaccineId}/edit`}>
        <button className="volver">Editar</button>
      </Link>

      <Link to={"/vaccines"}>
        <button className="volver">Atrás</button>
      </Link>
    </div>
  );
}
