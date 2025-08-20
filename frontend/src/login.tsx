import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import useUser from "../components/state";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toggleAuth, toggleEmail, toggleRole } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("https://ams-yivz.onrender.com/user/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 204) {
        setLoading(false);
        toast.error("Login failed. User not found.");
        return;
      }

      if (response.status === 203) {
        setLoading(false);
        toast.error("Login failed. Invalid credentials.");
        return;
      }

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        toggleAuth();
        toggleEmail(formData.email);
        toggleRole(response.data.role);
        toast.success("Logged in successfully!");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Login failed. Please check your credentials.");
      console.error("Error logging in:", error);
    }
  };

  const handleSignUpClick = () => {
    const loadingToast = toast.loading("Loading Sign up...", {
      style: {
        background:
          "linear-gradient(126.3deg, rgba(242,227,213,1) 80.2%, rgba(242,227,213,1) 2%)",
      },
    });

    setTimeout(() => {
      navigate("../signUp");
      toast.dismiss(loadingToast);
    }, 1200);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-28 sm:py-12"
      style={{
        background:
          "linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)",
      }}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20">
        {/* Logo & Title */}
        <a
          href="#"
          className="flex items-center justify-center mb-8 text-3xl font-semibold text-white space-x-3"
        >
          <img className="w-14 h-10" src="./Logo.png" alt="logo" />
          <span>AMS</span>
        </a>

        <h1 className="text-center text-2xl font-bold leading-tight tracking-tight text-white mb-6">
          Sign in to your account
        </h1>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@gmail.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg border border-gray-300 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg border border-gray-300 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-gray-300 cursor-pointer select-none">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-sm">Remember me</span>
            </label>

            <a
              href="#"
              className="text-sm font-medium text-indigo-300 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition ${
              loading ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            {loading ? (
              <span className="flex justify-center items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 100 8V4a8 8 0 01-8 8z"
                  ></path>
                </svg>
                <span>Logging in...</span>
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300">
          Don’t have an account yet?{" "}
          <button
            onClick={handleSignUpClick}
            className="font-medium text-indigo-400 hover:underline focus:outline-none"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
