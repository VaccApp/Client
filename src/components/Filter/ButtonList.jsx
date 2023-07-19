export const ButtonList = ({ categories, filterCategory }) => {
  return (
    <div>
      {categories.map((category) => (
        <button
          type="button"
          onClick={() => filterCategory(category)}
          key={category}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
