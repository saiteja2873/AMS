import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useUser from "../components/state";
import { toast } from "sonner";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function NavBarComponent() {
  const { isAuthenticated, toggleAuth, toggleEmail, toggleRole } = useUser();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    toggleAuth();
    toggleEmail("");
    toggleRole("USER");

    const loadingToast = toast.loading("Signing out...");
    setTimeout(() => {
      navigate("/");
      toast.dismiss(loadingToast);
    }, 1000);
  };

  const handleNavigation = (path: string) => {
    const loadingToast = toast.loading("Loading...", {
      style: {
        background:
          "linear-gradient(126.3deg, rgba(242,227,213,1.000) 44.2%, rgba(242,227,213,1.000) 109.2%)",
      },
    });
    setTimeout(() => {
      navigate(path);
      toast.dismiss(loadingToast);
    }, 1000);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Left: Logo */}
        <button
          onClick={() => handleNavigation("/")}
          className="flex items-center space-x-3"
        >
          <img src="Logo.png" className="h-8" alt="AMS Logo" />
          <span className="text-2xl font-semibold text-customWhite">AMS</span>
        </button>

        {/* Center: Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 font-semibold">
          <button
            onClick={() => handleNavigation("/")}
            className="text-customWhite hover:text-customFourBlue transition"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("/about")}
            className="text-customWhite hover:text-customFourBlue transition"
          >
            About
          </button>
          <button
            onClick={() => handleNavigation("/services")}
            className="text-customWhite hover:text-customFourBlue transition"
          >
            Services
          </button>
          <button
            onClick={() => handleNavigation("/contact")}
            className="text-customWhite hover:text-customFourBlue transition"
          >
            Contact
          </button>
        </div>

        {/* Right: Auth button (Desktop only) */}
        <div className="hidden md:flex">
          {isAuthenticated ? (
            <button
              onClick={handleSignOut}
              className="text-customWhite bg-customLightLightBlue hover:bg-customLightBlue rounded-lg text-sm px-4 py-2 transition"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => handleNavigation("/login")}
              className="text-customWhite bg-customLightLightBlue hover:bg-customLightBlue rounded-lg text-sm px-4 py-2 transition"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden inline-flex items-center p-2 text-customWhite rounded-lg focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg"
          >
            <ul className="flex flex-col p-4 space-y-3">
              <li>
                <button
                  onClick={() => handleNavigation("/")}
                  className="block text-customWhite hover:text-customFourBlue transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/about")}
                  className="block text-customWhite hover:text-customFourBlue transition"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/services")}
                  className="block text-customWhite hover:text-customFourBlue transition"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="block text-customWhite hover:text-customFourBlue transition"
                >
                  Contact
                </button>
              </li>

              {/* Auth button (Mobile only) */}
              <li>
                {isAuthenticated ? (
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left text-customWhite bg-customLightLightBlue hover:bg-customLightBlue rounded-lg text-sm px-4 py-2 transition"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavigation("/login")}
                    className="w-full text-left text-customWhite bg-customLightLightBlue hover:bg-customLightBlue rounded-lg text-sm px-4 py-2 transition"
                  >
                    Sign In
                  </button>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default NavBarComponent;
