import React from 'react';

const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = "http://localhost:3000";
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
  state = {
    token: ''
  }

  componentDidMount() {
    // Set token
    const token = hash.access_token;
    if (token) {
      // Set token
      this.setState({
        token
      });
    }
  }

  render() {
    return (
      <div>
        {!this.state.token && (
        <a href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}>
          Login to Spotify
        </a>
      )}
      {this.state.token && (
        <div>In</div>
      )}
      </div>
    );
  }
}

export default SpotifyAuth;