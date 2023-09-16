import React from 'react'
import {  useState } from "react"
import { IoMdAdd } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import Home from './Home';

function EditProfile() {
    const { user: authenticatedUser, dispatch } = useAuthContext();    
    const { user } = authenticatedUser;
    const [email, setEmail] = useState(user.email || "");
    const [bio, setBio] = useState(user.bio || "");
    const [name, setName] = useState(user.name || "");
    const [surname, setSurname] = useState(user.surname || "");
    const [imagePath, setImagePath] = useState(user.img || "");
    const [education, setEducation] = useState(user.education || "");
    const [country, setCountry] = useState(user.country || "");
    const navigate = useNavigate();
    
    console.log(user);
    
    const submitEdit = async (e) => {
        e.preventDefault();
      try {
        const updatedData = {
          email: email,
          bio: bio,
          name: name,
          surname: surname,
          img: imagePath,
          education: education,
          country: country,
        };

        // Make a PATCH request to update the user data
        const response = await axios.patch(
          "http://localhost:4000/api/user/user",
          updatedData,
          {
            headers: {
                Authorization: `Bearer ${authenticatedUser.token}`, // Include the user's token for authentication
            },
          }
        );

        // Handle the response, check for success, and update your UI accordingly
        if (response.status === 200) {
          // Data updated successfully
          console.log("User data updated:", response.data);
          dispatch({type : "EDIT_USER", payload: response.data})
          localStorage.setItem('user',JSON.stringify({user : {...response.data},token: authenticatedUser.token}) );
          navigate('/profile');
        
        } else {
          // Handle other status codes or errors as needed
          console.error("Failed to update user data:", response.statusText);
        }
      } catch (error) {
        // Handle any network or other errors that may occur
        console.error("An error occurred:", error);
      }
    };
      

  return (
    <form className="signup df edit" onSubmit={submitEdit}>
      <div className="right-form">
        <div id="signInDiv"></div>
        <h3>Edit profile</h3>

        <label>name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label>surname :</label>
        <input
          type="text"
          onChange={(e) => setSurname(e.target.value)}
          value={surname}
        />
        <label className="input--image" htmlFor="inputTag">
          <IoMdAdd className="plus--icon icon" />
          <span>
            <CiImageOn className="icon" />
          </span>
          <input
            type="file"
            id="inputTag"
            accept="image/png, image/jpg, image/gif, image/jpeg"
            onChange={(e) => {
              const file = e.target.files[0];
              setImagePath(file.name);
            }}
          />
          <p>{imagePath}</p>
        </label>
        <label>Email address:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="left-form">
        <label>bio:</label>
        <input
          type="text"
          onChange={(e) => setBio(e.target.value)}
          value={bio}
        />
        <label>education :</label>
        <input
          type="text"
          onChange={(e) => setEducation(e.target.value)}
          value={education}
        />
        <label>country :</label>
        <input
          type="text"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
        />
        <button>save changes</button>
      </div>

    </form>
  );
}

export default EditProfile