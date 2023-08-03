const MoreDetails = ({ title, details }) => {
  if (details.length > 0) {
    return (
      <div className="recipe-instruct">
        <h3>{title}</h3>
        <ul>
        {details.map((detail, i) => 
          <li key={i}>
            {detail}
          </li>
        )}
      </ul>
      </div>
    )
  } else {
    return (
      <div className="recipe-instruct">
      <h3>{title}</h3>
        <p>{details}</p>
    </div>
    )
  }
}

export default MoreDetails