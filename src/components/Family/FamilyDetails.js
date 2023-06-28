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
        <p>Name: {family.parents[0].name}</p>
        <p>Email: {family.parents[0].email}</p>
        <h2>Hijos:</h2>
        <p>Name: {family.children[0].name}</p>
        <p>Birth date: {family.children[0].birtdhate}</p>
        <p>Birth date: {family.children[0].birthDate}</p>
        <p>Name: {family.children[1].name}</p>
        <p>Birth date: {family.children[1].birthdate}</p>
        <p>Birth date: {family.children[0].birthDate}</p>
      </div>
    )
  );
}
