import { Link } from "react-router-dom";
import "./ApiVaccine.css";

export default function ApiVaccine({ wuwu }) {
  const [age, vaccines] = wuwu;

  return (
    wuwu.length && (
      <div className="dropdown">
        <button className="dropbtn">
          {" "}
          <img
            src="/Vaccine Age Symbol.png"
            alt="Vaccination Period"
            className="vaccinePic"
          ></img>
          {age}
        </button>
        <div className="dropdown-content">
          {vaccines.map((vaccine) => {
            return (
              <Link to={"/vaccines"}>
                <h4>{vaccine.vaccineName}</h4>
              </Link>
            );
          })}
        </div>
      </div>
    )
  );
}
