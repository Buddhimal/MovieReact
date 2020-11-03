import React from "react";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import NavBar from "./components/common/NavBar";
// import Login from "./components/Login"


class App extends React.Component {
// export default class AdminPortal extends Component {

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
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
