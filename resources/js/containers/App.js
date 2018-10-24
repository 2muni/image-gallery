import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../store/modules/user';
import { getMetaData } from '../lib/auth'

class App extends Component {

  constructor(props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.props.UserActions.getStatusRequest(getMetaData('user'));
  }

  handleLogout() {
    const data = new FormData;
    data.append('_token', getMetaData('csrf-token'));
    this.props.UserActions.logoutRequest(data);
  }

  render() {

    const path = /(login|register|post)/;
    const isHidden = path.test(this.props.location.pathname);

    return (
      isHidden ? <React.Fragment></React.Fragment> :
      <header>
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">temit</Link>
            <ul className="right hide-on-med-and-down">
              <li><a href='/login' onClick={this.handleLogout}>로그아웃</a></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.user.status
})

const mapDispatchToProps = (dispatch) => ({
  UserActions: bindActionCreators(userActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
