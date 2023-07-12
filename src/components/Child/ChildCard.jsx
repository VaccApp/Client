import "./ChildCard.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ChildCard({ name, birthdate, healthcard, vaccines }) {
  const { familyId } = useParams();

  return (
    name &&
    birthdate &&
    healthcard &&
    vaccines && (
      <div>
        <h1>{name}</h1>
        <img
          src="https://cdn3.iconfinder.com/data/icons/materia-human/24/013_042_newborn_infant_child_baby-512.png"
          alt="child"
        />
        <p>📅 Fecha de nacimiento: {birthdate.slice(0, 10)}</p>
        <p>🪪 Tarjeta sanitaria: {healthcard}</p>
        <h4>💉 Vacunas:</h4>
        {vaccines.map((vaccine) => (
          <div key={vaccine._id} {...vaccine._id}>
            <p>Vacuna: {vaccine.name}</p>
            <p
              style={{
                color: vaccine.status === "PUESTA" ? "green" : "orange",
              }}
            >
              Estado: {vaccine.status}
            </p>
            <hr />
          </div>
        ))}
        <Link to={`/family/${familyId}/children/`}>Volver a hijos</Link>
      </div>
    )
  );
}
