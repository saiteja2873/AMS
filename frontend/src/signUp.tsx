
import { useState } from "react";
import React, { ChangeEvent } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });


const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value, type, checked } = e.target;

  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: type === 'checkbox' ? checked : value,
  }));
};

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    const response = await axios.post('http://localhost:4000/user/signUp', {
      email : formData.email,
      password : formData.password
    });
    console.log(response.data);
  };
  

  return (
    <>
    <div style={{ 
                background: 'linear-gradient(126.3deg, rgba(1, 46, 64, 1) 32.2%, rgba(198, 55, 160, 0.46) 109.2%)', 
                height: '100vh',
                margin: 0 
            }}>
    <section className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full max-w-md">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
          <img className="w-14 h-10 mr-2" src="./Logo.png" alt="AMS Logo" />
          AMS
        </a>
        <div className="w-full rounded-lg shadow-lg dark:border dark:bg-gray-800 dark:border-gray-700 backdrop-blur-xl backdrop-brightness-125">
          <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-100 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg
                   focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg font-medium focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  className="bg-gray-50 border border-gray-300 text-gray-900  font-medium text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="termsAccepted"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-500 dark:ring-offset-gray-800"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-300 dark:text-gray-300">
                    I accept the <a href="#" className="font-medium text-primary-200 hover:underline dark:text-primary-500">Terms and Conditions</a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-300 dark:text-gray-400">
                Already have an account? <Link to={'../login'} className="font-medium text-primary-200 hover:underline dark:text-primary-500">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    </div>
    </>
  );
};

export default SignUp;
