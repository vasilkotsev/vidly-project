import React from "react";

const MovieForm = ({ match, history }) => {
  // const handleSave = () => {
  //   history.push("/movies");
  // };

  // function handleSave() {
  //   return history.push("/movies");
  // }

  return (
    <React.Fragment>
      <h1>Movie Form {match.params.id}</h1>
      <button
        className="btn btn-primary mt-2"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </React.Fragment>
  );
};

export default MovieForm;
