import Recipe from "./Recipe"

const Results = ({recipes, showDetails, toggleFavorite} ) => {
    // console.log(recipes);
    return (
        <div id="recipes">
            {recipes.map((recipe, i) => 
                <Recipe key={i}
                    recipe={recipe}
                    showDetails={showDetails}
                    toggleFavorite={toggleFavorite} />
            )}
        </div>
    )
}

export default Results