import "./FamilyCard.css";
import { Link } from "react-router-dom";

export default function FamilyCard({ surname, parents, children, _id }) {
  console.log({ surname, parents, children, _id });
  return (
    <div className="familyCard">
      <Link to={`/family/${_id}`}>
        <h2>{surname}</h2>
        <img src="/family.png" alt="family-pic" />
      </Link>

      <h4>Family members: {parents.length + children.length}</h4>
      <h4>Parents: {parents.length}</h4>
      <h4>Children: {children.length}</h4>

      {parents.map((each) => (
        <div key={each._id} {...each}>
          <h4>Parent's name:</h4>
          <p>{each.name}</p>
          <h4>Parent's contact:</h4>
          <p>{each.email}</p>
        </div>
      ))}

      <h4>Children:</h4>
      {children.map((eachChild) => (
        <div key={eachChild._id} {...eachChild}>
          <p>{eachChild.name}</p>
          <p>{eachChild.email}</p>
        </div>
      ))}
    </div>
  );
}
