import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import FavouriteIcon from "../shared/favouriteIcon";

class Movies extends Component {
  state = {
    movies: getMovies()
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

  render() {
    const { length: countMovies } = this.state.movies;
    if (countMovies === 0) return <p>There is no movies in the database</p>;
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
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <FavouriteIcon
                    movie={movie}
                    isFavourite={movie.isFavourite}
                    onFavourite={this.handleFavourite}
                    //onFavourite={() => this.handleFavourite(movie)}
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
      </React.Fragment>
    );
  }
}

export default Movies;
