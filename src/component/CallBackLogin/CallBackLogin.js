import React, {Component} from 'react';
import * as utils from '../../utils/index';

class CallBackLogin extends Component {
  state = {
    isOauthSuccessed: false
  }

  async componentDidMount() {
    if(this.props.location.search === '') {
      this.setState({
        isOauthSuccessed: false
      });
    } else {
      await utils.loginCallBackURL(this.props.location.search);
      this.setState({
        isOauthSuccessed: true,
      });
      this.props.history.push('/newsfeed');
    }
  }

  render() {
    return (
      <div>
        <h1>CallBack Login</h1>
        {
          this.state.isOauthSuccessed ?
          <p>Google Login is successed</p> :
          <p>Google Login was failed, please contact the admin</p>
        }
      </div>
    )
  }
}

export default CallBackLogin;