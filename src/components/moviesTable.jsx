import React, { Component } from "react";
import FavouriteIcon from "../common/favouriteIcon";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "favourite",
      content: movie => (
        <FavouriteIcon
          isFavourite={movie.isFavourite}
          onClick={() => this.props.onFavourite(movie)}
        />
      )
    },
    {
      key: "delete",
      content: function(movie) {
        return (
          <button
            className="btn btn-danger btn-small"
            onClick={function() {
              return this.props.onDelete(movie);
            }.bind(this)}
          >
            Delete
          </button>
        );
      }.bind(this)
    }
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <TableBody data={movies} columns={this.columns} />
      </table>
    );
  }
}

export default MoviesTable;
