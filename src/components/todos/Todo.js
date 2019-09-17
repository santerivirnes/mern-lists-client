import React from "react";
import { Button } from '@material-ui/core';

export default props => (
<div style={{ display: "flex", justifyContent: "center"}}>
    <div style={{
        textDecoration: props.todo.complete ? "line-through" : ""
    }} onClick={props.toggleComplete}>{props.todo.text}
    </div>
    <Button onClick={props.onModify}>Muokkaa</Button>
    <Button onClick={props.onDelete}>x</Button>
</div>

);