import './App.css';
import React from 'react';
//import { ReactDOM } from 'react';
import { SearchBar } from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist'
import { Spotify } from '../../util/Spotify'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //searchResults:[{name:"driver's liscense", artist:"Olivia Rodrigo", album:"SOUR", id:0}, {name:"We Are Young", artist:"fun", album:"Some Nights", id:1}],
      //playlistName: "test playlist",
      //playlistTracks: [{name:"driver's liscense", artist:"Olivia Rodrigo", album:"SOUR", id:0}, {name:"Changes", artist:"Hayd", album:"EP", id:2}]
      searchResults:[],
      playlistName: "test playlist",
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    Spotify.getAccessToken();
  }
  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    let updated = this.state.playlistTracks.concat(track);
    this.setState({playlistTracks:updated});
  }
  removeTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      let updated = [];
      for (let i = 0; i < this.state.playlistTracks.length; i++) {
        if (this.state.playlistTracks[i].id !== track.id) {
          updated = updated.concat(this.state.playlistTracks[i]);
        }
      }
      this.setState({playlistTracks:updated});
    }
  }
  updatePlaylistName(name) {
    this.setState({playlistName:name});
  }
  savePlaylist() {
    const trackURLs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURLs).then(() => {
      this.setState({
        searchResults:[],
        playlistName: "test playlist",
        playlistTracks: []
      });
    });
  }
  search(query) {
    Spotify.search(query).then(results => {
      this.setState({searchResults: results});
    });
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} handleNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
  </div>
    );
  } 
}

export default App;
