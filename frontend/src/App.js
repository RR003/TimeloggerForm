import "./App.css";
import AddEmployee from "./Components/AddEmployee";
import View from "./Components/View";
import CreatePassword from "./Components/CreatePassword";
import CreateAccount from "./Components/CreateAccount";
import { Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/" component={AddEmployee} />
      <Route exact path="/createaccount" component={CreateAccount} />
      <Route exact path="/createpassword" component={CreatePassword} />

      <Route exact path="/view" component={View} />
    </Router>
  );
}

export default App;
