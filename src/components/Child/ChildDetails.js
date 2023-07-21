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
  const [vaccineArray, setVaccineArray] = useState([]);

  const getAChild = (id) => {
    childService
      .getOne(childId)
      .then((response) => setChild(response.data))
      .catch((error) => console.log(error));
  };

  // const getVacc = child?.healthcard;

  const getVaccines = (childId) => {
    childService
      .getVacc(childId)
      .then((response) => setChild(response.data))
      .then(() => {
        console.log(vaccineArray);
      })
      .catch((error) => console.log(error));
  };

  // console.log("WEEE", vaccineArray);

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

  // console.log("13", vaccineArray);

  function getMonths() {
    let meses = getAge() * 12;
    return meses;
  }
  console.log(child);

  useEffect(() => {
    getAChild();
  }, []);

  // useEffect(() => {
  //   getVaccines();
  // }, []);

  return (
    child && (
      <div className="saveBottom">
        <img src={child.childPic} alt="Child" className="profile" />
        <div>
          <h1>Información {child.name}:</h1>
          <p>
            Edad: {getAge()} años <i>({child.birthdate?.slice(0, 10)}) </i>
          </p>
          <p>Tarjeta sanitaria: {child.healthcard}</p>
          <p>
            Vacunas:{" "}
            {child.vaccines.length
              ? "Tiene " + child.vaccines.length
              : "No hay "}{" "}
            vacunas registradas
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


        {child.vaccines.length !== 0 ? (
          <div></div>
        ) : (
          <Link onClick={getVaccines} role="button" className="btn btn-warning">
            Añadir vacunas
          </Link>
        )}

        <VaccineAlert childId={childId} childName={child.name} />

        <aside>*Powered by VaccApp</aside>
      </div>
    )
  );
}
