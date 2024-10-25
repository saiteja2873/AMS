import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner"; // Assuming you're using sonner for toast messages
import useUser from '../components/state';  // Import the Zustand store

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Access Zustand store actions
    const { toggleAuth, toggleEmail, toggleRole} = useUser();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData);
        try {
            const response = await axios.post('http://localhost:4000/user/login', {
                email: formData.email,
                password: formData.password,
            });
            

            if (response.status == 204) {
                toast.error('Login failed. User not Found');
                return
            }

            if (response.status == 203) {
                toast.error('Login failed. Invalid Credentials');
                return
            }

            if (response.data.token) {
                // Store the token in local storage
                localStorage.setItem('token', response.data.token);
                
                toggleAuth();  // Set isAuthenticated to true
                toggleEmail(formData.email); 
                toggleRole(response.data.role); // Set user email in the Zustand store

                // Show success toast notification
                toast.success('Logged in successfully!');
            }
        } catch (error) {
            toast.error('Login failed. Please check your credentials.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div style={{
                background: 'linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)',
                height: '100vh',
                margin: 0
            }}>
            <section>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-customWhite">
                        <img className="w-14 h-10 mr-2" src="./Logo.png" alt="logo" />
                        AMS
                    </a>
                    <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 backdrop-blur-2xl backdrop-brightness-125">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 font-medium rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@gmail.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-200">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 font-medium text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-100 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-300 dark:text-gray-400">
                                    Don’t have an account yet? <Link to={'../signUp'} className="font-medium text-primary-200 hover:underline dark:text-primary-500">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
