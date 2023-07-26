import "./VaccineAlert.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import childService from "../../services/child.service";

function VaccineAlert({ childId, childName, familyId }) {
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    const getVaccines = () => {
      childService
        .vaccinesAlert(childId)
        .then((response) => setVaccines(response.data))
        .catch((error) => console.log(error));
    };
    getVaccines();
  }, [childId]);

  console.log(vaccines);

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
      <div style={{ marginTop: "20px" }}>
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          ¿Qué vacunas tocan el próximo mes?
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                {vaccines.length === 0 && (
                  <h5 className="modal-title" id="exampleModalLabel">
                    No hay vacunación el próximo mes para {childName}
                  </h5>
                )}
                {vaccines.length > 0 && (
                  <h5 className="modal-title" id="exampleModalLabel">
                    Próximas vacunas de {childName}
                  </h5>
                )}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {vaccines.length > 0 && renderVaccine()}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Entendido
                </button>
                <Link
                  to={`/family/${familyId}/appointments`}
                  role="button"
                  className="btn btn-primary"
                >
                  Ver citas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default VaccineAlert;
