const Quote = ({ quotes }) => {
  return (
    <blockquote>
      {quotes.quote}
      <br />
      <cite>- {quotes.author}</cite>
    </blockquote>
  );
};

export default Quote;
