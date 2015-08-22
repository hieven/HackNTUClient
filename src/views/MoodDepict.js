import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as moodActions from '../actions/moodActions';

@connect(
  state => ({mood: state.mood, user: state.auth.user}),
  dispatch => bindActionCreators(moodActions, dispatch)
)
export default class MoodDepict extends Component {
  static propTypes = {
    mood: PropTypes.object,
    user: PropTypes.object,
    params: PropTypes.object,
    addMood: PropTypes.func
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      emotion: this.props.params.emotion || '',
      depiction: this.props.mood.depiction || '',
      longitude: 0,
      latitude: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.mood.completed && nextProps.mood.completed) {
      const {user_id} = this.props.user;
      this.context.router.transitionTo(`/mood/${user_id}/dailyReport`);
    }
  }

  render() {
    require('./MoodDepict.scss');
    const emotion = `emo_${this.props.params.emotion}.png`;
    const emo_image = require(`../images/${emotion}`);
    const { depiction } = this.state;
    return (
      <div className="mood-depict">
        <img src={emo_image} alt="" />
        <form className="col s12 m12 l12" onSubmit={::this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12 m12 l12">
              <input id="depict" type="text" value={depiction} onChange={::this.handleChange} />
              <label htmlFor="depict">Say something...</label>
            </div>
            <div className="counter">{depiction.length} / {25}</div>
          </div>
          <button className="btn waves-effect waves-light" type="submit" name="action">
            <i className="material-icons">Enter</i>
          </button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    const depiction = e.target.value;
    if (depiction.length > 25) {
      return;
    }
    this.setState({depiction});
  }

  handleSubmit(e) {
    e.preventDefault();
    const longitude = nome.getLongitude();
    const latitude  = nome.getLatitude();
    this.setState({longitude, latitude});
    const mood = this.state;

    this.props.addMood(mood);
    this.setState({
      depiction: ''
    });
  }
}

