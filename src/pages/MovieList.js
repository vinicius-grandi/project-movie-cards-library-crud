import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../components';
import MovieCard from '../components/MovieCard';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { movies } = this.state;
    movieAPI.getMovies().then((movie) => {
      movies.push(...movie);
      this.setState({ loading: false });
    });
  }

  render() {
    const { movies, loading } = this.state;
    if (loading) return <Loading />;
    // Render Loading here if the request is still happening
    return (
      <>
        <div
          data-testid="movie-list"
          className="movie-list"
        >
          {movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
        </div>
        <ul>
          <li><Link to="/movies/new">ADICIONAR CARTÃO</Link></li>
        </ul>
      </>
    );
  }
}

export default MovieList;
