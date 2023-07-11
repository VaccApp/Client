import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5005";

export default function FamilyDetails(props) {
  const [family, setFamily] = useState(null);
  const { familyId } = useParams();

  const getAFamily = (id) => {
    axios
      .get(`${API_URL}/family/${familyId}`)
      .then((response) => setFamily(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAFamily();
  }, []);

  console.log("Family", family);
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

        <h2>Hijos:</h2>
        {family.children.map((child) => (
          <div key={child._id} {...child}>
            <p>Name: {child.name}</p>
            <p>Birth Date: {child.birthdate.slice(0, 10)}</p>
          </div>
        ))}
      </div>
    )
  );
}
