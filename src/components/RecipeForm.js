import { useState, useEffect } from "react";
import Input from "./Input";

const RecipeForm = ({ addOrEditRecipe, closeForm, type, recipeToEdit, returnBack, setTheRecipe, setMessage, errorMessage}) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [individualIngredients, setIndividualIngredients] = useState([]);
  const [individualInstructions, setIndividualInstructions] = useState([]);

  useEffect(() => {
    if (recipeToEdit) {
      setName(recipeToEdit.name);
      setIndividualIngredients(recipeToEdit.ingredients);
      setIndividualInstructions(recipeToEdit.instructions);
      setCategory(recipeToEdit.category);
      setImage(recipeToEdit.image)
    }
  }, [recipeToEdit]);

  // INGREDIENTS

  const [editableIngreIndex, setEditableIngreIndex] = useState(-1);
  const [tempIngreValue, setTempIngreValue] = useState("");

  const handleItemClick = (index) => {
    setEditableIngreIndex(index);
    setTempIngreValue(individualIngredients[index]);
  };

  const handleInputChange = (e) => {
    setTempIngreValue(e.target.value);
  };

  const handleEditValue = (e, value) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const updatedIngredients = [...individualIngredients];
      updatedIngredients[editableIngreIndex] = value;
      setIndividualIngredients(updatedIngredients);
      setEditableIngreIndex(-1);
    }
  };
  ////////

  // INSTRUCTIONS

  const [editableInsIndex, setEditableInsIndex] = useState(-1);
  const [tempInsValue, setTempInsValue] = useState("");

  const handleInsClick = (index) => {
    setEditableInsIndex(index);
    setTempInsValue(individualInstructions[index]);
  };

  const handleIngInsputChange = (e) => {
    setTempInsValue(e.target.value);
  };

  const handleEditInsgValue = (e, value) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const updatedInstructions = [...individualInstructions];
      updatedInstructions[editableInsIndex] = value;
      setIndividualInstructions(updatedInstructions);
      setEditableInsIndex(-1);
    }
  };
  ////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();


    if (individualIngredients.length < 2) {
      errorMessage("Please add at least 2 Ingredients");
      setTimeout(() => errorMessage(null), 5000)
      return; 
    }

    if (individualInstructions.length < 2) {
      errorMessage("Please add at least 2 Instructions");
      setTimeout(() => errorMessage(null), 5000);
      return;
    }

    let newRecipe;
    if (recipeToEdit) {
      newRecipe = {
        name: name,
        ingredients: individualIngredients,
        instructions: individualInstructions,
        category: category,
        image: image,
        id: recipeToEdit.id
      }

    } else {
      newRecipe = {
          name: name,
          ingredients: individualIngredients,
          instructions: individualInstructions,
          category: category,
          image: image,
        }
    }

    addOrEditRecipe(newRecipe);

    if (returnBack) {
      setTheRecipe(newRecipe)
      returnBack(false)
    }
    // Clear all States
    setName("");
    setIngredients("");
    setInstructions("");
    setImage("");
    setIndividualIngredients([]);
    setIndividualInstructions([]);
  };

  const handleAddToList = (e, value, setter, listSetter) => {
    if (e.key === "Enter") {
      e.preventDefault();
      listSetter((prev) => [...prev, value]);
      setter("");
    }
  };

  const handleSetName = (e) => {
    setName(e.target.value);
  };

  const handleSetIngredients = (e) => {
    setIngredients(e.target.value);
  };

  const handleSetImageUrl = (e) => {
    setImage(e.target.value);
  };

  const handleSetInstructions = (e) => {
    setInstructions(e.target.value);
  };

  const handleSetCategory = (e) => {
    setCategory(e.target.value);
  };

  if (type === "create") {
    return (
      <div className="newRecipeForm">
        <br />
        <button
          type="button"
          className="btn close-new-form"
          onClick={closeForm}
        >
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
            component="newRecipe"
          />
          <br />

          {individualIngredients && (
            <div>
              <h3>Ingredients: </h3>
              <ul>
                {individualIngredients.map((ing, i) => (
                  <li key={i}>
                    {editableIngreIndex === i ? (
                      <input
                        type="text"
                        value={tempIngreValue}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEditValue(e, tempIngreValue)}
                      />
                    ) : (
                      <span onClick={() => handleItemClick(i)}>{ing}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <label>
            Ingredients:
            <input
              type="text"
              value={ingredients}
              onChange={handleSetIngredients}
              onKeyDown={(e) =>
                handleAddToList(
                  e,
                  ingredients,
                  setIngredients,
                  setIndividualIngredients
                )
              }
            />
          </label>

          {individualInstructions && (
            <div>
              <h3>Instructions: </h3>
              <ul>
                {individualInstructions.map((ing, i) => (
                  <li key={i}>
                    {editableInsIndex === i ? (
                      <input
                        type="text"
                        value={tempInsValue}
                        onChange={handleIngInsputChange}
                        onKeyDown={(e) => handleEditInsgValue(e, tempInsValue)}
                      />
                    ) : (
                      <span onClick={() => handleInsClick(i)}>{ing}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <label>
            Instructions:
            <input
              type="text"
              value={instructions}
              onChange={handleSetInstructions}
              onKeyDown={(e) =>
                handleAddToList(
                  e,
                  instructions,
                  setInstructions,
                  setIndividualInstructions
                )
              }
            />
          </label>

          <br />
          <Input
            label="Category: "
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
          <button className="btn recipe-btn" type="submit">
            Add Recipe
          </button>
          <br />
        </form>
      </div>
    );
  } else if (type === "edit" && recipeToEdit) {
    return (
      <div>
      <form onSubmit={handleSubmit}>
          <Input
            label="Name: "
            value={name}
            type="text"
            onChange={handleSetName}
            component="newRecipe"
          />
          <br />

          <Input
            label="Category: "
            value={category}
            type="text"
            onChange={handleSetCategory}
            component="newRecipe"
          />
          <br />
          {individualIngredients && (
            <div>
              <h3>Ingredients: </h3>
              <ul>
                {individualIngredients.map((ing, i) => (
                  <li key={i}>
                    {editableIngreIndex === i ? (
                      <input
                        type="text"
                        value={tempIngreValue}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEditValue(e, tempIngreValue)}
                      />
                    ) : (
                      <span onClick={() => handleItemClick(i)}>{ing}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <label>
            Ingredients:
            <input
              type="text"
              value={ingredients}
              onChange={handleSetIngredients}
              onKeyDown={(e) =>
                handleAddToList(
                  e,
                  ingredients,
                  setIngredients,
                  setIndividualIngredients
                )
              }
            />
          </label>

          {individualInstructions && (
            <div>
              <h3>Instructions: </h3>
              <ul>
                {individualInstructions.map((ing, i) => (
                  <li key={i}>
                    {editableInsIndex === i ? (
                      <input
                        type="text"
                        value={tempInsValue}
                        onChange={handleIngInsputChange}
                        onKeyDown={(e) => handleEditInsgValue(e, tempInsValue)}
                      />
                    ) : (
                      <span onClick={() => handleInsClick(i)}>{ing}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <label>
            Instructions:
            <input
              type="text"
              value={instructions}
              onChange={handleSetInstructions}
              onKeyDown={(e) =>
                handleAddToList(
                  e,
                  instructions,
                  setInstructions,
                  setIndividualInstructions
                )
              }
            />
          </label>

  
          <br />
          <Input
            label="Image URL: "
            value={image}
            onChange={handleSetImageUrl}
            component="newRecipe"
          />

          <br />
          <br />
          <button className="btn recipe-btn" type="submit">
            Update Recipe
          </button>
          <br />
        </form>
      </div>
    )
  }
};

export default RecipeForm;
