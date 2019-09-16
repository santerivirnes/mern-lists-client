import React, { Component } from 'react';


import {
  getFromStorage,
  setInStorage,
} from "./components/utils/storage";

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
        isLoading: true,
        signUpError: "",
        signInError: "",
        signInEmail: "",
        signInPassword:"",
        signUpFirstName:"",
        signUpLastName:"",
        signUpEmail:"",
        signUpPassword:""

    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    
    this.onSignUp = this.onSignUp.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.logout = this.logout.bind(this);
}

componentDidMount(){

  const obj = getFromStorage("the_main_app")
  
  if (obj && obj.token) {
    const { token } = obj;
      fetch('http://localhost:3001/api/verify?token='+ token)
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
    }
    logout() {
        this.setState({
            isLoading: true,
        })
        const obj = getFromStorage("the_main_app")
  
        if (obj && obj.token) {
          const { token } = obj;
            fetch('http://localhost:3001/api/logout?token='+ token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        localStorage.removeItem("the_main_app")
                        this.setState({
                            token: "",
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
        signInError,
        signInEmail,
        signInPassword,
        signUpFirstName,
        signUpLastName,
        signUpEmail,
        signUpPassword,
        signUpError
    } = this.state;
    
    if (isLoading) {
      return (<div><p>Is loading..</p></div>)
    }
    if (!token){
        return (
            <div className="container">
                {
                    (signInError) ? (
                        <p>{signInError}</p>
                    ) : (null)
                }
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign in</h5>
                    <div className="input-filed">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="signInEmail" 
                            value={signInEmail} 
                            id="email" 
                            onChange={this.onTextboxChangeSignInEmail} 
                        />
                    </div>
                    <div className="input-filed">
                        <label htmlFor="password">Password</label>
                        <input 
                            name="signInPassword" 
                            type="password" 
                            value={signInPassword} 
                            id="password" 
                            onChange={this.onTextboxChangeSignInPassword} 
                        />
                    </div>
                    <div className="input-filed">
                        <button type="submit" onClick={this.onSignIn} className="btn punk lighten-1 z-depth-0">Kirjaudu</button>
                    </div>
                </form>
                <br></br>
                {
                    (signUpError) ? (
                        <p>{signUpError}</p>
                    ) : (null)
                }
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign up</h5>
                    <div className="input-filed">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="signUpEmail" 
                            value={signUpEmail} 
                            id="email" 
                            onChange={this.onTextboxChangeSignUpEmail} 
                        />
                    </div>
                    <div className="input-filed">
                        <label htmlFor="password">Password</label>
                        <input 
                            name="signUpPassword" 
                            type="password" 
                            value={signUpPassword} 
                            id="password" 
                            onChange={this.onTextboxChangeSignUpPassword} 
                        />
                    </div>
                    <div className="input-filed">
                        <label htmlFor="firstName">Etunimi</label>
                        <input 
                            type="text" 
                            name="signUpFirstName" 
                            value={signUpFirstName} 
                            id="firstName" 
                            onChange={this.onTextboxChangeSignUpFirstName} 
                        />
                    </div>
                    <div className="input-filed">
                        <label htmlFor="lastName">Sukunimi</label>
                        <input 
                            type="signUpLastName" 
                            name="lastName" 
                            value={signUpLastName} 
                            id="lastName" 
                            onChange={this.onTextboxChangeSignUpLastName} 
                        />
                    </div>
                    <div className="input-filed">
                        <button type="submit" onClick={this.onSignUp} className="btn punk lighten-1 z-depth-0">Kirjaudu</button>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <div>
            <p>Account</p>
            <button onClick={this.logout}>kirjaudu ulos</button>
        </div>
    )
      
    }
  }
  
  export default App;