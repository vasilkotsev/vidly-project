import React from "react";
import FavouriteIcon from "../shared/favouriteIcon";

const MoviesTable = props => {
  const { movies, onDelete, onFavourite } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {movies.map(movie => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <FavouriteIcon
                //movie={movie}
                isFavourite={movie.isFavourite}
                //onClick={this.handleFavourite}
                onClick={() => onFavourite(movie)}
              />
            </td>
            <td>
              <button
                className="btn btn-danger btn-small"
                onClick={function() {
                  return onDelete(movie);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
