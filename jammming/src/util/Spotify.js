let accessToken;
//const clientID = "4277843b9f8f4997b50ec10c668655e6";
const clientID = "4277843b9f8f4997b50ec10c668655e6";
const redirectURI = "https://sensational-biscochitos-25858b.netlify.app" //"http://localhost:3000/"
export const Spotify =  {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        } else {
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
            if (accessTokenMatch && expiresInMatch) {
                accessToken = accessTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]);

                //clear token after it expires
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');

                return accessToken;
            } else {
                window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            }
        }
    },
    search(searchTerm) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
          }).then(responce => {
            return responce.json();
          }).then(jsonResponce => {
            if (!jsonResponce.tracks) {
                return [];
            } else {
                //console.log(jsonResponce.tracks.items[0]);
                return jsonResponce.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                    image: track.album.images[0].url,
                    duration: track.duration_ms,
                    preview: track.preview_url
                }));
            }
          });
    },
    savePlaylist(name, trackURLs) {
        if (!(name && trackURLs)) {
            return
        } else {
            const accessToken = Spotify.getAccessToken();
            let headers = {Authorization: `Bearer ${accessToken}`};
            let userID;
            return fetch('https://api.spotify.com/v1/me', {
                headers: headers
              }).then(responce => responce.json()
              ).then(jsonResponce => {
                userID = jsonResponce.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({name:name})
                }).then(responce => responce.json()
                ).then(jsonResponce => {
                    const playlistID = jsonResponce.id;
                    return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlistID}/tracks`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({uris: trackURLs})
                    });
                })
              });
        }
    }
}