import { useState, useEffect } from "react";
import MoreDetails from "./MoreDetails";
import RecipeForm from "../RecipeForm";

const RecipeDetails = ({ recipe, closeRecipe, updateRecipe }) => {

  const [editRecipeBtn, setEditRecipeBtn] = useState(false);

  const [name, setName] = useState(recipe.name);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [category, setCategory] = useState(recipe.category);
  const [image, setImage] = useState(recipe.image);

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
          <h2 className="recipe-title">{name}</h2>
          <p className="recipe-category">{category}</p>
          <MoreDetails title="Ingredients:" details={ingredients} />
          <MoreDetails title="Instructions:" details={instructions} />
          <div className="recipe-details-img">
            <img src={image} alt={name} />
          </div>
        </div>
      )}

      {editRecipeBtn && (
        <div className="recipe-details-content">
          <RecipeForm type="edit" recipeToEdit={recipe} addOrEditRecipe={updateRecipe} returnBack={setEditRecipeBtn} />
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
