import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

// const handleSave = () => {
//   history.push("/movies");
// };

// function handleSave() {
//   return history.push("/movies");
// }

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: []
  };

  schema = {
    id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .label("Number in Stock")
      .integer()
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .required()
      .label("Daily Rental Rate")
      .integer()
      .min(0)
      .max(10)
  };

  componentDidMount() {
    // 1.Взимаме данните за жанровете и ги сетване в state object
    const genres = getGenres();
    this.setState({ genres });
    console.log(genres);
  }

  doSubmit = () => {
    //call the server and redirect to other page
    console.log("Submit Save");
  };

  render() {
    const { genres } = this.state;
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select className="form-control" name="genre">
              {genres.map(genre => (
                <option>{genre.name}</option>
              ))}
              {/*<option value="Action">{genres[0]}</option>*/}
              {/*<option value="Comedy">{genres[1]}</option>*/}
              {/*<option value="Thriller">{genres[2]}</option>*/}
            </select>
          </div>
          {this.renderInput("number", "Number in Stock", "number")}
          {this.renderInput("rate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
