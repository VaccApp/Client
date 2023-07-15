import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import FamilyCard from "../../components/Family/FamilyCard";
import "./FamilyPage.css";
import familyService from "../../services/family.service";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import "./FamilyPage.css";

export default function FamilyPage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [family, setFamily] = useState([]);

  const getAllFamilies = () => {
    familyService
      .list()
      .then((response) => setFamilies(response.data))
      .catch((error) => console.log(error));
  };

  // console.log("USER12", user);

  useEffect(() => {
    getAllFamilies();
  }, []);

  const renderFamily = () => {
    families.map((fam) => <FamilyCard key={fam._id} {...fam} />);
  };

  return (
    <div>
      {/* <h1>Family Page</h1> */}

      <Link to="/family/create">
        <img src="/Añadir.png" alt="Add family" className="addButton" />
      </Link>

      {family.length > 0 ? (
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
