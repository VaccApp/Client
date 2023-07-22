import "./ChildCard.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function ChildCard({
  _id,
  name,
  birthdate,
  healthcard,
  vaccines,
  edad,
  childPic,
  family,
}) {
  function edad(b) {
    let a = moment();
    b = moment(birthdate.slice(0, 10));

    let years = a.diff(b, "year");
    let months = a.diff(b, "months");

    let days = a.diff(b, "days");

    let diffObj = {
      days: days,
      months: months,
      years: years,
    };

    return diffObj;
  }

  let as = edad(birthdate.slice(0, 10));

  console.log(_id);

  // const { childId } = useParams();
  return (
    <div className="childCard">
      <Link to={`/child/${_id}`}>
        <div className="pic">
          <img src={`${childPic}`} alt="child pic" className="profile2" />
        </div>

        <div className="childrencard">
          <h2>{name}</h2>
          <p>Fecha de nacimiento: {birthdate.slice(0, 10)}</p>
          <p>
            Edad:{" "}
            {as.years > 1
              ? as.years + " años"
              : as.months > 0
              ? as.months + " meses"
              : as.days + " días"}
          </p>
          {/* <p>
          Próximas citas:{" "}
          {vaccines
            ? vaccines.map((vaccine) => {
                return <p>{vaccine.vaccinationDate}</p>;
              })
            : "No hay citas programadas"}{" "}
        </p> */}
          {/* <h4>Tarjeta sanitaria: {healthcard}</h4> */}
          {/* <h4>Vacunas:</h4>
        {vaccines.map((vaccine) => (
          <div key={vaccine._id} {...vaccine}>
            <h4>{vaccine.name}</h4>
            <p>{vaccine.status}</p>
          </div>
        ))} */}
        </div>
      </Link>
      {/* <Link to={`/family/${family}/children/`}>Volver a hijos</Link> */}
    </div>
  );
}
