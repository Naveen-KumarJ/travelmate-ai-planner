import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../services/firebase.js";
import { useEffect, useState } from "react";

const Header = () => {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (logoutVisible) {
      const timer = setTimeout(() => {
        setLogoutVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [logoutVisible]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/create-trip");
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 shadow-md bg-[#f9fafb] gap-2 sm:gap-0">
      <Link to={"/"}>
        <img
          src="/logo.svg"
          alt="logo - TravelMate AI"
          className="h-[36px] sm:h-[40px] aspect-auto cursor-pointer"
        />
      </Link>

      {user ? (
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
          <p className="text-black font-medium hidden sm:block">
            Hello, {user.displayName?.split(" ")[0]}
          </p>

          <div className="flex gap-2 flex-wrap justify-center">
            <Button
              className="bg-[#6366f1] text-white px-4 py-2 rounded-lg hover:bg-[#4f46e5] w-full sm:w-auto cursor-pointer"
              onClick={() => navigate("/create-trip")}
            >
              + Create Trip
            </Button>
            <Button
              className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 w-full sm:w-auto cursor-pointer"
              onClick={() => navigate("/my-trips")}
            >
              My Trips
            </Button>
          </div>

          <div className="relative">
            <img
              src={user.photoURL || "/default-avatar.png" }
              alt="User Avatar"
              className="w-9 aspect-square rounded-full border-2 border-gray-300 cursor-pointer"
              onClick={() => setLogoutVisible(!logoutVisible)}
            />
            {logoutVisible && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-md rounded-md z-10">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-semibold text-red-500 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Button
          className="cursor-pointer px-6 py-2 bg-[#6366f1] text-white rounded-lg hover:bg-[#4f46e5] w-full sm:w-auto"
          onClick={handleLogin}
        >
          Sign In
        </Button>
      )}
    </header>
  );
};

export default Header;
