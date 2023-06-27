import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5005";

export default function FamilyDetails() {
  const [family, setFamily] = useState({});

  // const getAllFamilies = () => {
  //   axios
  //     .get(`${API_URL}/family`)
  //     .then((response) => setFamily(response.data))
  //     .catch((error) => console.log(error));
  // };

  const getAFamily = (id) => {
    axios
      .get(`${API_URL}/family/${id}`)
      .then((response) => setFamily(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAFamily();
  }, []);

  console.log("Family", family);
  return (
    <div>
      <h1>{family[0].surname} family details:</h1>
      <h2>Parents:</h2>
      <p>Name: {family[0].parents[0].name}</p>
      <p>Email: {family[0].parents[0].email}</p>

      <h2>Children:</h2>
      <p>Name: {family[0].children[0].name}</p>
      <p>Birth date: {family[0].children[0].birthDate}</p>

      <p>Name: {family[0].children[1].name}</p>
      <p>Birth date: {family[0].children[1].birthDate}</p>
    </div>
  );
}
