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
const API_URL = "http://localhost:3000";

export default function AppointmentsPage() {
  const [children, setChildren] = useState([]);
  const [selectedChild, setselectedChild] = useState([]);
  const { familyId } = useParams();

  const getFamily = () => {
    familyService
      .appointments(familyId)
      .then(({ data }) => {
        setChildren(data.children);
        setselectedChild(data.children);
      })
      .catch((error) => console.log(error));
  };

  console.log("CHILDREN", selectedChild);

  const filterChild = (display) => {
    if (display === "Todos") {
      setselectedChild(children);
      return;
    }
    const filteredChild = children.filter((child) => child.name === display);
    return setselectedChild(filteredChild);
  };

  // const filteredChildren = children.filter(
  //   (filtredChild) => filtredChild.name ===
  // );

  // function handleChild(e) {
  //   setFiltredChild(e.target.value);
  //   filtredChild !== "Todos"
  //     ? setFiltredChild(filterChild(e.target.value))
  //     : setFiltredChild(getFamily());
  // }

  const renderChildren = () => {
    return children ? (
      <div className="saveBottom">
        <h1>Próximas citas:</h1>
        <div>
          <button className="filter"> + Filtros</button>

          {children ? (
            children.map((child) => {
              return (
                <button
                  // key={child}
                  {...child}
                  className="filter"
                  value={child.name}
                  onClick={() => filterChild(child.name)}
                >
                  {child.name}
                </button>
              );
            })
          ) : (
            <div></div>
          )}

          <button
            value="Todos"
            className="filter"
            onClick={() => filterChild("Todos")}
          >
            Todos
          </button>
        </div>

        {selectedChild.map((child) => (
          <div key={child._id} {...child}>
            {child.vaccines.length > 0 ? (
              child.vaccines.map((vaccine) => (
                <div key={vaccine._id} {...vaccine} className="dates">
                  {/* <aside className="centrado">{vaccine.vaccinationAge}</aside> */}
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
              ))
            ) : (
              <div className="dates">
                <p>
                  No has programado ninguna cita de vacunación para {child.name}
                  , con la tarjeta sanitaria: {child.healthcard}.
                </p>
                <Link to={`${API_URL}/child/${child._id}`}>
                  <button className="btn btn-primary">Hazlo aquí</button>
                </Link>
              </div>
            )}
          </div>
        ))}

        <aside>*Powered by VaccApp</aside>
      </div>
    ) : (
      <div className="noChildren">
        <p>Aún no has añadido a tus hijos.</p>
        <Link to={`${API_URL}/family/${familyId}/children`}>
          <button className="btn btn-primary">Añádelos aquí</button>
        </Link>
      </div>
    );
  };

  useEffect(() => {
    getFamily();
  }, []);

  return children && renderChildren();
}
