import "./ChildCard.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ChildCard({
  _id,
  name,
  birthdate,
  healthcard,
  vaccines,
  family,
}) {
  // const { childId } = useParams();
  return (
    <div>
      <Link to={`/child/${_id}`}>Ver</Link>
      <h1>{name}</h1>
      <h3>Fecha de nacimiento: {birthdate}</h3>
      <h4>Tarjeta sanitaria: {healthcard}</h4>
      <h4>Vacunas:</h4>
      {vaccines.map((vaccine) => (
        <div key={vaccine._id} {...vaccine}>
          <h4>{vaccine.name}</h4>
          <p>{vaccine.status}</p>
        </div>
      ))}
      {/* <Link to={`/family/${family}/children/`}>Volver a hijos</Link> */}
    </div>
  );
}
