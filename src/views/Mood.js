import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class Mood extends Component {

  render() {
    require('./Mood.scss');

    const happy  = require('../images/bg_emo_happy.png');
    const yabee  = require('../images/bg_emo_yabee.png');
    const angry  = require('../images/bg_emo_angry.png');
    const sad    = require('../images/bg_emo_sad.png');
    const scared = require('../images/bg_emo_scared.png');
    const peace  = require('../images/bg_emo_peace.png');
    return (
      <div className="mood-wrapper">
        <div className="row">
          <div className="mood col s6 m6 l6 odd">
            <Link to="/mood/yabee">
              <img src={yabee} alt="" />
            </Link>
          </div>
          <div className="mood col s6 m6 l6">
            <Link to="/mood/angry">
              <img src={angry} alt="" />
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="mood col s6 m6 l6 odd">
            <Link to="/mood/happy">
              <img src={happy} alt="" />
            </Link>
          </div>
          <div className="mood col s6 m6 l6">
            <Link to="/mood/sad">
              <img src={sad} alt="" />
            </Link>
          </div>
        </div>
         <div className="row">
          <div className="mood col s6 m6 l6 odd">
            <Link to="/mood/scared">
              <img src={scared} alt="" />
            </Link>
          </div>
          <div className="mood col s6 m6 l6">
            <Link to="/mood/peace">
              <img src={peace} alt="" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

}
