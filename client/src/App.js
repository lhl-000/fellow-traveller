import {Switch,Route,Redirect} from "react-router-dom";
import Home from "./pages/home";
import User from "./pages/user";
import Find from "./pages/find";
import Chat from "./pages/chat";

function App() {
  return (
    <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/find" component={Find}/>
    <Route path="/chat" component={Chat}/>
    <Route path="/user" component={User}/>
  </Switch>
  );
}

export default App;
