import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Confirm from './ConfirmPage';
import Selections from './Selections';
import Callback from './Callback';
import CallBackLogin from './CallBackLogin';
import NewsFeed from './NewsFeed';
import Dashboard from './Dashboard';
 

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route path="/signup/confirm" component={Confirm} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/selections/:params" component={Selections} />
        <Route exact path="/callback/:medium" component={Callback} />
        <Route path="/callback/login/:medium" component={CallBackLogin} />
        <Route path="/newsfeed" component={NewsFeed} />
      </div>
    </BrowserRouter>
  );
}

export default App;
