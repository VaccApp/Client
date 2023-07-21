import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import FamilyCard from "../../components/Family/FamilyCard";
import "./FamilyPage.css";
import familyService from "../../services/family.service";
import { useContext } from "react";
import "./FamilyPage.css";

export default function FamilyPage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [families, setFamilies] = useState([]);

  const getAllFamilies = () => {
    familyService
      .list()
      .then((response) => setFamilies(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllFamilies();
  }, []);

  const renderFamily = () => {
    return families.map((fam) => (
      <div key={fam._id} {...fam}>
        <div className="familyCard saveBottom">
          <h1>Familia {fam.surname}</h1>

          <div className="childCard center">
            <h4>
              Miembros de la familia: {fam.parents.length + fam.children.length}
            </h4>
            <hr></hr>
            <h4>Tutores: {fam.parents.length}</h4>
            <hr></hr>

            {fam.parents.map((each) => (
              <div key={each._id} {...each} className="pic">
                <h4>Nombre y contacto:</h4>
                <p>
                  {each.name} {fam.surname}
                </p>
                <p>
                  <i>{each.email}</i>
                </p>
              </div>
            ))}
            <hr></hr>

            <h4>Menores: {fam.children.length}</h4>
            {/* <Link to={`/family/${fam._id}/children`}>
              <button className="btn btn-warning">Ver</button>
            </Link> */}
            <hr></hr>

            {fam.children.map((child) => (
              <div key={child._id} {...child} className="pic">
                <Link to={`/child/${child._id}`}>
                  <div>
                    <img
                      src={`${child.childPic}`}
                      alt="child pic"
                      className="profile2"
                    />
                  </div>
                  <div className="childrencard">
                    <h2>{child.name}</h2>
                    <p>
                      Fecha de nacimiento: <br></br>
                      {child.birthdate.slice(0, 10)} <br></br>Vacunas:{" "}
                      {child.vaccines.length}
                    </p>
                  </div>

                  <hr></hr>
                </Link>
              </div>
            ))}
          </div>
          <aside>*Powered by Vaccap</aside>
        </div>
      </div>
    ));
  };

  return (
    families && (
      <div>
        <Link to="/family/create">
          <img src="/Añadir.png" alt="Add family" className="addButton" />
        </Link>

        {families.length > 0 ? (
          renderFamily()
        ) : (
          <div className="saveBottom">
            <img
              src="/noFamily.png"
              alt="Kid don't know"
              className="kidDefaultPic"
            />
            <p>Aún no has añadido a ningún hijo.</p>
            <button className="addChildButton">
              <Link to="/family/create">
                <img src="/Añadir.png" alt="Add family" className="addButton" />
              </Link>
            </button>
          </div>
        )}
      </div>
    )
  );
}
