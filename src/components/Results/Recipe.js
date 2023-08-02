/* eslint-disable jsx-a11y/anchor-is-valid */
const Recipe = ({ recipe, showDetails }) => {
    
    return (
        <div className="recipe-item">
            <div className="recipe-img">
                <img src={recipe.image} alt="" />
            </div>
            <div className="recipe-name">
                <h3>{recipe.name}</h3>
                <a className="recipe-btn" onClick={() => showDetails(recipe)}>Get Recipe</a>
            </div>
        </div>
    )
}
export default Recipe