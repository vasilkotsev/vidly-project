import React, { Component } from "react";
import Link from "react-router-dom/Link";
import FavouriteIcon from "./common/favouriteIcon";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={"/movies/" + movie._id}>{movie.title}</Link>
    },
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
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
