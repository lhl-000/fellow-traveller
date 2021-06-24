import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/home";
import User from "./pages/user";
import Match from "./pages/match";
import Chat from "./pages/chat";
import Search from './pages/search';
import Observer from './pages/observer';
import People from './pages/people';
import Edit from './pages/user/edit';
import Login from './pages/login';
import Register from './pages/register';
import AuthRouter from './components/AuthRouter';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <AuthRouter path="/match" component={Match}></AuthRouter>
      <AuthRouter path="/chat" component={Chat}></AuthRouter>
      <AuthRouter path="/user/edit" component={Edit}></AuthRouter>
      <AuthRouter path="/user" component={User}></AuthRouter>
      <Route path="/search" component={Search} />
      <Route path="/observer" component={Observer} />
      <Route path="/people" component={People} />
      <Route path="/login" component={Login} />
      <Route path='/register' component={Register} />
    </Switch>
  );
}

export default App;
