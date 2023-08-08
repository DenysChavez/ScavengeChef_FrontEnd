import { useState } from "react";
import MoreDetails from "./MoreDetails";
import RecipeForm from "../RecipeForm";

const RecipeDetails = ({ recipe, closeRecipe, updateRecipe }) => {

  const [editRecipeBtn, setEditRecipeBtn] = useState(false);

  const [theRecipe, setTheRecipe] = useState(recipe)

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
          <h2 className="recipe-title">{theRecipe.name}</h2>
          <p className="recipe-category">{theRecipe.category}</p>
          <MoreDetails title="Ingredients:" details={theRecipe.ingredients} />
          <MoreDetails title="Instructions:" details={theRecipe.instructions} />
          <div className="recipe-details-img">
            <img src={theRecipe.image} alt={theRecipe.name} />
          </div>
        </div>
      )}

      {editRecipeBtn && (
        <div className="recipe-details-content">
          <RecipeForm type="edit" recipeToEdit={recipe} addOrEditRecipe={updateRecipe} returnBack={setEditRecipeBtn} setTheRecipe={setTheRecipe} />
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
