import React from 'react'
import { Button, Input } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

import {
    setInStorage
  } from "./utils/storage";

export default class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signInError: "",
            signInEmail: "",
            signInPassword:"",
            redirect: false
        };

        this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
        this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

        this.onSignIn = this.onSignIn.bind(this);
}
    onTextboxChangeSignInEmail(event) {
        this.setState({
            signInEmail: event.target.value,
        })
    }
    onTextboxChangeSignInPassword(event) {
        this.setState({
            signInPassword: event.target.value,
        })
    }
    


    onSignIn(){
        const {
            signInEmail,
            signInPassword
        } = this.state;

        fetch("http://localhost:3001/api/signin", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            }),
        }).then(res => res.json())
          .then(json => {
                
                if(json.success){
                    setInStorage('the_main_app', { token: json.token })
                    this.setState({
                        signInError: json.message,
                        isLoading: false,
                        signInEmail: "",
                        signInPassword: "",
                        token: json.token,
                    })
                } else {
                    this.setState({
                        signInError: json.message,
                        isLoading: false,
                    })
                }
        });
        this.setRedirect();
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
      }

    render() {
        const {
            signInError,
            signInEmail,
            signInPassword
        } = this.state;
        return (
            <div className="container">
                {
                    (signInError) ? (
                        <p>{signInError}</p>
                    ) : (null)
                }
                <form onSubmit={this.onSignIn} >
                    <h5>Sign in</h5>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input 
                            type="email" 
                            name="signInEmail" 
                            value={signInEmail} 
                            id="email" 
                            onChange={this.onTextboxChangeSignInEmail} 
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Input 
                            name="signInPassword" 
                            type="password" 
                            value={signInPassword} 
                            id="password" 
                            onChange={this.onTextboxChangeSignInPassword} 
                        />
                    </div>
                    <div>
                        {this.renderRedirect()}
                        <Button type="submit" onClick={this.onSignIn}>Kirjaudu</Button>
                    </div>
                </form>
            </div>
        )
    }
}