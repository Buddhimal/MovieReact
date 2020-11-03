import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import axios from "axios";
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import jwt from "jsonwebtoken";
import Config from "../config";

class MovieList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        allMovies: [],
        isError: false,
        errorMsg: 'Internal Server Error!',
        deleted: false,
        token: JSON.parse(localStorage.getItem("authToken"))
    };

    async componentDidMount() {

        await axios.get('http://localhost:3000/api/movies', {
            headers: {
                "x-jwt-token": this.state.token,
            },
        }).then(response => {
            this.setState({isError: false})
            let data = response.data.data


            let movies = data.map((movie) => {
                return {
                    id: movie.id,
                    name: movie.name,
                    category: movie.movie_category_id,
                    description: movie.description,
                    image_link: movie.image_link,
                    rating: movie.rating,
                    isActive: movie.isActive,
                };
            });

            this.setState({allMovies: movies});
        })
            .catch(err => {
                if (err.response) {
                    let error = err.response
                    this.setState({isError: true, errorMsg: error.data.msg})
                    console.log(err.response)
                } else if (err.request) {
                    // client never received a response, or request never left
                } else {
                    // anything else
                }
            })

    }

    confirmDelete = (MovieId, row) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteMovie(MovieId, row)
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    handleDeleteRow(i) {
        let rows = [...this.state.allMovies]
        rows.splice(i, 1)
        this.setState({
            allMovies: rows
        })
    }

    async deleteMovie(MovieId, row) {

        await axios.delete(
            Config.BASE_URL + `/movies/${MovieId}`, {
                headers: {
                    "x-jwt-token": this.state.token,
                },
            }).then(response => {
            this.setState({deleted:true})
            this.handleDeleteRow(row)

        })
            .catch(err => {
                if (err.response) {
                    let error = err.response
                    this.setState({isError: true, errorMsg: error.data.msg})
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
            <div className="container-fluid">
                <br/>

                {(() => {
                    if (this.state.isError) {
                        return (
                            <div className="alert alert-danger" role="alert">
                                Error occurred.. {this.state.errorMsg}
                            </div>
                        )
                    }
                })()}


                <div className="row">
                    <div className="col-lg-12">

                        <button className="btn btn-lg btn-info float-right"
                                onClick={() => this.props.history.push('/movie/new')}>
                            <i className="fa fa-plus-circle"></i>
                            Add New
                        </button>
                        <br/>
                        <br/>
                        <br/>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="header-title mb-3">Movie List</h4>

                                {(() => {
                                    if (this.props.location.state != undefined) {
                                        return (
                                            <div className="alert alert-success" role="alert">
                                                Successful.. New Movie Added Successfully.
                                            </div>
                                        )
                                    }
                                })()}
                                {(() => {
                                    if (this.state.deleted) {
                                        return (
                                            <div className="alert alert-success" role="alert">
                                                Successful.. Movie Deleted Successfully.
                                            </div>
                                        )
                                    }
                                })()}
                                <div className="table-responsive project-list">
                                    <table className="table project-table table-centered table-nowrap">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Rating</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.allMovies.map((mov,i) => (

                                            <tr key={i}>
                                                <th scope="row">{i+1}</th>
                                                <td>{mov.name}</td>
                                                <td>{mov.category}</td>
                                                <td>{mov.description}</td>
                                                <td>{mov.rating} / 10</td>


                                                <td>
                                                    <div className="action">
                                                        <a href=""
                                                           onClick={() => this.props.history.push(`/movie/edit/${mov.id}`)}
                                                           className="text-success mr-4" data-toggle="tooltip"
                                                           data-placement="top" title="" data-original-title="Edit">
                                                            <i className="fa fa-pencil h5 m-0" title="Edit"></i>
                                                        </a>
                                                        <a onClick={() => this.confirmDelete(mov.id, i)}
                                                           className="text-danger" data-toggle="tooltip"
                                                           data-placement="top" title="" data-original-title="Close">
                                                            <i className="fa fa-remove h5 m-0" title="Inactive"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(MovieList);