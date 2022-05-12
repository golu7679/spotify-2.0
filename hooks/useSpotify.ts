import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
})

function useSpotify() {
    const { data: session, status } = useSession();
    useEffect(() => {
        if (session) {
            // if refresh access token attempt fails, redirect user to login...
            if (session.error === 'RefreshAccessTokenError') {
                signIn();
            }

            spotifyApi.setAccessToken(session.accessToken);

        }
    }, [session])

    return spotifyApi;
}

export default useSpotify;