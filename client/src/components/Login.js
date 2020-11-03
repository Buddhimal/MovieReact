import React, {Component} from "react";
// import '../assets/css/login.css';
import axios from "axios";
import {withRouter} from 'react-router-dom';
import Config from '../config';
import Auth from "./Auth"

const jwt = require("jsonwebtoken");


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            visibility: "hidden",
            isError: false,
            token: JSON.parse(localStorage.getItem("authToken"))
        };
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.checkAuth(this.state)

    }


    checkAuth(user) {
        // alert("came")



        axios.post('http://localhost:3000/api/auth', {
            username: user.username,
            password: user.password,
        }, {
            headers: {
                "x-jwt-token": this.state.token,
            }
        }).then(response => {
            // do stuff
            this.setState({isError: false})
            let token = response.data.token;
            let user_type = response.data.type;

            // Auth.logIn(() => {
            //         this.props.history.push("/admin/home")
            //     }
            // )

            localStorage.setItem("authToken", JSON.stringify(token));
            localStorage.setItem("user_type", JSON.stringify(user_type));

            this.props.history.push('/home');
            // console.log(response.data.token);
        })
            .catch(err => {
                if (err.response) {
                    this.setState({isError: true})
                    console.log(err.response)
                    localStorage.setItem("authToken", "");
                    localStorage.setItem("userId", "");
                } else if (err.request) {
                    // client never received a response, or request never left
                } else {
                    // anything else
                }
            })
    }

    render() {
        return (
            <div className="login-form">
                <div className="container">
                    <br/>
                    <br/>
                    <br/>
                    <div className="d-flex justify-content-center h-100">
                        <div className="card dark-background">
                            <div className="card-header">
                                <h3>Log In</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmitHandler}>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                        </div>
                                        <input type="text" className="form-control" name="username"
                                               onChange={this.myChangeHandler} placeholder="Email"/>

                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-key"></i></span>
                                        </div>
                                        <input type="password" className="form-control" name="password"
                                               onChange={this.myChangeHandler} placeholder="password"/>
                                    </div>
                                    {(() => {
                                        if (this.state.isError) {
                                            return (
                                                <div>
                                                    <div className="d-flex justify-content-center links"
                                                         style={{color: "red"}}>
                                                        Username or Password is Incorrect.
                                                    </div>
                                                    <br/>
                                                </div>
                                            )
                                        }
                                    })()}


                                    <div className="form-group">
                                        {/*<input type="submit" value="Login" className="btn float-right login_btn"/>*/}
                                        <button type="submit" className="btn btn-warning float-right">Login</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

    toHome(path) {
        this.props.history.push(path);
    }
}

export default withRouter(Login);