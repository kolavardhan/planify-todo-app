import TodoItem from '../TodoItem'
import './index.css'

const TodoList = ({ todoList, updateIsChecked, deleteTodo }) => {
    return (
        <ul className='todoList-container'>
            {todoList.map((eachTodo) => <TodoItem key={eachTodo._id} todo={eachTodo} updateIsChecked={updateIsChecked} deleteTodo={deleteTodo}/>)}
        </ul>
    )
    
}

export default TodoList 