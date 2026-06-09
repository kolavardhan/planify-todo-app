import { MdDelete } from "react-icons/md"
import './index.css'

const TodoItem = ({ todo, updateIsChecked, deleteTodo }) => {
    return (
        <li className="todo-item">
            <div className='form-check'>
                <input
                    className='form-check-input'
                    type='checkbox'
                    id={todo._id}
                    checked={todo.checked}
                    onChange={() => updateIsChecked(todo._id)}
                />

                <label
                    className={todo.checked ? `checked form-check-label`: `form-check-label`}
                    htmlFor={todo._id}
                >
                    {todo.task}
                </label>
            </div>
            <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>
                <MdDelete />
            </button>
        </li>
    ) 
}

export default TodoItem