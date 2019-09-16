import React from 'react'
import shortid from 'shortid';
import axios from 'axios';

export default class LogIn extends React.Component {
    state = {
        email:"",
        password:"",
        firstName:"",
        lastName:""
    };

    


    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      };


    handleSubmit = event => {
        event.preventDefault()
        axios.post('http://localhost:3001/api/putUser', {
            id: shortid.generate(),
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        })
        this.setState({
            id:"",
            email:"",
            password:"",
            firstName:"",
            lastName:""
        })
    }

    // putUserToDB = (state) => {
    //     axios.post('http://localhost:3001/api/putUser', {
    //       id: shortid.generate(),
    //       email: state.email,
    //       firstName: state.firstName,
    //       lastName: state.lastName,
    //       password: state.password
    //     });
    //   };

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign in</h5>
                    <div className="input-filed">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={this.state.email} id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-filed">
                        <label htmlFor="password">Password</label>
                        <input name="password" type="password" value={this.state.password} id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-filed">
                        <button type="submit" onClick={this.handleSubmit} className="btn punk lighten-1 z-depth-0">Kirjaudu</button>
                    </div>
                </form>
            </div>
        )
    }
}