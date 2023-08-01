/* eslint-disable jsx-a11y/anchor-is-valid */
const Recipe = ({ recipe }) => {
    
    return (
        <div className="recipe-item">
            <div className="recipe-img">
                <img src={recipe.image} alt="" />
            </div>
            <div className="recipe-name">
                <h3>{recipe.name}</h3>
                <a href="" className="recipe-btn">Get Recipe</a>
            </div>
        </div>
    )
}

export default Recipe