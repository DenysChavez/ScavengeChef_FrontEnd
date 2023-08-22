import loginService from "../service/login";
import recipeService from "../service/recipes";
import { useState } from "react";
import PropTypes from 'prop-types'

const LoginForm = ({ setUser, setErrorMessage}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userLogin = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        "loggedRecipeappUser",
        JSON.stringify(userLogin)
      );

      recipeService.setToken(userLogin.token);
      setUser(userLogin);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

   return (
     <div>
       <h2>Login</h2>
 
       <form onSubmit={handleLogin}>
         <div>
           username
           <input
             value={username}
             onChange={e => setUsername(e.target.value)}
           />
         </div>
         <div>
           password
           <input
             type="password"
             value={password}
             onChange={e => setPassword(e.target.value)}
           />
       </div>
         <button type="submit">login</button>
       </form>
     </div>
   )
}

LoginForm.prototype = {
  setUser: PropTypes.func.isRequired,
}
 
 export default LoginForm