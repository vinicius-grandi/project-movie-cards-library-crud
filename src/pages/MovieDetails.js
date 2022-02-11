import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
      loading: true,
      shouldRedirect: false,
    };

    this.handleDeleteMovie = this.handleDeleteMovie.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    const [id] = location.pathname.match(/[0-9]/);
    movieAPI.getMovie(id).then((movie) => {
      this.setState({ loading: false, movie });
    });
  }

  handleDeleteMovie(movieID) {
    this.setState({ loading: true });
    movieAPI.deleteMovie(movieID).then(
      () => this.setState({ shouldRedirect: true, loading: false }),
    );
  }

  render() {
    const { loading, movie, shouldRedirect } = this.state;
    // Change the condition to check the state
    // if (true) return <Loading />;
    if (loading) return <Loading />;
    if (shouldRedirect) return <Redirect to="/" />;
    const { id, title, storyline, imagePath, genre, rating, subtitle } = movie;
    console.log();
    return (
      <div data-testid="movie-details" className="movie-details">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <div>
          <p>{ `Subtitle: ${title}` }</p>
          <p>{ `Subtitle: ${subtitle}` }</p>
          <p>{ `Storyline: ${storyline}` }</p>
          <p>{ `Genre: ${genre}` }</p>
          <p>{ `Rating: ${rating}` }</p>
          <p>
            <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
            <Link to="/">VOLTAR</Link>
            <button
              type="button"
              id="delete-button"
              onClick={ () => this.handleDeleteMovie(id) }
            >
              DELETAR
            </button>
          </p>
        </div>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default MovieDetails;
