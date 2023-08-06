import { useState } from "react";
import MoreDetails from "./MoreDetails";
import RecipeForm from "../RecipeForm";

const RecipeDetails = ({ recipe, closeRecipe }) => {
  const [editRecipeBtn, setEditRecipeBtn] = useState(false);

  return (
    // Close Btn //
    <div className="recipe-details">
      <button
        type="button"
        className="btn recipe-close-btn"
        onClick={closeRecipe}
      >
        <i className="fas fa-times"></i>
      </button>

      {!editRecipeBtn && (
        <button className="btn editBtn" onClick={() => setEditRecipeBtn(true)}>
          Edit Recipe
        </button>
      )}

      {!editRecipeBtn && (
        <div className="recipe-details-content">
          <h2 className="recipe-title">{recipe.name}</h2>
          <p className="recipe-category">{recipe.category}</p>
          <MoreDetails title="Ingredients:" details={recipe.ingredients} />
          <MoreDetails title="Instructions:" details={recipe.instructions} />
          <div className="recipe-details-img">
            <img src={recipe.image} alt={recipe.name} />
          </div>
        </div>
      )}

      {editRecipeBtn && (
        <div className="recipe-details-content">
          <button
            className="btn editBtn"
            onClick={() => setEditRecipeBtn(false)}
          >
            Save
          </button>

          <button
            className="btn editBtn"
            onClick={() => setEditRecipeBtn(false)}
          >
            Calcel
          </button>

          <RecipeForm />
          {/* <h2 className="recipe-title">{recipe.name}</h2>
          <p className="recipe-category">{recipe.category}</p>
          <MoreDetails title="Ingredients:" details={recipe.ingredients} />
          <MoreDetails title="Instructions:" details={recipe.instructions} />
          <div className="recipe-details-img">
            <img src={recipe.image} alt={recipe.name} />
          </div> */}
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
