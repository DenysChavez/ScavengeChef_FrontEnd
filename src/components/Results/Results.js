import Recipe from "./Recipe";

const Results = ({ recipes, showDetails, toggleFavorite, deleteRecipe, user }) => {
  return (
    <div id="recipes">
      {recipes.map((recipe, i) => (
        <Recipe
          key={i}
          recipe={recipe}
          showDetails={showDetails}
          toggleFavorite={toggleFavorite}
          deleteRecipe={deleteRecipe}
          user={user}
        />
      ))}
    </div>
  );
};

export default Results;
