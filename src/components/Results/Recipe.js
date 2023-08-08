/* eslint-disable jsx-a11y/anchor-is-valid */

const Recipe = ({ recipe, showDetails, toggleFavorite, deleteRecipe }) => {
  const favorite = recipe.like ? "fa-solid fa-heart" : "fa-regular fa-heart";

  return (
    <div className="recipe-item">
      <div className="recipe-img">
        <img src={recipe.image} alt="" />
      </div>
      <div className="recipe-name">
        <h3>{recipe.name}</h3>
        <a className="recipe-btn" onClick={() => showDetails(recipe)}>
          Get Recipe
        </a>
        <i className={favorite} onClick={() => toggleFavorite(recipe.id)}></i>
        <i className="fa-solid fa-trash" onClick={() => deleteRecipe(recipe.id)}></i>
      </div>
    </div>
  );
};
export default Recipe;
