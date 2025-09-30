import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loginForm,setLoginForm]=useState({
        username:"",
        password:""
    })
    const navigate=useNavigate();

     const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/login", loginForm);
     // assume response has { token: "..." }
      // Save token to localStorage
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userId",response.data.id);
      alert("Login successful!");
      navigate("/dashboard"); // redirect to protected page
    } catch (error) {
  console.error("Login error:", error); // 🐞 Show full error in browser console
  const errorMessage = error.response?.data?.error || error.message || "Unknown error";
  alert("Login failed: " + errorMessage);
}
  };

    return(
        <>
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg border border-blue-200">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-8">Employee Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          
                    {/* Email */}
          <div>
            <label htmlFor="username" className="block mb-1 font-medium text-gray-700">username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="john"
              value={loginForm.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              value={loginForm.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
        </>
    )
}
export default Login;