import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import { FaRocket } from "react-icons/fa";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStart = async () => {
    if (user) {
      navigate("/create-trip");
    } else {
      try {
        await signInWithPopup(auth, provider);
        navigate("/create-trip");
      } catch (error) {
        console.error("Google Sign In Failed", error);
      }
    }
  };

  return (
    <section className="relative max-w-8xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24 text-center gap-6">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight sm:leading-tight">
        Your AI Travel Sidekick is Here
        <br />
        <span className="text-red-600 block">
          Plan Smarter, Explore Deeper, Stress-Free
        </span>
      </h1>

      <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
        Travel smart, not hard — your AI travel buddy’s got it all mapped out!
      </p>

      <Button
          className="mt-8 px-6 py-4 text-lg font-semibold cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white rounded flex items-center gap-2 transition-all duration-300 shadow-lg hover:scale-105"
          onClick={handleStart}
        >
          <FaRocket className="text-white text-xl" />
          Start Planning – It’s Free!
        </Button>
    </section>
  );
};

export default Home;
