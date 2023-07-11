import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FamilyCard from "../../components/Family/FamilyCard";
import familyService from "../../services/family.service";

const API_URL = "http://localhost:5005";

export default function ChildrenPage() {
  const [children, setChildren] = useState([]);

  const getAllChildren = () => {
    axios
      .get(`${API_URL}/child`)
      .then((response) => setChildren(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllChildren();
  }, []);

  return (
    <>
      {children.map((child) => (
        <div key={child._id} {...child}>
          <Link to={`/child/${child._id}`}>
            <h4>{child.name}</h4>
            <p>{child.birthdate}</p>
          </Link>
          {child.vaccines.map((vaccine) => (
            <div key={vaccine._id} {...vaccine}>
              <p>vacuna: {vaccine}</p>
              <p>estado: {}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
