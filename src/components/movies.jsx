import React, { Component } from "react";
import ListGroup from "../shared/listGroup";
import Pagination from "../shared/pagination";
import paginate from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTabel";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    itemsPerPage: 4,
    currentPage: 1,
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" }
  };

  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
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

  handleSort = path => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };

  render() {
    const { length: countMovies } = this.state.movies;
    const {
      itemsPerPage,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre,
      sortColumn
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
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sortedMovies, currentPage, itemsPerPage);

    return (
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
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onFavourite={this.handleFavourite}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filteredMovies.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
