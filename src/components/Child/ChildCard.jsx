import "./ChildCard.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ChildCard({ name, birthdate, healthcard, vaccines }) {
  const { _id } = useParams();
  const { familyId } = useParams();
  return (
    <div>
      <h1>{name}</h1>
      <h3>Fecha de nacimiento: {birthdate.slice(0, 10)}</h3>
      <h4>Tarjeta sanitaria: {healthcard}</h4>
      <h4>Vacunas:</h4>
      {vaccines.map((vaccine) => (
        <div key={vaccine._id} {...vaccine._id}>
          <h4>{vaccine.name}</h4>
          <p>{vaccine.status}</p>
        </div>
      ))}
      <Link to={`/family/${familyId}/children/`}>Volver a hijos</Link>
    </div>
  );
}
