import React, { useState } from 'react';
import Navbar from '../nav/Nav';
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
      if (response.status === 201) {
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

  // RENDERED COMPONENTS

  const renderImageUploadForm = () => {
    return (
      <>
        <div className="profile-photo-container">
          <p className="profile-words">Upload a profile image: </p>
        
          <form onSubmit={handleImageUpload} encType="multipart/form-data">
            <div>
              <input className="button" type="file" name="image" onChange={handleImageChange}/>
            </div>
            <input className="upload-button" type="submit" name="upload" value="Upload Image"/>
          </form>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar/>
      <div className="main-container">

        <div className="container_1">
          <div className="signup-box">
            <h2>SIGN UP </h2>

            <div className="header">
              <div Style="height: 20px;"></div>
            </div>

            {/* LOGO */}

            <div className="user-icon">
              <div>&spades;</div>
            </div>
          
            {/* SIGN UP FORM BOX */}

            <form className="signup" onSubmit={handleSubmit}>
              <div className="form-group">
                <input className="form-control" placeholder="Username" id="username" type="text" value={username} onChange={handleUsernameChange} />
              </div>

              <div className="form-group">
                <input className="form-control" placeholder="Email" id="email" type='text' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={ email } onChange={handleEmailChange} />
              </div>

              <div className="form-group">
                <input className="form-control" placeholder="Password" id="password" type='password' pattern="[a-zA-Z0-9.-_!?]{8,20}" value={ password } onChange={handlePasswordChange} />
                <p>Minimum 8 characters</p>
              </div>

              <div className="form-group">
                <input id='submit' type="submit" value="Submit" />
              </div>

              <div className="form-group">
                <p className="already-registered">Already registered? <a href ="login">Login</a></p>
              </div>
            </form>

            {renderImageUploadForm()}
            
          </div>
          <div className="separator"></div>
        </div>

      </div>
    </>
  );
}

export default SignUpForm;