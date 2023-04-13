import React, { useState } from 'react';
import Navbar from '../nav/nav';
import './LoginForm.css'

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    if(response.status !== 201) {
      console.log("yay")
      navigate('/login')
    } else {
      console.log("oop")
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      window.localStorage.setItem("username", data.username)
      window.localStorage.setItem("profilePicture", data.profilePicture)
      navigate('/posts');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }



return (

  <> <Navbar/>

  <body>
    <div class="container">
      <div class="login-box">
        <div class="header">
        <h1>Login</h1>
        </div>
        <div class="user-icon">
        <i class="fa-solid fa-earth-americas"></i>
        </div>
        <form class="login" onSubmit={handleSubmit}>
          <div class="form-group">
            <input class="form-control" placeholder='Email' id="email" type='text' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={ email } onChange={handleEmailChange} />
          </div>
          <div class="form-group">
            <input class="form-control" placeholder='Password' id="password" type='password'  value={ password } onChange={handlePasswordChange} />
          </div>
          <div class="form-group">
            <label for="rememberme">
              <input type="checkbox" name="rememberme" id="rememberme"/>
              Remember Me
            </label>
          </div>
          <div class="form-group">
            <input role='submit-button' id='submit' type="submit" value="Submit" />
          </div> 
          <div class="form-group">
            <p>Not registered? <a href ="sign-up">Sign Up</a></p>
          </div>
         </form>
        
      </div>
    </div>
  </body>
  </>
  
  
);
}

export default LogInForm;
