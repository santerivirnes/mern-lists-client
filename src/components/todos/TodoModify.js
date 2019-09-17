import React from "react";
import { Button, Input } from '@material-ui/core';

export default class TodoModify extends React.Component{

  
  state = {
    text: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  handleSubmit = event => {
    event.preventDefault()
    this.props.onSubmit({
      text: this.state.text,
      id: this.props.todo.id
    });
    this.setState({
      text: ""
    });
  }

  render() {
    return (
      <div style={{display: "flex", justifyContent: "center"}}>
      <form onSubmit={this.handleSubmit}>
      <Input  
      value={this.state.text}
      onChange={this.handleChange}
      name="text"
      placeholder={this.state.text}
      />
      <Button onClick={this.handleSubmit}>Valmis</Button>
      </form>
  </div>
    );
  }
}
