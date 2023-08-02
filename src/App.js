/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import SearchForm from "./components/SearchForm/SearchForm";
import Results from "./components/Results/Results";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";

const App = ({ recipes }) => {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSubmit = ({ searchType, searchTerm }) => {
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

    setFilteredRecipes(results);
  };

  const handleShowDetailRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseDetailRecipe = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="container">
      <div className="recipe-wrapper">
        <div className="recipe-search">
          <h2 className="title">
            <a href="">Find Recipe For Your Ingredients</a>
          </h2>
          <blockquote>
            "There cannot be good living where there is not good drinking."
            <br />
            <cite>- Benjamin Franklin</cite>
          </blockquote>

          <div className="recipe-search-box">
            <SearchForm handleSubmit={handleSubmit} />
          </div>
        </div>

        <div className="recipe-result">
          <Results
            recipes={filteredRecipes}
            showDetails={handleShowDetailRecipe}
          />
        </div>
        {selectedRecipe &&(
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
