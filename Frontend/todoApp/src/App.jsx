import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './App.css'

function App() {

  const [todoList, updateTodo] = useState([])

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/todos')

      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }

      const data = await response.json()

      updateTodo(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  const addTodo = async (newTask) => {
    try {
      const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          task: newTask
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create todo')
      }

      const newTodo = await response.json()

      updateTodo(prevState => [...prevState, newTodo])

    } catch (error) {
      console.log(error)
    }
  }

  const updateIsChecked = async (id) => {
    try {
      const todo = todoList.find(eachTodo => eachTodo._id === id)

      if (!todo) {
        return
      }

      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          checked: !todo.checked
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update todo')
      }

      const updatedTodo = await response.json()

      updateTodo(prevState =>
        prevState.map(eachTodo =>
          eachTodo._id === id ? updatedTodo : eachTodo
        )
      )

    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete todo')
      }

      updateTodo(prevState =>
        prevState.filter(eachTodo => eachTodo._id !== id)
      )

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='app-container'>
      <h1>Planify</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todoList={todoList}
        updateIsChecked={updateIsChecked}
        deleteTodo={deleteTodo}
      />
    </div>
  )
}

export default App