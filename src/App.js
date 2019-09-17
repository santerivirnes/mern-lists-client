import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'


import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import TodoList from "./components/todos/TodoList";
import Header from "./Header";
import {
    getFromStorage
  } from "./components/utils/storage";


class App extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            isLoading: true
        };
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

    render() {
        const {
            token
        } = this.state;
      return(
        <Router>
            <div>
                <Header />
                <Route path="/components/SignIn" component={SignIn} />
                <Route path="/components/SignUp" component={SignUp} />
                <Route path="/components/todos/TodoList" component={TodoList} />
            </div>
            {!token ? 
            <div style={{ display: "flex", justifyContent: "center"}}>
                <p>Login first</p>
            </div> : 
            <div style={{ display: "flex", justifyContent: "center"}}>
                <TodoList />
            </div> 
        }
        </Router>
        
      )
    }
  }
  
  export default App;