import React from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { Component } from "react";

export default class Navigation extends Component{
    render(){
        return(
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/patient">Patient</Link></li>
                    <li><Link to="/doctor">Doctor</Link></li>
                </ul>
            </nav>
        )
    }
}
