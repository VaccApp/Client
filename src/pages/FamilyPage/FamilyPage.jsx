import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FamilyCard from "../../components/Family/FamilyCard";

const API_URL = "http://localhost:5005";

export default function FamilyPage() {
  const [family, setFamily] = useState([]);

  console.log();

  const getAllFamilies = () => {
    axios
      .get(`${API_URL}/family`)
      .then((response) => setFamily(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllFamilies();
  }, []);

  return (
    <div>
      {family.map((fam) => (
        <FamilyCard key={fam._id} {...fam} />
      ))}
    </div>
  );
}
