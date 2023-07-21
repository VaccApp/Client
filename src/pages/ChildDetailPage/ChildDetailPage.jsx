import "./ChildDetailPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import childService from "../../services/child.service";
import ChildCardFull from "../../components/Child/ChildCardFull";
import VaccineAlert from "../../components/VaccineAlert/VaccineAlert";

function ChildDetailPage() {
  const [child, setChild] = useState([]);
  const { childId } = useParams();
  const { familyId } = useParams();

  useEffect(() => {
    const getChild = () => {
      childService
        .getOne(childId)
        .then((response) => setChild(response.data))
        .catch((error) => console.log(error));
    };
    getChild();
  }, [childId]);

  const renderChild = () => {
    return <ChildCardFull key={child._id} {...child} />;
  };

  return (
    <div>
      <Link to={`/family/${familyId}`}>Volver a familia</Link>
      <br />
      <Link to={`/family/${familyId}/children/${childId}/edit`}>
        Editar hijo
      </Link>
      <br />
      <Link
        to={`/child/${child._id}/vaccinate`}
        role="button"
        className="btn btn-primary"
      >
        Vacunar
      </Link>
      <Link
        to={`/child/${child._id}/qr`}
        role="button"
        className="btn btn-danger"
      >
        Vacunar con QR
      </Link>
      <br />
      <VaccineAlert
        childId={childId}
        childName={child.name}
        familyId={familyId}
      />
      <h1>Child Detail Page</h1>
      {child && renderChild()}
    </div>
  );
}

export default ChildDetailPage;
