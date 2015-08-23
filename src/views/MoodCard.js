import React, {Component, PropTypes} from 'react';

export default class MoodCard extends Component {

  static propTypes = {
    mood: PropTypes.object
  };

  render() {
    require('./MoodCard.scss');
    const {mood} = this.props
    const emotion = mood.emotion;
    const emo_image = require(`../images/emo_${emotion}.png`);
    const icon_box = require('../images/icon_box.png');
    const icon_share = require('../images/icon_share.png');
    const icon_map = require('../images/icon_map.png');
    return (
      <div className="mood-card card">
        <div className="card-content">
          <img src={emo_image} alt=""/>
          <span>{new Date(Date.parse(mood.createdAt)).toISOString().slice(0,10)}</span>
          <p className="depiction">{mood.depiction}</p>
          <p className="position"><img src={icon_map} alt=""/>{mood.longitude},{mood.latitude}</p>
        </div>
        <div className="card-action white-text">
          <span className="box-title">
            <img src={icon_box} alt="" />
            Emo Box
          </span>
          <a className="share right" href="#"><img src={icon_share} alt=""/></a>
        </div>
      </div>
    );
  }
}
