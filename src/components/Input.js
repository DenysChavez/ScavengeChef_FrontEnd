const Input = ({ label, value, type, onChange, checked, component }) => {

  if (component === "search") {
    if (type === "radio") {
      return (
        <>
          <label>
            {label}
            <input
              type={type}
              name="searchBy"
              value={value}
              onChange={onChange}
              checked={checked}
              required
            />
          </label>
        </>
      );
    } else if (type === "text") {
      return (
        <>
          <input
            type={type}
            className="search-term"
            name="searchBy"
            id={value}
            placeholder="Search...."
            onChange={onChange}
            required
          />
        </>
      );
    }
  } else if (component === "newRecipe") {
    return (
      <label>
        {label}
            <input 
                value={value}
                type={type}
                onChange={onChange}
                required
        />
      </label>
    );
  }
};

export default Input;
