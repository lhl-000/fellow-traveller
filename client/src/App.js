import {Switch,Route,Redirect} from "react-router-dom";
import Home from "./pages/home";
import User from "./pages/user";
import Match from "./pages/match";
import Chat from "./pages/chat";
import Search from './pages/search'

function App() {
  return (
    <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/match" component={Match}/>
    <Route path="/chat" component={Chat}/>
    <Route path="/user" component={User}/>
    <Route path="/search" component={Search}/>
  </Switch>
  );
}

export default App;
