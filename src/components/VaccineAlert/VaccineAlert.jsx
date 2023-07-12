import "./VaccineAlert.css";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import childService from "../../services/child.service";

function VaccineAlert({ childId }) {
  const [vaccines, setVaccines] = useState([]);

  console.log(vaccines);

  useEffect(() => {
    const getVaccines = () => {
      childService
        .vaccinesAlert(childId)
        .then((response) => setVaccines(response.data))
        .catch((error) => console.log(error));
    };
    getVaccines();
  }, [childId]);

    const renderVaccine = () => {
      return (
        vaccines && (
          <div>
            {vaccines.map((vaccine) => (
              <div key={vaccine._id} {...vaccine}>
                <p>Vacuna: {vaccine.vaccineName}</p>
              </div>
            ))}
          </div>
        )
      );
    };

  return (
    vaccines && (
      <div>
        <h1>Vaccine Alert</h1>
        {vaccines && renderVaccine()}
      </div>
    )
  );
}

export default VaccineAlert;
