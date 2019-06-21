import React, {Component} from 'react';
import * as utils from '../../utils/index';

class Callback extends Component {
  state = {
    isOauthSuccessed: false,
    accessToken: ''
  }

  async componentDidMount() {
    if(this.props.location.search === '') {
      this.setState({
        isOauthSuccessed: false
      });
    } else {
      const response = await utils.callBackURL(this.props.location.search);
      
      this.setState({
        isOauthSuccessed: true,
        accessToken: response.data.data.accessToken
      });
      this.props.history.push(`/selections/${this.state.accessToken}`);
    }
  }

  render() {
    return (
      <div>
        <h1>CallBack Page</h1>
        {
          this.state.isOauthSuccessed ?
          <p>Google sign up is successed</p> :
          <p>Google sign up was failed, please contact the admin</p>
        }
      </div>
    )
  }
}

export default Callback;