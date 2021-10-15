import React, { createContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/user/login";
import Dashboard from "./components/user/dashboard";
import Register from "./components/user/register";
import Home from "./components/user/home";

export const UserContext = createContext(null);
const initialState = {
  loading: true,
  error: "",
  users: [],
  allLoan: [],
  loans: [],
  grantorProfile: [],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "FETCH_ALL_USER_SUCCESS":
      return { ...state, loading: false, users: payload, error: "" };
    case "FETCH_ALL_USER_ERROR":
      return { ...state, loading: false, users: [], error: payload };
    case "FETCH_LOAN_SUCCESS":
      return { ...state, loading: false, loans: payload };
    case "FETCH_LOAN_ERROR":
      return { ...state, loading: false, loans: [], error: payload };
    case "FETCH_ALL_LOAN_SUCCESS":
      return { ...state, loading: false, allLoan: payload };
    case "FETCH_ALL_LOAN_ERROR":
      return { ...state, loading: false, allLoan: [], error: payload };
    case "FETCH_GRANTOR_SUCCESS":
      return { ...state, loading: false, grantorProfile: payload };
    case "FETCH_GRANTOR_ERROR":
      return { ...state, loading: false, grantorProfile: [], error: payload };

    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
