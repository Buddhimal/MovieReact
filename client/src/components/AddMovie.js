import React, {Component} from "react";
import axios from "axios";
import Config from "../config";

// import '../../assets/css/login.css';

class AddMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

            this.addMovie(this.state)

    }

    addMovie(movie) {

        axios.post(Config.BASE_URL + '/movies', {
            movie_category_id: movie.type,
            name: movie.name,
            image_link: movie.image,
            rating: movie.rating,
            description: movie.des
        }, {
            headers: {
                "x-jwt-token": this.state.token,
            }
        }).then(response => {
            this.props.history.push('/home',
                {isNew: true});

        })
            .catch(err => {
                if (err.response) {
                    this.setState({isError: true})
                    console.log(err.response)
                } else if (err.request) {
                    // client never received a response, or request never left
                } else {
                    // anything else
                }
            })
    }

    render() {
        return (
            <div className="container">
                <br/>
                <br/>
                <div className="d-flex justify-content-center ">
                    <div className="card dark-background" style={{width: "500px"}}>
                        <div className="card-header">
                            <h3>Add New Movie <i className="fa fa-image"></i></h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmitHandler}>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-text-height"></i></span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.myChangeHandler}
                                           name="name" placeholder="Name" required/>

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-text-height"></i></span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.myChangeHandler}
                                           name="type" placeholder="Type" required/>

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-text-height"></i></span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.myChangeHandler}
                                           name="des" placeholder="Description" required/>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-image"></i></span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.myChangeHandler}
                                           name="image" placeholder="image link" required/>
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-gratipay"></i></span>
                                    </div>
                                    <input type="number" min="0" max={"10"} className="form-control" onChange={this.myChangeHandler}
                                           name="rating" placeholder="Rating" required/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-warning float-right">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    toPage(path) {
        // alert("came")
        this.props.history.push(path);
    }
}

export default AddMovie;