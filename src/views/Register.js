import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../actions/authActions';
import {Link} from 'react-router';


@connect(
  state => ({}),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class Register extends Component {

  static propTypes = {
    register: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      account: '',
      password: '',
      username: ''
    };
  }

  render() {
    require('./Register.scss');
    const {account, password, username} = this.state;

    return (
      <div className="container register-container">
        <form className="col s12 m12 l12" onSubmit={::this.handleSubmit} >
          <div className="row">
            <div className="input-field col s12 m12 l12">
              <input id="username" type="text" value={username} onChange={::this.handleChange} />
              <label htmlFor="username">Username</label>
            </div>
            <div className="input-field col s12 m12 l12">
              <input id="account" type="email" value={account} onChange={::this.handleChange} />
              <label htmlFor="account">Acount</label>
            </div>
            <div className="input-field col s12 m12 l12">
              <input id="password" type="password" value={password} onChange={::this.handleChange} />
              <label htmlFor="password">Password</label>
            </div>
            <button className="btn waves-effect waves-light" type="submit" name="action">
              Login
            </button>
            <Link to="/" className="btn waves-effect waves-light">
              cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }

  handleChange(e) {
    const key   = e.target.id;
    const value = e.target.value;

    this.setState({
      [key]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = this.state;
    this.props.register(data);
  }

}
