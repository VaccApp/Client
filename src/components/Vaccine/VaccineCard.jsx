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
  vaccinationDate,
  vaccinationAge,
  _id,
}) {
  return (
    <div>
      <table className="vaccines">
        {/* <div key={_id} {..._id} className="vaccine"> */}
        <tbody key={_id} className="vaccine">
          <tr>
            <td>Vacuna: {name}</td>
            <td>Dosis: {dose}</td>
          </tr>
          <tr>
            <td>Enfermedad: {disease}</td>
            <td>Farmacéutica: {creator}</td>
          </tr>
          <tr>
            <td>Fecha de expiración: {expires.slice(0, 10)}</td>
            <td>Lote: {batch}</td>
          </tr>
          <tr>
            <td>
              Edad de vacunación:{" "}
              {vaccinationAge > 15
                ? vaccinationAge / 12 + " años"
                : vaccinationAge + " meses"}
            </td>
          </tr>
          <tr>
            <td>Fecha de vacunación: {vaccinationDate.slice(0, 10)}</td>
            <td>Estado: {status}</td>
          </tr>
        </tbody>
        <Link to={`/child/vaccine/${_id}`}>Ver vacuna</Link>

        {/* </div> */}
      </table>
    </div>
  );
}
