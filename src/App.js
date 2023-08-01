import { useState } from "react";
import SearchForm from "./components/SearchForm/SearchForm";
import Results from "./components/Results/Results";

const App = ({recipes}) => {

  const [filteredRecipes, setFilteredRecipes] = useState(recipes)

  const handleSubmit = ({ searchType, searchTerm }) => {
    let results;

    if (searchType === 'ingredient-name') {
      results = recipes.filter(recipe => 
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else if (searchType === 'recipe-name') {
      results = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchType === 'first-letter') {
      results = recipes.filter(recipe => 
        recipe.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }

    setFilteredRecipes(results)
  }

  return (
    <div className="container">
      <div className="recipe-wrapper">

        <div className="recipe-search">
          <h2 className="title"> Find Recipe For Your Ingredients</h2>
          <blockquote>
            "There cannot be good living where there is not good drinking."
            <br />
            <cite>- Benjamin Franklin</cite>
          </blockquote>

          <div className="recipe-search-box">
            <SearchForm handleSubmit={ handleSubmit} />
          </div>
        </div>

        <div className="recipe-result">
          <Results recipes={filteredRecipes} />
        </div>
      </div>

    </div>
  );
};

export default App;
