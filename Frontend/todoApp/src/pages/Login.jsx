import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login () {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const capitalizeUsername = (userName) => {
        return userName.split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')
    }

    const onClickLogin = async (event) => {
        event.preventDefault()

        if (email.trim() === '' || password.trim() === '') {
            window.alert('Enter Credentials')
            return
        }

        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
  
        const data = await response.json()
        console.log(data)
        
        if (!response.ok) {
            window.alert(data.message)
            return
        }

        const todoUser = capitalizeUsername(data.userName)
 
        localStorage.setItem('token', data.token) 
        localStorage.setItem('userName', todoUser)
        localStorage.setItem('userEmail', data.email)

        navigate('/todos')
    }

    return (
        <div className='login-register-bg'>
            <div className='card'>
                <h2 className='card-title'>Login</h2>
                <form className='form-container' onSubmit={onClickLogin}>
                    <div className='input-container'>
                        <label className='label-text'>Email:</label>
                        <input type='email' value={email} placeholder="Enter your email" className='user-input' onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                    <div className='input-container'>
                        <label className='label-text'>Password:</label>
                        <input type='password' value={password} placeholder="Enter your password" className='user-input' onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <button type='submit' className='form-btn'>Login</button>
                </form>
                <p className='card-text'>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login