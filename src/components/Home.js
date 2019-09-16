import React, { Component } from 'react'

import {
    getFromStorage,
    setInStorage,
} from "./utils/storage";

export class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            signUpError: "",
            signInError: ""
        };
    }

    componentDidMount(){
        const token = getFromStorage("the_main_app")
        if (token) {
            fetch('/api/verify?token='+ token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token,
                            isLoading: false

                        });
                    } else {
                        this.setState({
                            isloading:false
                        })
                    }
                })
        } else {
            this.setState({
                isLoading: false,

            })
        }
    }

    render() {
        const{
            isLoading,
            token,
        } = this.state;

        if (isLoading) {
            return (<div><p>Is loading..-</p></div>)
        }
        if (!token){
            return (
                <div>
                    <p>Sign in</p>
                    <p>Sign up</p>
                </div>
            )
        }
        return (
            <div>
                <p>Account</p>
            </div>
        )
    }
}

export default Home
