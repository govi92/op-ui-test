import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Confirm from './ConfirmPage';
import Selections from './Selections';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route path="/signup/confirm" component={Confirm} />
        <Route path="/selections" component={Selections} />
      </div>
    </BrowserRouter>
  );
}

export default App;
