import { useNavigate } from "react-router-dom";
import useUser from "../components/state";  // Import the useUser hook
import { toast } from "sonner";

function NavBarComponent() {
    const { isAuthenticated, toggleAuth, toggleEmail, toggleRole } = useUser();
    const navigate = useNavigate();

    const handleSignOut = () => {
        toggleAuth(); // Set isAuthenticated to false
        toggleEmail(''); // Clear email
        toggleRole('USER'); // Reset role to default
        
        // Show loading toast
        const loadingToast = toast.loading("Signing out...");
        
        // Delay navigation to show the toast
        setTimeout(() => {
            // Navigate to home page
            navigate("/");
            
            // Dismiss the loading toast after navigation
            toast.dismiss(loadingToast);

        }, 1000); // Adjust time if needed

    };

    const handleNavigation = (path : any) => {
        const loadingToast = toast.loading("Loading...",{style: {background: "linear-gradient(126.3deg, rgba(242,227,213,1.000) 44.2%, rgba(242,227,213,1.000) 109.2%)"}});
        setTimeout(() => {
            navigate(path);
            toast.dismiss(loadingToast);
        }, 1000); // Adjust time if needed
    };

    return (
        <div>
            <nav className="bg-customBlue dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <button 
                        onClick={() => handleNavigation("/")} 
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <img src="Logo.png" className="h-8" alt="AMS Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-customWhite">AMS</span>
                    </button>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse bg-transparent">
                        {isAuthenticated ? (
                            <button 
                                onClick={handleSignOut} 
                                type="button" 
                                className="text-customWhite hover:bg-customLightBlue bg-customLightLightBlue focus:ring-2 focus:outline-1 focus:ring-customLightLightBlue font-medium rounded-lg text-sm px-4 py-2 text-center"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <button 
                                onClick={() => handleNavigation("/login")} 
                                type="button" 
                                className="text-customWhite hover:bg-customLightBlue bg-customLightLightBlue focus:ring-2 focus:outline-1 focus:ring-customLightLightBlue font-medium rounded-lg text-sm px-4 py-2 text-center"
                            >
                                Sign In
                            </button>
                        )}
                        {/* The hamburger menu for mobile */}
                        <button 
                            data-collapse-toggle="navbar-sticky" 
                            type="button" 
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                            aria-controls="navbar-sticky" 
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-transparent">
                            <li>
                                <button 
                                    onClick={() => handleNavigation("/")} 
                                    className="block py-2 px-3 text-customWhite md:bg-transparent md:hover:text-customFourBlue md:p-0"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleNavigation("/about")} 
                                    className="block py-2 px-3 text-customWhite md:bg-transparent md:hover:text-customFourBlue md:p-0"
                                >
                                    About
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleNavigation("/services")} 
                                    className="block py-2 px-3 text-customWhite md:bg-transparent md:hover:text-customFourBlue md:p-0"
                                >
                                    Services
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleNavigation("/contact")} 
                                    className="block py-2 px-3 text-customWhite md:bg-transparent md:hover:text-customFourBlue md:p-0"
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBarComponent;
