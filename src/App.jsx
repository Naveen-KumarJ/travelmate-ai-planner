import { Outlet } from "react-router-dom";
import Footer from "./components/custom/Footer";
import Header from "./components/custom/Header";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 flex justify-center items-center">
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </div>
  );
};

export default App;
