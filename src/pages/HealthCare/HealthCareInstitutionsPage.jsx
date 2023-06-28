import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CenterCard from "../../components/Centers/CenterCard";

const CENTER_API =
  "https://datos.madrid.es/egob/catalogo/201544-0-centros-salud.csv";

export default function HealthCareInstitutionsPage() {
  const [centers, setCenters] = useState([]);

  const getAllCenters = () => {
    axios
      .get(`${CENTER_API}`)
      .then((response) => setCenters(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCenters();
  }, []);

  const renderCenters = () => {
    return centers.map((center) => <div key={center._id} {...center} />);
  };

  return (
    <div>
      <h1>Página de centros de salud de la comunidad de Madrid</h1>

      {centers.length > 0 ? (
        renderCenters()
      ) : (
        <p>
          En estos momentos no podemos mostrar los centros, inténtalo de nuevo
          más tarde.
        </p>
      )}
    </div>
  );
}
