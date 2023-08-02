const Quote = ({quotes}) => {
    const randomNumer = Math.floor(Math.random() * quotes.length)
    console.log(randomNumer);
    return (
        <blockquote>
            {quotes[randomNumer].quote}
        <br />
            <cite>- { quotes[randomNumer].author}</cite>
      </blockquote>
    )
}

export default Quote;