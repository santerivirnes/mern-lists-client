import React from 'react';
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import TodoModify from "./TodoModify";
export default class TodoList extends React.Component {
state = {
  todos: []
}

addTodo = todo => {
  
  this.setState({
    todos: [todo, ...this.state.todos]
  })
}



toggleComplete = id => {
  this.setState({
    todos: this.state.todos.map(todo => {
      if(todo.id === id){
        return {
          ...todo,
          complete: !todo.complete
        }
      } else {
        return todo;
      }
    })
  })
}
toggleModify = id => {
  this.setState({
    todos: this.state.todos.map(todo => {
      if(todo.id === id){
        return {
          ...todo,
          showMe: !todo.showMe
        }
      } else {
        return todo;
      }
    })
  })
}
handleModify = props => {
  this.setState({
    todos: this.state.todos.map(todo => {
      if(todo.id === props.id){
        return{
          ...todo,
          showMe: !todo.showMe,
          text: props.text
        }
      } else {
        return todo;
      }
    })
  })
}
handleDeleteTodo = id => {
  this.setState({
    todos: this.state.todos.filter(todo => todo.id !== id)
  });
};

  render() {
    return (
      <div>
        <TodoForm onSubmit={this.addTodo} />
        
        {this.state.todos.map(
          
          todo => (
          todo.showMe ? (
            <TodoModify onSubmit={this.handleModify}
            key={todo.id}
            toggleComplete={() => this.toggleComplete(todo.id)} 
            onDelete={() => this.handleDeleteTodo(todo.id)}
            todo={todo}
           />
          ) : (
            <Todo 
            key={todo.id}
            toggleComplete={() => this.toggleComplete(todo.id)} 
            onDelete={() => this.handleDeleteTodo(todo.id)}
            todo={todo}
            onModify={() => this.toggleModify(todo.id)}
           />
            
          ) 
      ))}
      </div>
    )
  }
}