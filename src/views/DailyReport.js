import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as moodActions from '../actions/moodActions';
import {isLoaded} from '../reducers/mood';
import {fetchMoods} from '../actions/moodActions';
import MoodCard from './MoodCard';

@connect(
  state => ({mood: state.mood}),
  dispatch => bindActionCreators(moodActions, dispatch)
)
export default class DailyReport extends Component {
  static propTypes = {
    mood: PropTypes.Array
  };

  renderEachMood(moods) {
    const dailyMAX = 3;
    let moodArr = [];

    for (let i = 0; i < dailyMAX; i++) {
      if (moods && moods[i]) {
        const emotion   = moods[i].emotion;
        const emo_image = require(`../images/emo_${emotion}.png`);
        moodArr.push(<li className="report-item">
          <img src={emo_image} alt={`${emotion}`} />
          <span>{moods[i].depiction}</span>
        </li>);
      } else {
        const emotion   = 'default';
        const emo_image = require(`../images/emo_${emotion}.png`);
        moodArr.push(<li className="report-item default">
          <img src={emo_image} alt=""/>
          <span>Say something...</span>
        </li>);
      }
    }
    return moodArr;
  }

  renderBottomComponent(mood) {
    if (!mood) {
      return (
        <Link to="/" className="btn-floating btn-large waves-effect waves-light">
          <i className="fa fa-plus"></i>
        </Link>
      );
    }
    return (
      <MoodCard mood={mood} />
    );
  }

  render() {
    require('./DailyReport.scss');
    const {daily_moods, old_mood} = this.props.mood.moods;
    return (
      <div className="daily-report container">
        <ul className="report-list">
          {::this.renderEachMood(daily_moods)}
        </ul>
        {::this.renderBottomComponent(old_mood)}
      </div>
    );
  }

  static fetchData(store) {
    if (!isLoaded(store.getState())) {
      return store.dispatch(fetchMoods());
    }
  }
}
