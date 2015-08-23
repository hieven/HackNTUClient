import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {isLoaded as isAuthLoaded} from '../reducers/auth';
import {load as loadAuth, logout} from '../actions/authActions';
import {createTransitionHook} from '../universalRouter';

const title = 'React Redux Example';
const description = 'All the modern best practices in one example.';
const image = 'https://react-redux.herokuapp.com/logo.jpg';

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
    property: {
      'og:site_name': title,
      'og:image': image,
      'og:locale': 'en_US',
      'og:title': title,
      'og:description': description,
      'twitter:card': 'summary',
      'twitter:site': '@erikras',
      'twitter:creator': '@erikras',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:image:width': '200',
      'twitter:image:height': '200'
    }
  }
};

@connect(
    state => ({user: state.auth.user}),
    dispatch => bindActionCreators({logout}, dispatch))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    const {router, store} = this.context;
    this.transitionHook = createTransitionHook(store);
    router.addTransitionHook(this.transitionHook);
  }

  componentDidMount() {
    // We need this to enable materialize sideNav animation
    $('.button-collapse').sideNav();
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.user);
    console.log(nextProps.user);
    if (!this.props.user && nextProps.user) {
      // login
      document.cookie = `user_id=${nextProps.user.user_id}`;
      this.context.router.transitionTo('/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.context.router.transitionTo('/');
    }
  }

  componentWillUnmount() {
    const {router} = this.context;
    router.removeTransitionHook(this.transitionHook);
  }

  renderNav() {
    const { user } = this.props;
    const icon_add = require('../images/icon_add.png');
    const icon_box = require('../images/icon_box.png');
    const icon_daily = require('../images/icon_daily.png');
    const icon_weekly = require('../images/icon_weekly.png');
    const icon_map = require('../images/icon_map.png');
    const icon_login = require('../images/icon_login.png');
    // Need to login
    if (!user) {
      return [
        <li className="item">
          <Link to="/login"><img src={icon_login} />Login</Link>
        </li>
      ];
    }
    return [
      <li className="item"><Link to="/"><img src={icon_add} />New entry</Link></li>,
      <li className="item"><Link to={`/mood/${user.user_id}/dailyReport`}><img src={icon_daily} />Daily Report</Link></li>,
      <li className="item"><Link to={`/mood/${user.user_id}/weeklyReport`}><img src={icon_weekly} />Weekly Report</Link></li>,
      <li className="item"><Link to="/emoMap"><img src={icon_map} />Emo map</Link></li>,
      <li className="item"><a href="#" onClick={::this.handleLogout}><img src={icon_login} />Logout</a></li>
    ];
  }

  render() {
    const {user} = this.props;
    const default_avatar = require('../images/avatar.png');
    require('./App.scss');
    return (
      <div className="app">
        <DocumentMeta {...meta}/>

        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Emo Diary</a>
              <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="fa fa-bars"></i></a>

              <ul className="right hide-on-med-and-down">
                {::this.renderNav()}
              </ul>
              <ul className="side-nav" id="mobile-demo">
                <li className="profile-list">
                  <div className="profile">
                    <img className="avatar" src={default_avatar} alt="avatar"/>
                    <h6 className="moniker">{(user || {}).username || 'Visitor'}</h6>
                  </div>
                </li>
                {::this.renderNav()}
              </ul>
            </div>
          </nav>
        </div>
        <div className="appContent">
          {this.props.children}
        </div>
      </div>
    );
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  static fetchData(store) {
    const promises = [];
    if (!isAuthLoaded(store.getState())) {
      promises.push(store.dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }
}
