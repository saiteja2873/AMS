import { Link } from "react-router-dom";

function NavBarComponent() {
    return (
        <div>
            <nav className="bg-customBlue dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="Logo.png" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-customWhite">AMS</span>
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse bg-transparent">
                        <Link to = {'./login'}><button type="button" className="text-customWhite hover:bg-customLightBlue bg-customLightLightBlue focus:ring-2 focus:outline-1 focus:ring-customLightLightBlue font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In</button></Link>
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-transparent">
                            <li>
                                <a href="#" className="block py-2 px-3 text-customWhite  md:bg-transparent md:hover:text-customFourBlue  md:p-0 " >Home</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-customWhite md:hover:bg-transparent md:hover:text-customFourBlue md:p-0 ">About</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-customWhite  md:bg-transparent md:hover:text-customFourBlue  md:p-0">Services</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-customWhite  md:bg-transparent md:hover:text-customFourBlue  md:p-0">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBarComponent;
