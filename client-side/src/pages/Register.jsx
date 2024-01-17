import React, { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post("https://api.p2.lc2s5.foxhub.space/register", formData);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Your account has been created successfully!',
      });
      navigate("/login");

      console.log(response.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data || 'There was an error creating your account. Please try again.',
      });

      console.error("Registration failed", error);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-500 to-orange-500 min-h-screen flex items-center justify-center">
      <div className="max-w-xl w-full bg-white p-10 rounded-md shadow-md dark:border dark:border-gray-700 flex">
        <div className="mr-8">
          <img src={logo} alt="Logo" className="w-50 h-50" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Create an account</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                User Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                className="input-field italic border rounded-md p-2"
                placeholder="John Doe"
                required=""
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input-field italic border rounded-md p-2"
                placeholder="name@company.com"
                required=""
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="input-field italic border rounded-md p-2"
                placeholder="••••••••"
                required=""
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-orange-500 transition-all ease-in-out duration-300 text-white px-6 py-2 rounded-md font-bold"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
