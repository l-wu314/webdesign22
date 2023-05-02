import React from 'react';
import './Track.css';
export class Track extends React.Component {
    constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this);
    }
    renderAction() {
      return (
        <button className='Track-action' onClick={this.onClick}>{this.props.isRemoval ? '-' : '+'}</button>
      )
    }
    onClick() {
      this.props.onClick(this.props.track);
    }
    msToTime(ms) {
      let seconds = Math.round((ms / 1000) % 60);
      let minutes = Math.floor((ms / (1000 * 60)) % 60);
      let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

      seconds = (seconds < 10) ? "0" + seconds : seconds;
    
      if (hours === 0) {
        return minutes + ":" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds;
    }
    render() {
      return (
        <div className="Track">
          <img src={this.props.track.image} alt=""/>
        <div className="Track-information">
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist} | {this.props.track.album} | {this.msToTime(this.props.track.duration)}</p>
            <audio controls src={this.props.track.preview} type="audio/ogg">Unsoppurted audio file</audio>
        </div>
          {this.renderAction()}
        </div>
      );
    } 
  }