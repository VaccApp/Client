import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import FamilyCard from "../../components/Family/FamilyCard";
import "./FamilyPage.css";
import familyService from "../../services/family.service";
import { useContext } from "react";
import "./FamilyPage.css";

export default function FamilyPage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [families, setFamilies] = useState([]);

  const getAllFamilies = () => {
    familyService
      .list()
      .then((response) => setFamilies(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllFamilies();
  }, []);

  const renderFamily = () => {
    return families.map((fam) => <FamilyCard key={fam._id} {...fam} />);
  };

  return (
    families && (
      <div>
        <Link to="/family/create">
          <img src="/Añadir.png" alt="Add family" className="addButton" />
        </Link>

        {families.length > 0 ? (
          renderFamily()
        ) : (
          <div className="saveBottom">
            <img
              src="/noFamily.png"
              alt="Kid don't know"
              className="kidDefaultPic"
            />
            <p>Aún no has añadido a ningún hijo.</p>
            <button className="addChildButton">
              <Link to="/family/create">
                <img src="/Añadir.png" alt="Add family" className="addButton" />
              </Link>
            </button>
          </div>
        )}
      </div>
    )
  );
}
