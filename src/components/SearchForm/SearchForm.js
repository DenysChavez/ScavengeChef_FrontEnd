import Input from "../Input";
import { useState } from "react";

const SearchForm = ({ handleSubmit }) => {

  const [searchType, setSearchType] = useState('ingredient-name');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({searchType, searchTerm})
  }

  return (
    <form onSubmit={onSubmit}>
      <legend> Search by: </legend>
      <Input
        label="Ingredient Name"
        value="ingredient-name"
        type="radio"
        onChange={handleSearchTypeChange}
        component={"search"}
        checked={searchType === 'ingredient-name'} />
      <br />
      <Input
        label="Recipe Name"
        value="recipe-name"
        type="radio"
        onChange={handleSearchTypeChange}
        component={"search"}
        checked={searchType === 'recipe-name'} />
      <br />
      <Input
        label="First Letter"
        value="first-letter"
        type="radio"
        onChange={handleSearchTypeChange}
        component={"search"}
        checked={searchType === 'first-letter'} />
      <br />
          <br />
          <br />
      <legend> Search Term: </legend>
      <div className="recipe-search-box">
        <Input type="text" value={searchTerm} onChange={ handleSearchTermChange } component={"search"}/>
        <button type="submit" className="search-btn btn" id="search-btn">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
