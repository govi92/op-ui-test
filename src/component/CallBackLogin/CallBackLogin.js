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
      console.log(this.props.match.params);
      if(this.props.match.params.medium === 'facebook' || this.props.match.params.medium === 'google') {
        const res = await utils.loginCallBackURL(this.props.match.params.medium, this.props.location.search);
      if(res.status === 200) {
        this.setState({
          isOauthSuccessed: true,
        });
        this.props.history.push('/newsfeed');
      } else if(res.status === 404) {
        this.setState({
          isOauthSuccessed: false,
        });
      }
      }
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