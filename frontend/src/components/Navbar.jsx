import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <strong>Student Dashboard</strong>
      <div className="nav-links">
        {user ? (
          <>
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
            <Link className="nav-link" to="/timetable">
              Timetable
            </Link>
            <Link className="nav-link" to="/goals">
              Goals
            </Link>
            <Link className="nav-link" to="/tasks">
              Tasks
            </Link>
            <button type="button" className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
