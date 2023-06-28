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
    <div>
      <table className="vaccines">
        {/* <div key={_id} {..._id} className="vaccine"> */}
        <tbody key={_id} {..._id} className="vaccine">
          <tr>
            <td>Vacuna: {name}</td>
            <td>Dosis: {dose}</td>
          </tr>
          <tr>
            <td>Enfermedad: {disease}</td>
            <td>Farmacéutica: {creator}</td>
          </tr>
          <tr>
            <td>Fecha de expiración: {expires}</td>
            <td>Lote: {batch}</td>
          </tr>
          <tr>
            <td>Estado: {status}</td>
          </tr>
        </tbody>
        <Link to={`/vaccines/${_id}`}>Ver vacuna</Link>

        {/* </div> */}
      </table>
    </div>
  );
}
