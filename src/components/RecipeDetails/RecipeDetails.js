import MoreDetails from "./MoreDetails";

const RecipeDetails = ({ recipe, closeRecipe }) => {
  return (
    <div className="recipe-details">
      <button
        type="button"
        className="btn recipe-close-btn"
        onClick={closeRecipe}
      >
        <i className="fas fa-times"></i>
      </button>
      <div className="recipe-details-content">
        <h2 className="recipe-title">{ recipe.name}</h2>
        <p className="recipe-category">{ recipe.category }</p>
        <MoreDetails title="Ingredients:" details={recipe.ingredients} />
        <MoreDetails title="Instructions:" details={ recipe.instructions} />
        <div className="recipe-details-img">
          <img src={recipe.image} alt={recipe.name} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
