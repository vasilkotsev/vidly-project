import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import FavouriteIcon from "../shared/favouriteIcon";
import Pagination from "../shared/pagination";
import paginate from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    itemsPerPage: 4,
    currentPage: 1
  };

  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(movie) {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  }

  handleFavourite = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].isFavourite = !movies[index].isFavourite;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: countMovies } = this.state.movies;

    if (countMovies === 0) return <p>There is no movies in the database</p>;

    const { itemsPerPage, currentPage, movies: allMovies } = this.state;
    const movies = paginate(allMovies, currentPage, itemsPerPage);

    return (
      <React.Fragment>
        <p>There is {countMovies} in the database</p>
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
                    movie={movie}
                    isFavourite={movie.isFavourite}
                    //onClick={this.handleFavourite}
                    onClick={() => this.handleFavourite(movie)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-small"
                    onClick={function() {
                      return this.handleDelete(movie);
                    }.bind(this)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={countMovies}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
