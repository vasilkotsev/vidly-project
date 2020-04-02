import React, { Component } from "react";
import FavouriteIcon from "../shared/favouriteIcon";
import TableHeader from "../shared/tableHeader";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "favourite" },
    { key: "delete" }
  ];

  render() {
    const { movies, onDelete, onFavourite, onSort, sortColumn } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <FavouriteIcon
                  isFavourite={movie.isFavourite}
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
  }
}
// const MoviesTable = props => {
//     const { movies, onDelete, onFavourite, onSort } = props;
// };

export default MoviesTable;
