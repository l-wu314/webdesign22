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
    render() {
      return (
        <div className="Track">
        <div className="Track-information">
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
          {this.renderAction()}
        </div>
      );
    } 
  }