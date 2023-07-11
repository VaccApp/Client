import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import childService from "../../services/child.service";

const API_URL = "http://localhost:5005";

export default function ChildDetails(props) {
  const [child, setChild] = useState(null);
  const { childId } = useParams();

  const getAChild = (id) => {
    childService
      .getOne(childId)
      .then((response) => setChild(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAChild();
  }, []);

  console.log("Child details", child);
  return (
    child && (
      <div>
        <h1>Detalles de la familia {child.surname}:</h1>
        <h2>Padres:</h2>
        {child.parents.map((parent) => (
          <div key={parent._id} {...parent}>
            <p>Name: {parent.name}</p>
            <p>Email: {parent.email}</p>
          </div>
        ))}
        <Link to={`/child/${child._id}/children`}>
          <h2>Hijos:</h2>
        </Link>
      </div>
    )
  );
}
