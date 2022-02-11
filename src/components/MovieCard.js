import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <div
        data-testid="movie-card"
        className="movie-card"
        style={ {
          backgroundImage: `url('${movie.imagePath}')`,
          backgroundPosition: 'center center',
          backgroundSize: 'contain',
        } }
      >
        <div>
          <p>
            <strong>{'Title: '}</strong>
            { movie.title }
          </p>
          <p>
            <strong>{'Storyline: '}</strong>
            <br />
            { movie.storyline }
          </p>
          <p>
            <Link to={ `movies/${movie.id}` }>VER DETALHES</Link>
          </p>
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.string, PropTypes.number, PropTypes.bool],
  )).isRequired,
};

export default MovieCard;
