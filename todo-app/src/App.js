import React from "react";
import "./App.css";
import { Form, Button, Card} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function Todo({ todo, index, markTodo, removeTodo }){
  return(
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? "line-through": ""}}>{todo.text}</span>
      {/* todo.isDone ? = false ( điều kiện đúng) => không gạch ngang, true(điều kiện sai) => gạch ngang */}
      <div>
        <Button variant="outline-succees" onClick={() => markTodo(index)}>✓</Button>
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }){
  const[value, setValue] = React.useState(""); // chứa trạng thái việc cần làm (đã hoàn thành
  //hoặc chưa) bằng cách dùng React.useState(React Hooks)

  const handleSubmit = e => {
    e.preventDefault(); // e một object chứa tất cả event
    //preventDefault() dùng để xử lý các sự kiện từ button, form, input
    if(!value) return;
    addTodo(value);
    setValue("");
  };

  return(
    <Form onSubmit={handleSubmit}> 
      <Form.Group>
        <Form.Label><b>Add Todo</b></Form.Label>
        <Form.Control type="text" className="input" value={value} onChange={e => 
        setValue(e.target.value)} placeholder="Add new Todo"/>  
        {/* target.value truy xuất giá trị(value) được nhập ở input */}
      </Form.Group>
      <Button variant="primary mb-3" type="submit">
          Submit
      </Button>
    </Form>
  );
}

function App(){
  const[todos, setTodos] = React.useState([
    {
      text: "This is a simple todo app",
      isDone: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }]; // cú pháp SPREAD (lây lan, mở rộng)
    setTodos(newTodos);
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return(
      <div className="app">
        <div className="container">
          <h1 className="text-center mb-4">Todo List</h1>
          <FormTodo addTodo={addTodo} />
          
          <div>
            {todos.map((todo, index) =>(  
              // sử dụng map để hiện thị các việc cần làm ở function Todo
              <Card>
                <Card.Body>
                  <Todo
                  key = {index}
                  index =  {index}
                  todo = {todo}
                  markTodo = {markTodo}
                  removeTodo = {removeTodo}
                  />
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
  );
}
export default App;
