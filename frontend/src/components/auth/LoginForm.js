import React, { useState } from 'react';
import Navbar from '../nav/Nav';
import './LoginForm.css';

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

  <> 
    <Navbar/>

    <div className="main-container">
      <div className="container_1">
        <div className="login-box"> 

          <div className="header">
            <h2>LOGIN</h2>
          </div>

          <div className="header">
            <div Style="height: 20px;"></div>
          </div>

          <div className="user-icon"> 
            <i className="fa-solid fa-earth-americas"></i>
          </div>

          {/* LOGIN FORM  */}

          <form className="login" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type='text' placeholder='Email' id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={ email } onChange={handleEmailChange} className="form-control"></input>
            </div>

            <div className="form-group">
              <input className="form-control" placeholder='Password' id="password" type='password'  value={ password } onChange={handlePasswordChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="rememberme"> <input type="checkbox" name="rememberme" id="rememberme"/>Remember Me</label>
            </div>

            <div className="form-group">
              <input id='submit' type="submit" value="Submit"/>
            </div> 

            <div className="form-group">
              <p>Not registered? <a href ="signup">Sign Up</a></p>
            </div>
          </form>

        </div>
      </div>
    </div>
  </>
  
  
);
}

export default LogInForm;
