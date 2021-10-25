import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    itemsPerPage: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };

  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    const { data: dataGenres } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...dataGenres];

    const { data: movies } = await getMovies();

    this.setState({ movies, genres });
  }

  async handleDelete(movie) {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id); //call the server
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted");
      }
      this.setState({ movies: originalMovies });
    }
  }

  handleFavourite = function(movie) {
    this.setState(function(prevState) {
      const movies = [...prevState.movies];
      const index = movies.findIndex(m => m._id === movie._id);
      movies[index] = { ...movie };
      movies[index].isFavourite = !movies[index].isFavourite;
      return { movies };
    });
    //Call the backend server /somewhere in this method/ to persist the changes in database
  }.bind(this);

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenresSelect = genre => {
    this.setState({
      selectedGenre: genre,
      searchQuery: "",
      currentPage: 1
    });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      itemsPerPage,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    let filteredMovies = allMovies;

    if (searchQuery)
      filteredMovies = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredMovies = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    ); // Lodash method to sort array of objects by differents paths
    const movies = paginate(sortedMovies, currentPage, itemsPerPage);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const { length: countMovies } = this.state.movies;
    const {
      itemsPerPage,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    if (countMovies === 0) return <p>There is no movies in the database</p>;

    const { totalCount, data: movies } = this.getPagedData();

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
          <Link className="btn btn-primary mb-4" to="/movies/new">
            New Movie
          </Link>
          <p>There is {totalCount} in the database</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onFavourite={this.handleFavourite}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
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
