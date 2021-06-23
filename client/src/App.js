import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/home";
import User from "./pages/user";
import Match from "./pages/match";
import Chat from "./pages/chat";
import Search from './pages/search';
import Observer from './pages/observer';
import People from './pages/people';
import Edit from './pages/user/edit';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/match" component={Match} />
      <Route path="/chat" component={Chat} />
      <Route path="/user/edit" component={Edit} />
      <Route path="/user" component={User} />
      <Route path="/search" component={Search} />
      <Route path="/observer" component={Observer} />
      <Route path="/people" component={People} />
    </Switch>
  );
}

export default App;
