import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!formData.termsAccepted) {
      toast.error("You must accept the Terms and Conditions");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://ams-4-0xhb.onrender.com/user/signUp", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 204) {
        toast.error("Account already exists");
        return;
      }
      if (response.status !== 200) {
        toast.error("Failed to create account");
        return;
      }
      toast.success("Account created successfully");
      setFormData({ email: "", password: "", confirmPassword: "", termsAccepted: false });
    } catch (error) {
      toast.error("An error occurred during sign up.");
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-28"
      style={{
        background:
          "linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)",
      }}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl backdrop-brightness-125 rounded-2xl p-8 shadow-lg border border-white/20">
        <a href="#" className="flex items-center mb-8 justify-center text-3xl font-semibold text-white">
          <img src="./Logo.png" alt="AMS Logo" className="w-14 h-10 mr-2" />
          AMS
        </a>
        <h1 className="text-white text-center text-2xl font-bold mb-6">Create an account</h1>
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-200">
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
              required
              className="w-4 h-4 rounded border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-500"
            />
            <label htmlFor="terms" className="ml-3 text-sm font-light text-gray-300">
              I accept the{" "}
              <a href="#" className="font-medium text-indigo-700 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 100 8V4a8 8 0 01-8 8z"
                  />
                </svg>
                <span>Creating account...</span>
              </span>
            ) : (
              "Create an account"
            )}
          </button>
          <p className="text-center text-sm font-light text-gray-100">
            Already have an account?{" "}
            <Link
              to="../login"
              className="font-medium text-indigo-700 hover:underline focus:outline-none"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
