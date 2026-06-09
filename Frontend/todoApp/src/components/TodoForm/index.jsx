import { useState } from 'react'
import './index.css'

const TodoForm = ({ addTodo }) => {

    const [userTask, setUserTask] = useState('')
 
    const onChangeUserTask = event => {
        setUserTask(event.target.value)
    }

    const updateTodoList = event => {

        event.preventDefault()

        if (userTask.trim() === '') {
            alert('Please enter a task')
            return
        }

        addTodo(userTask)

        setUserTask('')
    }

    return (
        <form className='user-form' onSubmit={updateTodoList}>
            <div className='input-container'>
                <label htmlFor='userTask' className='label-text'>Add Task:</label>
                <input
                    id='userTask'
                    type='text'
                    className='user-input'
                    value={userTask}
                    placeholder='Enter your task...'
                    onChange={onChangeUserTask}
                />
            </div>
            <button type='submit' className='add-btn'>
                Add
            </button>
        </form>
    )
}

export default TodoForm