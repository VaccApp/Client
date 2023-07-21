import "./FamilyCard.css";
import { Link } from "react-router-dom";

export default function FamilyCard({
  surname,
  parents,
  children,
  _id,
  API_URL,
}) {
  return (
    <div className="familyCard saveBottom">
      <Link to={`/${_id}`}>
        <h1>Familia {surname}</h1>
      </Link>
      <div className="childCard center">
        <h4>Miembros de la familia: {parents.length + children.length}</h4>
        <hr></hr>
        <h4>Tutores: {parents.length}</h4>
        <hr></hr>

        {parents.map((each) => (
          <div key={each._id} {...each} className="pic">
            <h4>Nombre y contacto:</h4>
            <p>
              {each.name} {surname}
            </p>
            <p>
              <i>{each.email}</i>
            </p>
          </div>
        ))}
        <hr></hr>

        <h4>Menores: {children.length}</h4>
        <Link to={`${_id}/family/children`}>
          <button className="btn btn-warning">Ver</button>
        </Link>
        <hr></hr>

        {children.map((child) => (
          <div key={child._id} {...child} className="pic">
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
          </div>
        ))}
      </div>
      <aside>*Powered by Vaccap</aside>
    </div>
  );
}
