import { Link } from "react-router-dom";
import "./ApiVaccine.css";

export default function ApiVaccine({ apiVaccines }) {
  const [age, vaccines] = apiVaccines;

  return (
    apiVaccines.length && (
      <div className="dropdown">
        <button className="dropbtn">
          {" "}
          <img
            src="/Vaccine Age Symbol.jpg"
            alt="Vaccination Period"
            className="vaccinePic"
          ></img>
          {/* {age} meses */}
          {age > 15 ? age / 12 + " años" : age + " meses"}
        </button>
        <div className="dropdown-content">
          {vaccines.map((vaccine) => {
            return (
              <Link to={`/vaccines/${vaccine._id}`}>
                <h4>{vaccine.vaccineName}</h4>
              </Link>
            );
          })}
        </div>
      </div>
    )
  );
}
