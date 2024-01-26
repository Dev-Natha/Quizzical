import "../App.css"
import React from "react";
const Todo = () => {
    const [todo, SetTodo] = React.useState(JSON.parse(localStorage.getItem("todoList")) || [])
    const [inp, SetInp] = React.useState("")
    React.useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todo))
    }, [todo])
    function getTodo(event){
        SetInp(event.target.value)
    }
    function addTodo(){
        SetTodo((prevTodo) => [...prevTodo, inp])
        console.log(todo)
    }
    function editTodo(td, index){
        const editTodo = prompt("Enter your new todo")
        SetTodo((prevTodo) => prevTodo.map((item, id) => {
           return id == index ? editTodo : item
        }))
    }
    function deleteTodo(td, index){
        SetTodo((prevTodo) => prevTodo.filter((item, id) =>{
            return id != index
        }))
    }
    const todoItems = todo.map((td, index) => {
        return <div key={index}>
            <p>{td}</p>
            <button onClick={() => editTodo(td, index)}>Edit</button>
            <button onClick={() => deleteTodo(td, index)}>Delete</button>
        </div>
    })
    return ( 
        <>
        <div className="home-cont">
            <div className="top-cont"></div>
            <div className="btm-cont"></div>
            <div className="home-items">
                <input type="text"  placeholder="Enter your todo" onChange={getTodo}/>
                <button onClick={addTodo}>Add to your to dos</button>
                <div>
                    {todoItems}
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Todo;
