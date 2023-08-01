import Recipe from "./Recipe"

const Results = ({recipes}) => {
    return (
        <div id="recipes">
            {recipes.map((recipe, i) => 
                <Recipe key={i} recipe={recipe} />
            )}
        </div>
    )
}

export default Results