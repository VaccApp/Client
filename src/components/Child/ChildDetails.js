import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import childService from "../../services/child.service";
import VaccineCard from "../Vaccine/VaccineCard";
import "./ChildDetails.css";
import VaccineAlert from "../VaccineAlert/VaccineAlert";

const API_URL = "http://localhost:5005";

export default function ChildDetails(props) {
  const [child, setChild] = useState(null);
  const { childId } = useParams();

  const getAChild = (id) => {
    childService
      .getOne(childId)
      .then((response) => setChild(response.data))
      .catch((error) => console.log(error));
  };

  function getAge() {
    let hoy = new Date();
    let cumple = new Date(child.birthdate);
    let edad = hoy.getFullYear() - cumple.getFullYear();
    var m = hoy.getMonth() - cumple.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) {
      edad--;
    }
    return edad;
  }

  function getMonths() {
    let meses = getAge() * 12;
    return meses;
  }

  useEffect(() => {
    getAChild();
  }, []);

  return (
    child && (
      <div className="saveBottom">
        <img src={child.childPic} alt="Child" className="profile" />
        <div>
          <h1>Vacunas {child.name}:</h1>
          <p>
            {child.birthdate?.slice(0, 10)} - {getAge()} años
          </p>
        </div>
        <div className="apart">
          <Link
            to={`/child/${child._id}/vaccinate`}
            role="button"
            className="btn btn-primary"
          >
            Vacunar con formulario
          </Link>
          <Link
            to={`/child/${child._id}/qr`}
            role="button"
            className="btn btn-danger"
          >
            Vacunar con QR
          </Link>
        </div>
        {child.vaccines?.map((vaccine) => {
          return (
            <div
              key={vaccine._id}
              {...vaccine}
              childId={childId}
              className="vaccines"
            >
              <div className="tituloVacuna">
                <img src="/Syringe.png" alt="vacuna" className="vacuna" />

                <h4>{vaccine.name}</h4>
                <Link to={`/child/vaccine/${vaccine._id}`}>
                  Ver info de la vacuna
                </Link>
              </div>
            </div>
          );
        })}
        <VaccineAlert childId={childId} childName={child.name} />
        <aside>*Powered by VaccApp</aside>
      </div>
    )
  );
}
