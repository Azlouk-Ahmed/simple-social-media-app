import {  useState } from "react"
import { useSignUp } from "../hooks/useSignUp"
import { IoMdAdd } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";

const Signup = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [imagePath, setImagePath] = useState("");
  const {signup,error,loading} = useSignUp();

  // function handleCallbackResponse(reponse){
  //   //console.log("encoded jwt token : ",reponse.credential)
  //   var userObject = jwt_decode(reponse.credential);
  //   console.log(userObject);
  // }
  // useEffect(() => {
  //   google.accounts.id.initialize({
  //     client_id : "546190553971-fh9aai50og4olgsgeqg50fomqkcpes5q.apps.googleusercontent.com",
  //     callback : handleCallbackResponse
  //   })
  //   google.accounts.id.renderButton(
  //     document.getElementById("signInDiv"),
  //     { theme: "outline", size: "large"}
  //   )
  // }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password,name ,surname ,imagePath);
    console.log(error);

  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <div id="signInDiv"></div>
      <h3>Sign Up</h3>
      
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
              onChange={(e) => {const file = e.target.files[0];setImagePath(file.name);}}
            />
            <p>{imagePath}</p>
      </label>
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={loading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup