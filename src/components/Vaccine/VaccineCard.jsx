import "./VaccineCard.css";
import { Link } from "react-router-dom";

export default function VaccineCard({
  name,
  dose,
  disease,
  creator,
  expires,
  batch,
  status,
  _id,
}) {
  return (
    <table className="vaccines">
      <Link to={`/vaccines/${_id}`}>
        <div key={_id} {..._id} className="vaccine">
          <tr>
            <td>Vacuna: {name}</td>
            <td>Dosis: {dose}</td>
            <td>Enfermedad: {disease}</td>
            <td>Farmacéutica: {creator}</td>
            <td>Fecha de expiración: {expires}</td>
            <td>Lote: {batch}</td>
            <td>Estado: {status}</td>
          </tr>
        </div>
      </Link>
    </table>
  );
}
