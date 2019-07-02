import React, {Component} from 'react';
import { css } from '@emotion/core';
import { GridLoader } from 'react-spinners';
import * as utils from '../../utils/index';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Callback extends Component {
  state = {
    isOauthSuccessed: true,
    accessToken: '',
    errorMsg: ''
  }

  async componentDidMount() {
    if(this.props.location.search === '') {
      this.setState({
        isOauthSuccessed: false
      });
    } else {
      if(this.props.match.params.medium === 'facebook' || this.props.match.params.medium === 'google') {
        const response = await utils.callBackURL(this.props.match.params.medium, this.props.location.search);
        
        if(response.status === 200) {
          this.setState({
          isOauthSuccessed: true,
          accessToken: response.data.data.accessToken
        });
        this.props.history.push(`/selections/${this.state.accessToken}`);
        } else if(response.status === 500) {
          this.props.history.push({
            pathname: '/',
            state: {
              error: response.data.message
            }
          });
        } else if(response.status === 403) {
          this.props.history.push({
            pathname: '/',
            state: {
              error: response.data.message
            }
          });
        } else if(response.status === 400) {
          this.props.history.push({
            pathname: '/',
            state: {
              error: 'Bad Request, Please reregister to continue.'
            }
          });
        };
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

export default Callback;