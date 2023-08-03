import { useState } from "react";
import Input from "./Input";

const NewRecipeForm = ({ addRecipe, closeForm }) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const ingredientsArray = ingredients.split(",").map((ing) => ing.trim());
    const instructionsArray = instructions.split(",").map((ing) => ing.trim());

    const newRecipe = {
      name: name,
      ingredients: ingredientsArray,
      instructions: instructionsArray,
      category: category,
      image: image,
    };

    addRecipe(newRecipe);

    setName("");
    setIngredients("");
    setImage("");
  };


  const handleSetName = (e) => {
    setName(e.target.value)
  }

  const handleSetIngredients = (e) => {
    setIngredients(e.target.value)
  }

  const handleSetImageUrl = (e) => {
    setImage(e.target.value)
  }

  const handleSetInstructions = (e) => {
    setInstructions(e.target.value)
  }

  const handleSetCategory = (e) => {
    setCategory(e.target.value)
  }

  return (
    <div className="newRecipeForm">
      <br />
      <button type="button" className="btn close-new-form" onClick={closeForm}>
        <i className="fas fa-times"></i>
      </button>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <Input
          label="Name: "
          value={name}
          type="text"
          onChange={handleSetName}
          component="newRecipe" />
        <br />
        <Input
          label="Ingredients (comma-separated): "
          value={ingredients}
          type="text"
          onChange={handleSetIngredients}
          component="newRecipe"
        />
<br />
        <Input
          label="Instructions (comma-separated): "
          value={instructions}
          type="text"
          onChange={handleSetInstructions}
          component="newRecipe"
        />
        <br />
        <Input
          label="Category"
          value={category}
          type="text"
          onChange={handleSetCategory}
          component="newRecipe"
        />
        <br />
        <Input
          label="Image URL: "
          value={image}
          onChange={handleSetImageUrl}
          component="newRecipe"
        />

        <br />
        <br />
        <button className="btn recipe-btn" type="submit">Add Recipe</button>
        <br />
      </form>
    </div>
  );
};

export default NewRecipeForm;
