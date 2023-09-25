function ErrorPage(error) {

  return (
    <div>
      Oops, something went wrong...
      Error: {error.name}, {error.message}
    </div>
  );
}

export default ErrorPage;
