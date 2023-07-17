import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import familyService from "../../services/family.service";
import ChildCard from "../../components/Child/ChildCard";
import moment from "moment";
import "./AppointmentsPage.css";

export default function AppointmentsPage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [children, setChildren] = useState([]);
  const { familyId } = useParams();

  const getFamily = () => {
    familyService
      .appointments(familyId)
      .then((response) => setChildren(response.data.children))
      .catch((error) => console.log(error));
  };

  // function edad(b) {
  //   let a = moment();
  //   b = moment(children?.birthdate.slice(0, 10));

  //   let years = a.diff(b, "year");
  //   let months = a.diff(b, "months");

  //   let days = a.diff(b, "days");

  //   let diffObj = {
  //     days: days,
  //     months: months,
  //     years: years,
  //   };

  //   return diffObj;
  // }

  // let as = edad(children?.birthdate.slice(0, 10));

  const renderChildren = () => {
    return (
      children && (
        <div className="saveBottom">
          <h2>Próximas citas:</h2>
          {children.map((child) => (
            <div key={child._id} {...child}>
              {/* <img src={child.childPic} alt="profile pic" />
          <p>{child.name}</p> */}
              {child.vaccines.map((vaccine) => (
                <div key={vaccine._id} {...vaccine} className="dates">
                  <img
                    src="/Syringe.png"
                    alt="vaccine pic"
                    className="vaccine"
                  />
                  <p className="status">{vaccine.status}</p>
                  <p>
                    {child.name}
                    {/* Edad de vacunación: {vaccine.vaccinationAge} -{" "} */}
                  </p>
                  <p>
                    {vaccine.vaccinationDate
                      ? "🗓 " + vaccine.vaccinationDate.slice(0, 10)
                      : "Debes fijar la cita"}
                  </p>
                </div>
              ))}
            </div>
          ))}
          <aside>*Powered by VaccApp</aside>
        </div>
      )
    );
  };

  useEffect(() => {
    getFamily();
  }, []);

  return children && renderChildren();
}
