
import './App.css';
import Login from './component/Login';
import Register from './component/Register';
import HomePage from './component/HomePage';
import ActivateAccount from './component/ActivateAccount';
import ForgetPass from './component/ForgetPass';
import PassUpdate from './component/PassUpdate';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/home/:email' component={HomePage} />
          <Route exact path='/:email/:token' component={ActivateAccount} />
          <Route path="/forget" component={ForgetPass} />
          <Route path="/update/:token/:email" component={PassUpdate} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
