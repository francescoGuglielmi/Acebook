
import React, { useState } from 'react';
import './Post.css';

const Post = ({post}) => {

  const [likeCount, setLikeCount] = useState(post.likes.length)
  const [token] = useState(window.localStorage.getItem("token"));
  const [profilePicture] = useState(window.localStorage.getItem("profilePicture"));
  const date = new Date()
  const dateFormatted = `${date.getHours()}:${date.getMinutes()} on ${date.getDate()}/${date.getMonth() + 1}`
  const [createdAt] = useState(dateFormatted)

  // Likes

  const handleLike = async (event) => {
    event.preventDefault();
    try {
    const response = await fetch(`/posts/${post._id}/like`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }, 
      body: JSON.stringify({token}),
    });

    console.log(response)
    const updatedPost = await response.json();
    if (response.ok) {
      setLikeCount(updatedPost.likes.length);
    } else {
      console.log(`Failed to find post with ID ${post._id}`)
    }
  } catch (error) {
    console.log(error)
  }}


  //Comments

  const [content, setContent] = useState("");

  // we need a function to handle the submitting of a comment

  const handleCommentSubmit = (event) => {    // BUG: empty comments still get displayed
    event.preventDefault();
    fetch(`/posts/${post._id}/comment`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({content})
    })
      .then((response) => response.json())
      .then((data) => {
        //sets the comments to all comments + the last one added 
          setContent([...post.comments, data.comments])
          setContent("")
        // this refreshes the whole window which is not ideal.
        window.location.reload();
        
      })
      .catch((error) => console.error(error));
  };

  // we need a function to clear the input field for comments

  function handleCommentChange(event) {
    setContent(event.target.value);
  }

  // we need a function to represent the comment form 

  function renderCommentForm() {
    return (

      
      <div className="container">
        <div className="form-group">
          <form onSubmit={handleCommentSubmit}>
            <input className="comment-input" type="text" value={content} onChange={handleCommentChange} />
            <button className="submit-button" type="submit">Add Comment</button>
          </form>
        </div> 
      </div>
    )
  }

  // and a function to render the comments on the screen from the database

  const renderComments = () => {  // the styling of the div below might be better applied inside Post.css
    return (
      <>
        {post.comments.map( comment => (   
          <>        
            <div style={{border: 'solid', width: 300, margin: 10, padding: 10, borderWidth: 1}}> 
              <div>User said:</div>
              {comment}
              <div>{createdAt}</div>
            </div>
            
          </>
        ))}
      </>
    )
  }


  return (            // the styling of the div below might be better applied inside Post.css
    <>

    <div className="outer-box">
      <div className="comment-box" style={{border: 'solid', width: 300, marginBottom: 10, padding: 5, borderWidth: 1}}> 
        <img className="profile-image" src={post.profilePicture} width="50" alt="profile pic"/>
        <article className="username">{post.author}</article>
        <article data-cy="post" key={ post._id }>{ post.message }</article>
        <button className="like-button" onClick={handleLike}>Like<span><div>{likeCount}</div></span></button>
        <div>{post.createdAt}</div>
      </div>
      <div>{renderComments()}</div>
      <div>{renderCommentForm()}</div>
    </div>
    </>
  )
}

export default Post;




