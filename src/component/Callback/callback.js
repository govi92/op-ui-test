import React, {Component} from 'react';
import * as utils from '../../utils/index';
import qs from 'querystring';

class Callback extends Component {
  async componentDidMount() {
    console.log(this.props.location.search);
    await utils.callBackURL(this.props.location.search);
  }

  render() {
    return (
      <div>
        <h1>Call Back Page</h1>
        <p>{this.props.match.params.parms}</p>
      </div>
    )
  }
}

export default Callback;