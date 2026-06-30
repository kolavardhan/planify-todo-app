import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import TodoForm from '../../components/TodoForm'
import TodoList from '../../components/TodoList'
import './index.css'

function Todo() {  
  const navigate = useNavigate() 
 
  const [todoList, updateTodo] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const userName = localStorage.getItem('userName')
  const email = localStorage.getItem('userEmail')

  const onclickLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  } 

  const getTodos = async () => {
    try {
      setIsLoading(true)
 
      const token = localStorage.getItem('token')

      const response = await fetch('http://localhost:3000/todos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
 
      if (response.status === 401) {
        localStorage.removeItem('token')
        navigate('/')
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }

      const data = await response.json()
      updateTodo(data)
 
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  } 

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/')
      return
    }

    getTodos()
  }, [navigate])

  const addTodo = async (newTask) => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          task: newTask
        })
      })

      if (response.status === 401) {
        localStorage.removeItem('token')
        navigate('/')
        return
      }

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

      const token = localStorage.getItem('token')

      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          checked: !todo.checked 
        })
      })

      if (response.status === 401) {
        localStorage.removeItem('token')
        navigate('/')
        return
      }

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
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this task?'
    )

    if (!isConfirmed) {
      return
    }

    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 401) {
        localStorage.removeItem('token')
        navigate('/')
        return
      }

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
      <nav className='todo-nav'>
        <div className='title-userDetails-container'>
          <h1 className='nav-title'>Planify</h1>
          <div className='logo-name-email-container'>
            <div className='logo-box'>
              <p className='logo-alpha'>{userName.charAt(0)}</p>
            </div>
            <div className='userName-email-container'>
              <h3 className='logo-userName'>{userName}</h3>
              <p className='logo-email'>{email}</p>
            </div>
          </div>
        </div>
        <button type='button' className='logout-btn' onClick={onclickLogout}>Logout</button>
      </nav> 
      

      <TodoForm addTodo={addTodo} />

      {isLoading ? (
        <div className='loader-container'>
          <Oval
            height={60}
            width={60}
            color="hsl(180, 90%, 48%)"
            secondaryColor="hsl(180, 90%, 48%)"
            strokeWidth={4}
            strokeWidthSecondary={4}
          />
        </div>
      ) : (
        <TodoList
          todoList={todoList}
          updateIsChecked={updateIsChecked}
          deleteTodo={deleteTodo}
        />
      )}
    </div>
  )
}

export default Todo