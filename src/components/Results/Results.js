import Recipe from "./Recipe"

const Results = ({recipes, showDetails} ) => {
    // console.log(recipes);
    return (
        <div id="recipes">
            {recipes.map((recipe, i) => 
                <Recipe key={i}
                    recipe={recipe}
                    showDetails={showDetails} />
            )}
        </div>
    )
}

export default Results