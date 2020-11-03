import React from "react";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import NavBar from "./components/common/NavBar";
import Login from "./components/Login"


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            loggedInStatus: false
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="grid-container">
                    <NavBar/>
                    <Login/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
