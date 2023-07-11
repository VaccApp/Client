import "./FamilyCard.css";
import { Link } from "react-router-dom";

export default function FamilyCard({ surname, parents, children, _id }) {
  // console.log({ surname, parents, children, _id });
  return (
    <div className="familyCard">
      <Link to={`/family/${_id}`}>
        <h2>{surname}</h2>
        <img src="/family.png" alt="family-pic" />
      </Link>

      <h4>Miembros de la familia: {parents.length + children.length}</h4>
      <h4>Tutores: {parents.length}</h4>
      <Link to={`/family/${_id}/children`}>
        <h4>Menores: {children.length}</h4>
      </Link>

      {parents.map((each) => (
        <div key={each._id} {...each}>
          <h4>Nombre tutor:</h4>
          <p>{each.name}</p>
          <h4>Contacto tutor:</h4>
          <p>{each.email}</p>
        </div>
      ))}

      <h4>Menores:</h4>
      {children.map((eachChild) => (
        <div key={eachChild._id} {...eachChild}>
          <p>{eachChild.name}</p>
          <p>{eachChild.birthdate.slice(0, 10)}</p>
        </div>
      ))}
    </div>
  );
}
