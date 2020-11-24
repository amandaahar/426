import React from "react";
import "./App.css";
import { Browse, Home, Login, SignUp, Explore, } from "./pages";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import jwtDecode from 'jwt-decode';


//Components
import FirebaseNav from './components/FirebaseNav';
import AuthRoute from './util/AuthRoute';

//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userActions';
import axios from "axios";

axios.defaults.baseURL = "https://us-central1-recipeezy-bd890.cloudfunctions.net/api";
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);

  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }else{
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return(
    <Provider store = {store}>
      <div>
        <Router>
          <FirebaseNav/>
          <div className="container">
          <Switch>
            <Route exact path="/" component={Home}/> 
            <Route exact path="/browse" component={Browse}/> 
            <Route exact path="/explore" component={Explore}/>
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/signup" component={SignUp} />
          </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  )
}
export default App;
