import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="site-header">
      <Link to="/" className="logo">
        Portfolio
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/organization-projects">Organization Projects</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>
      <div className="auth-area">
        {!user && (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
        {user && (
          <div className="dropdown">
            <span onClick={() => setDropdownOpen(!dropdownOpen)}>{user.name}</span>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                <button
                  onClick={() => {
                    navigate(user.role === 'superadmin' ? '/superadmin/dashboard' : '/admin/dashboard');
                    setDropdownOpen(false);
                  }}
                  className="dropdown-item"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                    setDropdownOpen(false);
                  }}
                  className="dropdown-item"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
