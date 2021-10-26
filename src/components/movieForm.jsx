import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: []
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .label("Number in Stock")
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .required()
      .label("Daily Rental Rate")
      .min(0)
      .max(10)
  };

  populateGenres = async () => {
    // Правим Get заявка, взимаме данните за жанровете ги сетваме в state object
    const { data: genres } = await getGenres(); //Call backend
    this.setState({ genres });
  };

  populateMovie = async () => {
    try {
      /* Взимаме id параметъра от route, запазваме го в променлива и правим проверка
        ако стойността е 'new', прекъсваме веднага изпълнението на следващите стъпки,
        тъй като няма да попълваме формата с movie обекта */
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      /* Правим get заявка към endpointa с id-то за конкретния филм */
      const { data: movie } = await getMovie(movieId); //Call backend

      /* Ъпдейтваме state object-a, подавайки му данните чрез метод, на който подаваме movie обекта от сървъра
        и създаваме и връщаме нов различен обект с необходимите данни, които да използваме за тази страница/форма */
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        /* Ако url с id-ито не съвпада с нито едно movie от базата данни,
        responsa е 404 error и редирект-ваме потребителя към page-not-found */
        this.props.history.replace("/not-found");
    }
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  doSubmit = async () => {
    await saveMovie(this.state.data); //call the server and redirect to other page
    this.props.history.push("/movies");
  };

  render() {
    const { genres, errors, data } = this.state;

    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          <div className="form-group">
            <label htmlFor="genreId">Genre</label>
            <select
              className="form-control"
              name="genreId"
              id="genreId"
              onChange={this.handleChange}
              value={data["genreId"]}
            >
              <option value={""} />
              {genres.map(genre => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>
            {errors["genreId"] && (
              <div className="alert alert-danger">{errors["genreId"]}</div>
            )}
          </div>
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
