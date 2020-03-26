import React, { Component } from "react";
import ListGroup from "../shared/listGroup";
import Pagination from "../shared/pagination";
import FavouriteIcon from "../shared/favouriteIcon";
import paginate from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    itemsPerPage: 4,
    currentPage: 1,
    selectedGenre: ""
  };

  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
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

  handleGenresSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { length: countMovies } = this.state.movies;
    const {
      itemsPerPage,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre
    } = this.state;

    if (countMovies === 0) return <p>There is no movies in the database</p>;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    // let filteredMovies = allMovies;
    // if (selectedGenre) {
    //   filteredMovies = allMovies.filter(
    //     m => m.genre._id === selectedGenre._id
    //   );
    // }

    const movies = paginate(filteredMovies, currentPage, itemsPerPage);

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3">
            <ListGroup
              selectedItem={selectedGenre}
              items={genres}
              onItemSelect={this.handleGenresSelect}
            />
          </div>
          <div className="col-md">
            {" "}
            <p>There is {filteredMovies.length} in the database</p>
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
              itemsCount={filteredMovies.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
