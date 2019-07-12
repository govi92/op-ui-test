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

        if(res) {
          if(res.status === 200) {
            this.setState({
              isOauthSuccessed: true,
            });
            localStorage.setItem('loginCredentials', res.data.data );       
            this.props.history.push({
              pathname: '/home',
              state: {ref: res.data.data.userRef, type: res.data.data.userType }
            });    
          } else {
            this.props.history.push({
              pathname: '/',
              state: {error: res.message}
            });
          }
        } else {
          this.props.history.push({
            pathname: '/',
            state: {error: res.message}
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