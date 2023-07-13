import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FamilyCard from "../../components/Family/FamilyCard";
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
      .then((response) => setFamily(response.data))
      .catch((error) => console.log(error));
  };

  // console.log("USER12", user);

  useEffect(() => {
    getAllFamilies();
  }, []);

  const renderFamily = () => {
    return family.map((fam) => <FamilyCard key={fam._id} {...fam} />);
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
        <p>Aún no hay miembros en la unidad familiar.</p>
      )}
    </div>
  );
}
