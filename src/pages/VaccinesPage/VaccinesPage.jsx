import "./Vaccines.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  return (
    <table className="vaccines">
      {vaccines.map((vaccine) => (
        <Link to={`/vaccines/${vaccine._id}`}>
          <div key={vaccine._id} {...vaccine} className="vaccine">
            <tr>
              <td>Enfermedad: {vaccine.disease}</td>
              <td>Estado: {vaccine.status}</td>
            </tr>
            <tr>
              <td>Vacuna: {vaccine.name}</td>
              <td>Dosis: {vaccine.dose}</td>
            </tr>
          </div>
        </Link>
      ))}
    </table>
  );
}
