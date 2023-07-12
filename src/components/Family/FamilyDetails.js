import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import familyService from "../../services/family.service";

const API_URL = "http://localhost:5005";

export default function FamilyDetails(props) {
  const [oneFamily, setOneFamily] = useState(null);
  const { familyId } = useParams();
  // console.log("props", props);

  const getAFamily = (familyId) => {
    familyService
      .detail(familyId)
      .then((response) => {
        const theFamily = response.data;
        console.log("theFamily", theFamily);
        setOneFamily(theFamily);
      })
      .catch((error) => console.log(error));
  };

  // console.log("MEEEE", family._id);

  useEffect(() => {
    getAFamily();
  }, []);

  console.log("FFFFFamily", oneFamily);
  return (
    oneFamily && (
      <div>
        <h1>Detalles de la familia {oneFamily.surname}:</h1>
        <h2>Padres:</h2>
        {/* {family.parents.map((parent) => (
          <div key={parent._id} {...parent}>
            <p>Name: {parent.name}</p>
            <p>Email: {parent.email}</p>
          </div>
        ))} */}
        {/* <Link to={`/family/${family._id}/children`}>
          <h2>Hijos:</h2>
        </Link> */}
        {/* {family.children.map((child) => (
          <div key={child._id} {...child}>
            <p>Name: {child.name}</p>
            <p>Birth Date: {child.birthdate.slice(0, 10)}</p>
            <Link to={`/family/${family._id}/children/${child._id}`}>
              <button>Ver</button>
            </Link>
          </div>
        ))} */}
      </div>
    )
  );
}
