import React from 'react';
import shortid from 'shortid';
import { Button, Input } from '@material-ui/core';
export default class TodoForm extends React.Component{

  
  constructor(props){
    super(props);
    this.state = {
        text: ""
    };

  
}

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
handleSubmit = event => {
  event.preventDefault()
  this.props.onSubmit({
    id: shortid.generate(),
    text: this.state.text,
    complete: false,
    showMe: false
  });
  this.setState({
    text: ""
  });
}
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <Input 
      name="text"
      value={this.state.text} 
      onChange={this.handleChange} 
      placeholder="todo.."
      />
      <Button onClick={this.handleSubmit}>Lisää</Button>
      </form>
      
    );
  }
}