const Footer = () => {
  return (
    <footer className="bg-[#1E1E2F] text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-sm">
        <p className="text-center">
          © 2025 TravelMate AI. All rights reserved.
        </p>
        <p className="mt-1 text-center">
          Made with <span className="text-red-500">❤️</span> by{" "}
          <a
            href="https://www.linkedin.com/in/naveen-kumar-j-44b4061ab/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Naveen Kumar J
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
