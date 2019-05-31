import React from 'react';
import { connect } from 'react-redux';
import {
  signIn
} from '../actions';

const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

class SpotifyAuth extends React.Component {
  componentDidMount() {
    const token = hash.access_token;
    if (token) {
      // Set token
      this.props.signIn(token);
    }
  }

  render() {
    return (
      <div>
        {!this.props.auth.token && (
        <a href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}>
          Login to Spotify
        </a>
      )}
      {this.props.auth.token && (
        <div>Signed In</div>
      )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {
  signIn
})(SpotifyAuth);