import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import logo from "../assets/logo.png";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 }
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(
        "https://winspoip.wahyurj.my.id/login",
        formData
      );

      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
      });
      navigate("/");

      console.log(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
      });

      console.error("Login failed", error);
    }
  };

  const handleCredentialResponse = async ({ credential }) => {
    try {
      const { data } = await Axios({
        method: "post",
        url: "https://winspoip.wahyurj.my.id/google-login",
        headers: {
          "google-token": credential,
        },
      });

      console.log("Received response:", data);

      localStorage.access_token = data.access_token;
      navigate("/");
    } catch (error) {
      console.log("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid email or password!",
      });
    }
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "261169357803-keuu9oq6gov5s5b2ddvkmaia56h4v3rc.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("google-login"),
      { theme: "outline", size: "large" } // customization attributes
    );
    //   google.accounts.id.prompt(); // also display the One Tap dialog
  });

  return (
    <animated.section
    style={fadeIn}
    className="bg-gradient-to-br from-white to-[#ff5151] min-h-screen flex items-center justify-center"
  >
      <div className="max-w-xl w-full bg-white p-10 rounded-md shadow-md dark:border dark:border-gray-700 flex">
        <div className="mr-8">
          <img src={logo} alt="Logo" className="w-50 h-50" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Login
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
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
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
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
              className="bg-[#ff5151] hover:bg-blue-500 transition-all ease-in-out duration-300 text-white px-6 py-2 rounded-md font-bold"
            >
              Login
            </button>
            <div id="google-login"></div>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Register here
              </a>
            </p>
            
          </form>
        </div>
      </div>
      </animated.section>
  );
}
