import React from "react";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute"
import NavBar from "./components/common/NavBar";
import Login from "./components/Login"
import Home from "./components/MovieList"


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
                    {/*<Login/>*/}
                    <Switch>
                        <ProtectedRoute path="/admin/home" component={Home} exact/>
                        <Route path="/login" component={Login} exact/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
