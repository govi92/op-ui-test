import React, {Component} from 'react';
import { css } from '@emotion/core';
import { GridLoader } from 'react-spinners';
import * as utils from '../../utils/index';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
class CallBackLogin extends Component {
  state = {
    isOauthSuccessed: true
  }

  async componentDidMount() {
    if(this.props.location.search === '') {
      this.setState({
        isOauthSuccessed: false
      });
    } else {
      if(this.props.match.params.medium === 'facebook' || this.props.match.params.medium === 'google') {
        const res = await utils.loginCallBackURL(this.props.match.params.medium, this.props.location.search);
        console.log(res);
        
      if(res.status === 200) {
        this.setState({
          isOauthSuccessed: true,
        });
        
        localStorage.setItem('loginCredentials', res.data.data );
        this.props.history.push('/newsfeed');

      } else if(res.status === 500) {
        this.props.history.push({
          pathname: '/login',
          state: {error: 'Something went wrong. Please try again.'}
        });
        this.setState({
          isOauthSuccessed: false,
        });
      } else if(res.status === 404) {
        this.setState({
          isOauthSuccessed: false,
        });
        setTimeout(() => {
          this.props.history.push({
            pathname: '/login',
            state: {error: 'You haven\'t registered before'}
          });
        }, 1000);
      } else if(res.status === 403) {
        this.props.history.push({
          pathname: '/login',
          state: {error: 'Forbidden, You haven\'t registered before'}
        });
        this.setState({
          isOauthSuccessed: false,
        });
      } else if(res.status === 401) {
        this.props.history.push({
          pathname: '/login',
          state: {error: 'Unauthorized, Please login again to continue.'}
        });
        this.setState({
          isOauthSuccessed: false,
        });
      } else if(res.status === 400) {
        this.props.history.push({
          pathname: '/login',
          state: {error: 'Bad Request, Please login again to continue.'}
        });
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
        {
          this.state.isOauthSuccessed ?
          <div 
            style={{
              marginTop: '15%'
            }}
          >
            <GridLoader
              css={override}
              sizeUnit={"px"}
              size={20}
              color={'#3cb19c'}
              loading={true}
            />
            <p style={{textAlign:'center', marginTop: '10px'}}>Redirecting...</p>
          </div>
          :
          <div
            style={{
              marginTop: '15%'
            }}
          >
            <p style={{textAlign:'center', marginTop: '10px'}}>Authentication failed, please contact the admin...</p>
          </div>
        }
      </div>
    )
  }
}

export default CallBackLogin;