import React, { useState } from 'react';
import Navbar from '../nav/nav';
import './SignUpForm.css';

const SignUpForm = ({ navigate }) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [file, setFile] = useState('f6782410420a17e3de48d22412adfd0c.jpg'); 

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        username: username, 
        email: email, 
        password: password,
        profilePicture: file
       })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

  const handleUsernameChange = (event ) => {
    setUsername(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleImageChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('profilePicture', file)
    

    try {
      const response = await fetch('users/upload-image', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data.filename + '.jpg');
      setFile(data.filename)

    } catch (error) {
      console.log(error);
    }
  }

  const renderImageUploadForm = () => {
    return (
      <>
        <h3>Upload a profile image:</h3>
        <form onSubmit={handleImageUpload} encType="multipart/form-data">
          <input type="file" name="image" onChange={handleImageChange}/>
          <input type="submit" name="upload"/>
        </form>
      </>
    )
  }

    return (
      <>
      <Navbar/>

      <body>
      
        <div class="container">
        
          <div class="signup-box">
          <h2>SIGN UP </h2>
            <div class="header">
              <h1>Welcome, Earthling!</h1>
            </div>
            <div class="user-icon">
              <i class="fa-solid fa-earth-americas"></i>
            </div>
              <form class="signup" onSubmit={handleSubmit}>
                <div class="form-group">
                  <input placeholder="username" id="username" type="text" value={username} onChange={handleUsernameChange} class="form-control"></input>
                </div>
                <div class="form-group">
                  <input placeholder="email" id="email" type='text' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={ email } onChange={handleEmailChange}class="form-control"/>
                </div>
                <div class="form-group">
                  <input placeholder="password" id="password" type='password' pattern="[a-zA-Z0-9.-_!?]{8,20}" value={ password } onChange={handlePasswordChange} class="form-control"/>
                  <p>minimum 8 characters</p>
                </div>
            
                <div class="form-group">
                  <input id='submit' type="submit" value="Submit" />
                </div>
                <div class="form-group">
                  <p class="already-registered">Already registered? <a href ="login">Login</a></p>
                </div>
              </form>
            </div>
            <div class="separator">
            </div>
        </div>
      </body>
      {renderImageUploadForm()}
      </>
    );
}

export default SignUpForm;