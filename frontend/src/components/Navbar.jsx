import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const isHomePage = window.location.pathname === '/';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleRecommendClick = (e) => {
    if (!isHomePage) {
      e.preventDefault();
      navigate('/');
      
      setTimeout(() => {
        const element = document.getElementById('crop-recommendation');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleLogout = async () => {
    try {
      // Call your backend logout endpoint if you have one
      // await fetch("http://localhost:8000/api/users/logout/", {
      //   method: "POST",
      //   headers: {
      //     "Authorization": `Token ${localStorage.getItem('token')}`,
      //   },
      // });

      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      
      // Update state
      setIsLoggedIn(false);
      setUsername('');
      
      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-green-600 p-4 pl-20">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side: Links to Sections */}
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-green-300 text-xl">
            Home
          </Link>
          <Link
            to={isHomePage ? "#crop-recommendation" : "/#crop-recommendation"}
            onClick={handleRecommendClick}
            className="text-white hover:text-green-300 text-xl"
          >
            Recommend Crop
          </Link>
          <Link to="#tips" className="text-white hover:text-green-300 text-xl">
            Tips
          </Link>
        </div>

        {/* Right Side: Login/Signup or User Greeting */}
        <div className="flex space-x-4 items-center">
          {isLoggedIn ? (
            <>
              <span className="text-white text-xl">Hi, {username}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-green-600 px-3 py-2 rounded hover:bg-green-200 text-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-green-600 px-3 py-2 rounded hover:bg-green-200 text-lg"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-green-600 px-3 py-2 rounded hover:bg-green-200 text-lg"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;