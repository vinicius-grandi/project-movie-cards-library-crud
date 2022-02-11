import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Loading, MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      loading: true,
      shouldRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    const [id] = location.pathname.match(/[0-9]/);
    movieAPI.getMovie(id).then((movie) => {
      this.setState({ loading: false, movie });
    });
  }

  handleSubmit(updatedMovie) {
    this.setState({ loading: true });
    movieAPI.updateMovie(updatedMovie).then(
      () => this.setState({ shouldRedirect: true }),
    );
  }

  render() {
    const { shouldRedirect, movie, loading } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    if (loading) {
      return <Loading />;
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

EditMovie.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default EditMovie;
