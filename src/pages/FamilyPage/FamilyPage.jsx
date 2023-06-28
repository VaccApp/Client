import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FamilyCard from "../../components/Family/FamilyCard";

const API_URL = "http://localhost:5005";

export default function FamilyPage() {
  const [family, setFamily] = useState([]);

  const getAllFamilies = () => {
    axios
      .get(`${API_URL}/family`)
      .then((response) => setFamily(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllFamilies();
  }, []);

  const renderFamily = () => {
    return family.map((fam) => <FamilyCard key={fam._id} {...fam} />);
  };

  return (
    <div>
      <h1>Family Page</h1>
      <button>
        <Link to="/family/create">Crear Familia</Link>
      </button>
      {family.length > 0 ? (
        renderFamily()
      ) : (
        <p>Aún no hay miembros en la unidad familiar.</p>
      )}
    </div>
  );
}
