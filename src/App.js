/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm/SearchForm";
import Results from "./components/Results/Results";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import Quote from "./components/Quote";
import RecipeForm from "./components/RecipeForm";
import axios from "axios";
import recipeService from "./service/recipes";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [quotes, setQuotes] = useState({});
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [addNewRecipeBtn, setAddNewRecipeBtn] = useState(false);
  const [showAll, setShowAll] = useState(true);

  const startFetchRecipesHook = () => {
    recipeService
      .getAll()
      .then((initialRecipes) => {
        setRecipes(initialRecipes);
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

  const createNewRecipe = (newRecipe) => {
    recipeService.create(newRecipe).then((createdRecipe) => {
      setRecipes(recipes.concat(createdRecipe));
    });
    setAddNewRecipeBtn(false);
  };

  const updateRecipe = (newRecipe) => {
    const recipe = recipes.find(n => n.id === newRecipe.id)
  
    recipeService
      .update(recipe.id, newRecipe)
      .then((returnedRecipe) => {
        setRecipes(recipes.map(n => n.id !== newRecipe.id ? n : returnedRecipe));
      })
      .catch(error => {
        alert(`the recipe with the ID ${newRecipe.id} was already deleted from server`)
        setRecipes(recipes.filter(n => n.id !== newRecipe.id))
      })
  };

  const toggleFavoriteRecipe = (id) => {
    const recipe = recipes.find((n) => n.id === id);
    const changedRecipe = { ...recipe, like: !recipe.like };

    recipeService.update(id, changedRecipe).then((returnedRecipe) => {
      setRecipes(recipes.map((n) => (n.id !== id ? n : returnedRecipe)));
    });
  };

  const deleteRecipe = (id) => {
    const recipe = recipes.find(n => n.id === id)
    if (window.confirm(`Delete ${recipe.name} ?`)) {
      recipeService
        .deleteRecipe(id)
        .then(() => {
          setRecipes(recipes.filter(n => n.id !== id))
        })
    }
  }

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

  const recipesToShow = showAll
    ? recipes
    : recipes.filter((recipe) => recipe.like);

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

        <div className="">
          <button
            className="btn favoriteBtn"
            onClick={() => setShowAll(!showAll)}
          >
            Show {showAll ? "My Favorites" : "All"}
          </button>
        </div>

        {addNewRecipeBtn && (
          <RecipeForm
            type="create"
            addOrEditRecipe={createNewRecipe}
            closeForm={handleCloseNewRecipeForm}
          />
        )}

        <div className="recipe-result">
          <Results
            recipes={recipesToShow}
            showDetails={handleShowDetailRecipe}
            toggleFavorite={toggleFavoriteRecipe}
            deleteRecipe={deleteRecipe}
          />
        </div>

        {selectedRecipe && (
          <RecipeDetails
            recipe={selectedRecipe}
            closeRecipe={handleCloseDetailRecipe}
            updateRecipe={updateRecipe}
          />
        )}
      </div>
    </div>
  );
};

export default App;
