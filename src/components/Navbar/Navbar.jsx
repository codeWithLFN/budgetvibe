import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // You'll need to create this hook

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-white text-xl font-bold">BudgetVibe</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
                Home
              </Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
                    Dashboard
                  </Link>
                  <Link to="/expenses" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
                    Expenses
                  </Link>
                  <Link to="/budget" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
                    Budget
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
                    Login
                  </Link>
                  <Link to="/signup" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-500"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-white block hover:bg-indigo-500 px-3 py-2 rounded-md">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-white block hover:bg-indigo-500 px-3 py-2 rounded-md">
                  Dashboard
                </Link>
                <Link to="/expenses" className="text-white block hover:bg-indigo-500 px-3 py-2 rounded-md">
                  Expenses
                </Link>
                <Link to="/budget" className="text-white block hover:bg-indigo-500 px-3 py-2 rounded-md">
                  Budget
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white block hover:bg-indigo-500 px-3 py-2 rounded-md w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white block hover:bg-indigo-500 px-3 py-2 rounded-md">
                  Login
                </Link>
                <Link to="/signup" className="text-white block hover:bg-indigo-500 px-3 py-2 rounded-md">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
