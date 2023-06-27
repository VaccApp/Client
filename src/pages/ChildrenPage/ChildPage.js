import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

export default function ChildPage(props) {
  const [child, setChild] = useState([]);
  const { childId } = useParams();

  console.log("childID", childId);

  const getOneChild = () => {
    axios
      .get(`${API_URL}/child/${childId}`)
      .then((response) => {
        const oneChild = response.data;
        setChild(oneChild);
        console.log("YOU", oneChild);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getOneChild();
  }, []);

  return (
    <>
      <h1>{child.name}:</h1>
      {/* Esto es temporal en nuestra prueba. Como he cambiado el modelo (de birthDate a birthdate) pongo los dos para que siempre salga uno */}
      <p>{child.birthdate}</p>
      <p>{child.birthDate}</p>

      <h3>Vacunas:</h3>

      <Link to={"/child"}>
        <button>Atrás</button>
      </Link>
    </>
  );
}
