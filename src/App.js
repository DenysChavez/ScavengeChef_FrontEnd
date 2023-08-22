/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm/SearchForm";
import Results from "./components/Results/Results";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import Quote from "./components/Quote";
import RecipeForm from "./components/RecipeForm";
import recipeService from "./service/recipes";
import Notification from "./components/Notification";
import loginService from "./service/login";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [quotes, setQuotes] = useState({});
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [addNewRecipeBtn, setAddNewRecipeBtn] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
    recipeService
      .getAllQuotes()
      .then((response) => {
        const randomNumer = Math.floor(Math.random() * response.length);
        setQuotes(response[randomNumer]);
      })
      .catch((error) => {
        console.error("Error fetching quotes", error);
      });
  };

  useEffect(startFetchRecipesHook, []);
  useEffect(fetchQuotesHook, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userLogin = await loginService.login({
        username,
        password,
      });
      setUser(userLogin);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const createNewRecipe = (newRecipe) => {
    recipeService
      .create(newRecipe)
      .then((createdRecipe) => {
        setRecipes(recipes.concat(createdRecipe));
        setMessage(
          `Your recipe ${createdRecipe.name} has been saved in the database`
        );
        setTimeout(() => setMessage(null), 5000);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => setErrorMessage(null), 5000);
      });
    setAddNewRecipeBtn(false);
  };

  const updateRecipe = (newRecipe) => {
    const recipe = recipes.find((n) => n.id === newRecipe.id);

    recipeService
      .update(recipe.id, newRecipe)
      .then((returnedRecipe) => {
        setRecipes(
          recipes.map((n) => (n.id !== newRecipe.id ? n : returnedRecipe))
        );
        setMessage(`Your recipe ${newRecipe.name} has been updated`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage(
          `The recipe with the ID ${newRecipe.id} was already deleted from server`
        );
        setTimeout(() => setErrorMessage(null), 5000);
        setSelectedRecipe(null);
        setRecipes(recipes.filter((n) => n.id !== newRecipe.id));
      });
  };

  const toggleFavoriteRecipe = (id) => {
    const recipe = recipes.find((n) => n.id === id);
    const changedRecipe = { ...recipe, like: !recipe.like };

    recipeService
      .update(id, changedRecipe)
      .then((returnedRecipe) => {
        setRecipes(recipes.map((n) => (n.id !== id ? n : returnedRecipe)));
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => setErrorMessage(null), 5000);
      });
  };

  const deleteRecipe = (id) => {
    const recipe = recipes.find((n) => n.id === id);
    if (window.confirm(`Delete ${recipe.name} ?`)) {
      recipeService
        .deleteRecipe(id)
        .then(() => {
          setRecipes(recipes.filter((n) => n.id !== id));
          setMessage(`Recipe ${recipe.name} has been deleted`);
          setTimeout(() => setMessage(null), 5000);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => setErrorMessage(null), 5000);
        });
    }
  };

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const userFeatures = () => (
    <div>
      {!addNewRecipeBtn && (
        <div>
          <button
            className="btn newRecipeBtn"
            onClick={() => setAddNewRecipeBtn(true)}
          >
            Create a New Recipe
          </button>
        </div>
      )}

      <div>
        <button
          className="btn favoriteBtn"
          onClick={() => setShowAll(!showAll)}
        >
          Show {showAll ? "My Favorites" : "All"}
        </button>
      </div>
    </div>
  );

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

        <Notification message={message} errorMessage={errorMessage} />

        {!user && loginForm()}
        {user && (
          <div>
            <p>{user.name} logged in</p>
            {userFeatures()}
          </div>
        )}

        {addNewRecipeBtn && (
          <RecipeForm
            type="create"
            addOrEditRecipe={createNewRecipe}
            closeForm={handleCloseNewRecipeForm}
            message={setMessage}
            errorMessage={setErrorMessage}
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
