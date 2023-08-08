const Notification = ({ message, errorMessage }) => {

    console.log(message);
    if (message === null && errorMessage === null) {
      return null
    } else if (errorMessage !== null) {
        return (
            <div className='notification error'>
              {errorMessage}
            </div>
          )
    } else {
        return (
            <div className='notification message'>
              {message}
            </div>
          )
    }
  

}
  
export default Notification