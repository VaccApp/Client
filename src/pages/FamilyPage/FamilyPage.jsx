import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import FamilyCard from "../../components/Family/FamilyCard";
import "./FamilyPage.css";
import familyService from "../../services/family.service";

export default function FamilyPage() {
  const [families, setFamilies] = useState([]);

  const getAllFamilies = () => {
    familyService
      .list()
      .then((response) => setFamilies(response.data))
      .catch((error) => console.log(error));
  };

  console.log("LN19 FamilyPage", families);

  useEffect(() => {
    getAllFamilies();
  }, []);

  const renderFamily = () => {
    families.map((fam) => <FamilyCard key={fam._id} {...fam} />);
  };

  return (
    <div>
      {families.length > 0 ? (
        renderFamily()
      ) : (
        <div>
          <img
            src="/noFamily.png"
            alt="Kid don't know"
            className="kidDefaultPic"
          />
          <p>Aún no has añadido a ningún hijo.</p>
          <button className="addChildButton">
            <Link to="/family/:familyId/add-child">+</Link>
          </button>
        </div>
      )}
    </div>
  );
}
