import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import familyService from "../../services/family.service";
import ChildCard from "../../components/Child/ChildCard";
import moment from "moment";
import "./AppointmentsPage.css";
import { Button } from "bootstrap";

export default function AppointmentsPage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [children, setChildren] = useState([]);
  const [filteredChild, setFilteredChild] = useState(null);
  const { familyId } = useParams();

  const getFamily = () => {
    familyService
      .appointments(familyId)
      .then((response) => setChildren(response.data.children))
      .catch((error) => console.log(error));
  };

  function filterChild(childName) {
    let filteredChild = children.filter((child) => child.name === childName);
    return filteredChild;
  }

  function handleChild(e) {
    e.preventDefault();
    let childName = e.target.value;
    childName !== "Todos"
      ? setFilteredChild(filterChild(childName))
      : setFilteredChild(getFamily());
  }

  const renderChildren = () => {
    return (
      children && (
        <div className="saveBottom">
          <h1>Próximas citas:</h1>
          <div>
            <button className="filter"> + Filtros</button>

            {children.map((child) => {
              return (
                <button
                  key={child._id}
                  {...child}
                  className="filter"
                  value={child.name}
                  onClick={handleChild}
                >
                  {child.name}
                </button>
              );
            })}
            <button value="Todos" className="filter">
              {" "}
              Todos
            </button>
          </div>
          {children.map((child) => (
            <div key={child._id} {...child}>
              {child.vaccines.map((vaccine) => (
                <div key={vaccine._id} {...vaccine} className="dates">
                  <aside className="centrado">{vaccine.vaccinationAge}</aside>
                  <img
                    src="/Syringe.png"
                    alt="vaccine pic"
                    className=" vacuna3"
                  />
                  <p className="status">
                    <i>{vaccine.status}</i>
                  </p>
                  <p>{child.name}</p>
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
