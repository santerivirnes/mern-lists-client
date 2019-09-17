import React from 'react'
import { Button, Input } from '@material-ui/core';
export default class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signUpError: "",
            signUpFirstName:"",
            signUpLastName:"",
            signUpEmail:"",
            signUpPassword:""
    };

    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    
    this.onSignUp = this.onSignUp.bind(this);
}

onTextboxChangeSignUpEmail(event) {
    this.setState({
        signUpEmail: event.target.value,
    })
}
onTextboxChangeSignUpPassword(event) {
    this.setState({
        signUpPassword: event.target.value,
    })
}
onTextboxChangeSignUpFirstName(event) {
    this.setState({
        signUpFirstName: event.target.value,
    })
}
onTextboxChangeSignUpLastName(event) {
    this.setState({
        signUpLastName: event.target.value,
    })
}

onSignUp() {
    const {
        signUpFirstName,
        signUpLastName,
        signUpEmail,
        signUpPassword
    } = this.state;

    fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            firstName: signUpFirstName,
            lastName: signUpLastName,
            email: signUpEmail,
            password: signUpPassword
        }),
    }).then(res => res.json())
      .then(json => {
            
            if(json.success){
                this.setState({
                    signUpError: json.message,
                    isLoading: false,
                    signUpEmail: "",
                    signUpFirstName: "",
                    signUpLastName:"",
                    signUpPassword:""
                    
                })
            } else {
                this.setState({
                    signUpError: json.message,
                    isLoading: false,
                })
            }
    });
}


    

    render() {
        const{
            signUpFirstName,
            signUpLastName,
            signUpEmail,
            signUpPassword,
            signUpError
        } = this.state;
        return (
            <div className="container">
                {
                    (signUpError) ? (
                        <p>{signUpError}</p>
                    ) : (null)
                }
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign up</h5>
                    <div className="input-filed">
                        <label htmlFor="email">Email</label>
                        <Input 
                            type="email" 
                            name="signUpEmail" 
                            value={signUpEmail} 
                            id="email" 
                            onChange={this.onTextboxChangeSignUpEmail} 
                        />
                    </div>
                    <div className="input-filed">
                        <label htmlFor="password">Password</label>
                        <Input 
                            name="signUpPassword" 
                            type="password" 
                            value={signUpPassword} 
                            id="password" 
                            onChange={this.onTextboxChangeSignUpPassword} 
                        />
                    </div>
                    <div className="input-filed">
                        <label htmlFor="firstName">Etunimi</label>
                        <Input 
                            type="text" 
                            name="signUpFirstName" 
                            value={signUpFirstName} 
                            id="firstName" 
                            onChange={this.onTextboxChangeSignUpFirstName} 
                        />
                    </div>
                    <div className="input-filed">
                        <label htmlFor="lastName">Sukunimi</label>
                        <Input 
                            type="signUpLastName" 
                            name="lastName" 
                            value={signUpLastName} 
                            id="lastName" 
                            onChange={this.onTextboxChangeSignUpLastName} 
                        />
                    </div>
                    <div className="input-filed">
                        <Button type="submit" onClick={this.onSignUp}>Kirjaudu</Button>
                    </div>
                </form>
            </div>
        )
    }
}