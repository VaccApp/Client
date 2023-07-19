export const ChildList = ({ children, filterChild }) => {
  return (
    <div>
      {children.map((child) => (
        <div key={child._id}>
          <p>{child.name}</p>
          <p>{child.birthdate}</p>
        </div>
      ))}
    </div>
  );
};
