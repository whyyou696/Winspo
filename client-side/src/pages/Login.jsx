import React, { useState } from "react";
  import Axios from "axios";
  import Swal from "sweetalert2";
  import { useNavigate } from "react-router-dom";
  import logo from "../images/logo.png";
  
  export default function Login() {
    const [formData, setFormData] = useState({
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
        const response = await Axios.post("", formData);
        
        const { access_token } = response.data;
        localStorage.setItem("access_token", access_token);
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
        });
        navigate("/");
  
        console.log(response.data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid email or password. Please try again.',
        });
  
        console.error("Login failed", error);
      }
    }; 
    
    return (
      <section className="bg-gradient-to-br from-blue-500 to-orange-500 min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full bg-white p-10 rounded-md shadow-md dark:border dark:border-gray-700 flex">
          <div className="mr-8">
            <img src={logo} alt="Logo" className="w-50 h-50" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Login</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input-field"
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
                  className="input-field"
                  placeholder="••••••••"
                  required=""
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-orange-500 transition-all ease-in-out duration-300 text-white px-6 py-2 rounded-md font-bold"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    );
  }

