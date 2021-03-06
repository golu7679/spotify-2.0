import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "streaming",
    "user-read-private",
    "user-top-read",
    "user-library-modify",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-follow-read",
    "user-library-read",
    "user-modify-playback-state",
    "user-read-recently-played"
].join(",");

const params = {
    scopes: scopes
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
})

export default spotifyApi;
export { LOGIN_URL };