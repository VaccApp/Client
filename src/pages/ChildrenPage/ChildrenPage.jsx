import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ChildCard from "../../components/Child/ChildCard";
import childService from "../../services/child.service";
import familyService from "../../services/family.service";

export default function ChildrenPage() {
  const [children, setChildren] = useState([]);
  const { familyId } = useParams();

  const getAllChildren = () => {
    familyService
      .children(familyId)
      .then((response) => setChildren(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllChildren();
  }, []);

  // console.log("CHILDRENENENENE", children);

  const renderChildren = () => {
    return children.map((child) => <ChildCard key={child._id} {...child} />);
  };

  return (
    <div>
      <h1>Children Page</h1>
      {children.length > 0 ? (
        renderChildren()
      ) : (
        <p>Aún no hay miembros en la unidad familiar.</p>
      )}
      {/* {children.map((child) => (
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
      ))} */}
    </div>
  );
}
