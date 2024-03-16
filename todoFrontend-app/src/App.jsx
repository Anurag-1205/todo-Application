import React, { useEffect, useState } from 'react'
import { Card, TextField, Button, Typography } from '@mui/material';


//CUSTOM HOOK CREATE
function useTodos() {
  const [todos, setTodos] = useState([]);
  // fetch all todos from server
  useEffect(() => {
    fetch("http://localhost:3000/todos", {
      method: "GET"
    }).then((res) => {
      res.json().then((data) => {
        setTodos(data);
      })
    })
    setInterval(() => {
      fetch("http://localhost:3000/todos", {
        method: "GET"
      }).then((res) => {
        res.json().then((data) => {
          setTodos(data);
        })
      })
    }, 1000);
  }, []);
  return todos;
}

function App() {
  const todos = useTodos();

  return (
    <>
      <div style={{
        backgroundColor: "#eeeeee",
        width: "100vw",
        height: "100vh"
      }}>
        <div style={{
          display: "flex",
        }}>
          <div style={{
            padding: "150px"
          }}>
            <TextField id="title" label="Title" variant="standard" />
            <br />
            <TextField
              id="description"
              label="Description"
              multiline
              rows={4}
              variant="standard"
            />
            <br /> <br />
            <Button variant="contained" onClick={() => {
              fetch("http://localhost:3000/todos", {
                method: "POST",
                body: JSON.stringify({
                  title: document.getElementById("title").value,
                  description: document.getElementById("description").value
                }),
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(() => {
                document.getElementById("title").value = '';
                document.getElementById("description").value = '';
              })
            }}>
              Add Todo
            </Button>
          </div>
          <div style={{
            padding: "150px"
          }}>
            <Card style={{
              padding: "20px"
            }}>
              <Typography variant={"h6"}>
                Todo
              </Typography>
              {
                todos.map((todo) => (
                  <React.Fragment key={todo.id}>
                    <Todo title={todo.title} description={todo.description} id={todo.id}></Todo>
                  </React.Fragment>
                ))
              }
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

function Todo(props) {
  // Add a delete button here so user can delete a TODO.
  return <div style={{
    padding: "10px"
  }}>
    {props.title}
    <span> - </span>
    {props.description}
    <span>  </span>
    <Button variant="outlined" onClick={() => {
      fetch("http://localhost:3000/todos/" + props.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
    }}>
      REMOVE
    </Button>
  </div>
}

export default App

