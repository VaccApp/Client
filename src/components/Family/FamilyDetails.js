import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import familyService from "../../services/family.service";

const API_URL = "http://localhost:5005";

export default function FamilyDetails(props) {
  const [family, setFamily] = useState(null);
  const { familyId } = useParams();

  const getAFamily = (id) => {
    familyService
      .detail(familyId)
      .then((response) => setFamily(response.data))
      .catch((error) => console.log(error));
  };

  console.log("MEEEE", family._id);

  useEffect(() => {
    getAFamily();
  }, []);

  console.log("FFFFFamily", family);
  return (
    family && (
      <div>
        <h1>Detalles de la familia {family.surname}:</h1>
        <h2>Padres:</h2>
        {family.parents.map((parent) => (
          <div key={parent._id} {...parent}>
            <p>Name: {parent.name}</p>
            <p>Email: {parent.email}</p>
          </div>
        ))}
        <Link to={`/family/${family._id}/children`}>
          <h2>Hijos:</h2>
        </Link>
        {family.children.map((child) => (
          <div key={child._id} {...child}>
            <p>Name: {child.name}</p>
            <p>Birth Date: {child.birthdate.slice(0, 10)}</p>
            <Link to={`/family/${family._id}/children/${child._id}`}>
              <button>Ver</button>
            </Link>
          </div>
        ))}
      </div>
    )
  );
}
