import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StoreContext } from "./context";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Register from "./components/register";
import Navbar from "./components/navbar";
import Payment from "./components/payment";

const App = () => {
  let [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const setUser = (user) => {
    setCurrentUser(user);
  };
  return (
    <StoreContext.Provider value={{ setUser, currentUser }}>
      <Router>
        <Navbar currentUser={currentUser} />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/loan/:loanId" component={Payment} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </StoreContext.Provider>
  );
};

export default App;
