const MoreDetails = ({title, details}) => {
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
}

export default MoreDetails