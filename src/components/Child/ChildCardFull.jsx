import "./ChildCard.css";

export default function ChildCardFull({
  name,
  birthdate,
  childPic,
  healthcard,
  vaccines,
}) {
  return (
    name &&
    birthdate &&
    childPic &&
    healthcard &&
    vaccines && (
      <div>
        <h1>{name}</h1>
        <img src={childPic} alt="child" style={{ width: "200px" }} />
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
      </div>
    )
  );
}
