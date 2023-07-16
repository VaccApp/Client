import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import childService from "../../services/child.service";
import VaccineCard from "../Vaccine/VaccineCard";

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

  console.log("Child details", child);
  return (
    child && (
      <div>
        <h1>Información de {child.name}:</h1>
        <h2>Fecha de nacimiento: {child.birthdate.slice(0, 10)}</h2>
        <h2>Edad: {getAge()} años</h2>
        <Link
          to={`/child/${child._id}/vaccinate`}
          role="button"
          className="btn btn-primary"
        >
          Vacunar
        </Link>
        <h3>Vacunas: </h3>
        {child.vaccines.map((vaccine) => {
          return <VaccineCard key={vaccine._id} {...vaccine} />;
        })}

        <Link to={`/child/${child._id}/children`}>
          <h2>Hijos:</h2>
        </Link>
      </div>
    )
  );
}
