import "./VaccineAlert.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import childService from "../../services/child.service";

function VaccineAlert({ childId, childName }) {
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
              <p>💉 {vaccine.vaccineName}</p>
            </div>
          ))}
        </div>
      )
    );
  };

  return (
    vaccines && (
      <div>
        {vaccines.length === 0 && (
          <h3>No hay vacunación el próximo mes para {childName}</h3>
        )}
        {vaccines.length > 0 && (
          <div>
            <h3>Próximas vacunas de {childName}</h3>
            {renderVaccine()}
          </div>
        )}
        <Link to="/citas">Ver citas</Link>
      </div>
    )
  );
}

export default VaccineAlert;
