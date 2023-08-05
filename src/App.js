/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm/SearchForm";
import Results from "./components/Results/Results";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import Quote from "./components/Quote";
import NewRecipeForm from "./components/NewRecipeForm";
import axios from "axios";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [quotes, setQuotes] = useState({});
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [addNewRecipeBtn, setAddNewRecipeBtn] = useState(false);

  const startFetchRecipesHook = () => {
    axios
      .get("http://localhost:3001/recipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes", error);
      });
  };

  const fetchQuotesHook = () => {
    axios
      .get("http://localhost:3001/quotes")
      .then((response) => {
        const data = response.data;
        const randomNumer = Math.floor(Math.random() * data.length);
        setQuotes(data[randomNumer]);
      })
      .catch((error) => {
        console.error("Error fetching quotes", error);
      });
  };

  useEffect(startFetchRecipesHook, []);
  useEffect(fetchQuotesHook, []);

  const handleSearchSubmit = ({ searchType, searchTerm }) => {
    let results;

    if (searchType === "ingredient-name") {
      results = recipes.filter((recipe) =>
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else if (searchType === "recipe-name") {
      results = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchType === "first-letter") {
      results = recipes.filter((recipe) =>
        recipe.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }

    setRecipes(results);
  };

  const handleShowDetailRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseDetailRecipe = () => {
    setSelectedRecipe(null);
  };

  const handleCloseNewRecipeForm = () => {
    setAddNewRecipeBtn(false);
  };

  const handleNewRecipe = (newRecipe) => {

    axios
      .post('http://localhost:3001/recipes', newRecipe)
      .then(response => {
        setRecipes(recipes.concat(response.data))
      })
    // setRecipes(recipes.concat(newObject));
    setAddNewRecipeBtn(false);
  };

  ////////////////// RETURN/////////////////
  return (
    <div className="container">
      <div className="recipe-wrapper">
        <div className="recipe-search">
          <h2 className="title">
            <a href="">Find Recipe For Your Ingredients</a>
          </h2>
          <Quote quotes={quotes} />
          <div className="recipe-search-box">
            <SearchForm handleSubmit={handleSearchSubmit} />
          </div>
        </div>

        {!addNewRecipeBtn && (
          <div className="">
            <button
              className="btn newRecipeBtn"
              onClick={() => setAddNewRecipeBtn(true)}
            >
              Create a New Recipe
            </button>
          </div>
        )}

        {addNewRecipeBtn && (
          <NewRecipeForm
            addRecipe={handleNewRecipe}
            closeForm={handleCloseNewRecipeForm}
          />
        )}

        <div className="recipe-result">
          <Results recipes={recipes} showDetails={handleShowDetailRecipe} />
        </div>
        {selectedRecipe && (
          <RecipeDetails
            recipe={selectedRecipe}
            closeRecipe={handleCloseDetailRecipe}
          />
        )}
      </div>
    </div>
  );
};

export default App;
