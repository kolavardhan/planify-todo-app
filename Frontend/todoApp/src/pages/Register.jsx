import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react' 

function Register () {
    const navigate = useNavigate()

    const [username, setUserName] = useState('') 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onClickRegister = async (event) => {
        event.preventDefault()

        try {
            if (username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
                window.alert('All fields are required')
                return
            }

            if (password !== confirmPassword) { 
                window.alert('Passwords do not match')
                return
            }

            setIsLoading(true)

            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username, 
                    email,
                    password
                })
            })

            const data = await response.json()

            if (!response.ok) {
                window.alert(data.message)
                return 
            } 

            window.alert('Registration successful') 

            navigate('/') 
        } catch (error) {
            window.alert('Something went wrong. Please try again.')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='login-register-bg'>
            <div className='card'>
                <h2 className='card-title'>Register</h2>
                <form className='form-container' onSubmit={onClickRegister}>
                    <div className='input-container'>
                        <label className='label-text'>Username:</label>
                        <input type='text' value={username} placeholder="Choose a username" className='user-input' onChange={(event) => setUserName(event.target.value)}/>
                    </div>
                    <div className='input-container'>
                        <label className='label-text'>Email:</label>
                        <input type='email' value={email} placeholder="Enter your email address" className='user-input' onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                    <div className='input-container'>
                        <label className='label-text'>Password:</label>
                        <input type='password' value={password} placeholder="Create a password" className='user-input'  onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <div className='input-container'>
                        <label className='label-text'>Confirm Password:</label>
                        <input type='password' value={confirmPassword} placeholder="Re-enter your password" className='user-input' onChange={(event) => setConfirmPassword(event.target.value)}/>
                    </div>
                    <button type='submit' className='form-btn' disabled={isLoading}>{isLoading? 'Registering...' : 'Register'}</button>
                </form>
                <p className='card-text'>Already have an account? <Link to="/">Login</Link></p>
            </div>
        </div>
    )
}

export default Register 