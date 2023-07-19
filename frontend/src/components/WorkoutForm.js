import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import Loading from './Loading'
import { IoMdAdd } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext();

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imagePath, setImagePath] = useState("");
  const [loading, setloading] = useState(null)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const post = {title, description, image : imagePath}
    setloading("active");
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        'authorization' : `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
      setloading(null)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setDescription('')
      setImagePath('')
      setloading(null)
      dispatch({type: 'CREATE_WORKOUT', payload: json})

    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Post</h3>

      <label>Post Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Description:</label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <label>image:</label>
        <label className="input--image post--form" htmlFor="inputTag">
            <IoMdAdd className="plus--icon icon" />
            <span>
              <CiImageOn className="icon" />
            </span>
            <input
              type="file"
              className='input--image'
              id="inputTag"
              accept="image/png, image/jpg, image/gif, image/jpeg"
              onChange={(e) => {const file = e.target.files[0];setImagePath("/img/" + file.name); }}
            />
            <p>{imagePath.slice(5)}</p>
      </label>
        {loading ? (
            <Loading />
        ) : (
          <button>Add Workout</button>
        )}
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm