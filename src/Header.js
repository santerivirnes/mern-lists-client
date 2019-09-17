import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import {
    getFromStorage
  } from "./components/utils/storage";

export default class Header extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            isLoading: true
        };
    
        
        
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
        const {
            token
        } = this.state;
        if (!token){
        return (
            
            <div>
                <ul>
                    
                    <li><Link to="/components/SignIn">SignIn</Link></li>
                    <li><Link to="/components/SignUp">SignUp</Link></li>
                </ul>
            </div>
        )
        } else {
        return (
            <div>
                <Button onClick={this.logout}>kirjaudu ulos</Button>
            </div>
        )
        }
    }
}

