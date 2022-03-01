import React, {Component} from "react";
import "./App.css";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Promotions from "./pages/Promotions";
import Contact from "./pages/Contact";
import Error from "./pages/Error";

import Navbar from "./components/Navbar";

import { Switch, Route } from "react-router-dom";

class App extends Component {
  state = {
      data: null
    };
  
    componentDidMount() {
      this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
    }
      
    callBackendAPI = async () => {
      const response = await fetch('/express_backend');
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };
  
    render() {
      return (
        <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/" component={Rooms} />
        <Route exact path="/rooms/:slug" component={SingleRoom} />
        <Route exact path="/promotions/" component={Promotions} />
        <Route exact path="/contact/" component={Contact} />
        <Route component={Error} />
        <p className="App-intro">{this.state.data}</p> 
      </Switch>
    </>
      );
    }
  }

  /*
  <p className="App-intro">{this.state.data}</p>
  nem tudom mit csinál pontosan ! */
  
  export default App;

/*

function-os megoldás, később kellhet még

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/" component={Rooms} />
        <Route exact path="/rooms/:slug" component={SingleRoom} />
        <Route exact path="/promotions/" component={Promotions} />
        <Route exact path="/contact/" component={Contact} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;*/