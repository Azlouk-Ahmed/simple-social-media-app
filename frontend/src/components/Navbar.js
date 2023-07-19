import { Link } from 'react-router-dom'
import { useLogOut } from '../hooks/useLogOut'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const {user} = useAuthContext(); 
  const { logout } = useLogOut()
  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>MediaTn</h1>
        </Link>
        <nav>
          
          {user ? (
            <div className='nav'>
              <div className='nav-user'>
                <img src={(user.user.img) ?`/img/${user.user.img}` : `/img/default.png`} alt="profile img" />
                <span> {user.user.name} {user.user.surname}</span>
              </div>
              <button onClick={handleClick}>Log out</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
          
        </nav>
      </div>
    </header>
  )
}

export default Navbar