import React from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList'
export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.onNameChange = this.onNameChange.bind(this);
  }
  onNameChange(name) {
    this.props.handleNameChange(name.target.value);
  }
  render() {
    return (
      <div className="Playlist">
      <input defaultValue={this.props.playlistName} onChange={this.onNameChange}/>
      < TrackList tracks={this.props.playlistTracks} isRemoval={true} onClick={this.props.onRemove}/>
      <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    );
  } 
}