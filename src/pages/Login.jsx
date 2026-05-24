import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
  "http://localhost:5000/api/students/login",
  {
    email: formData.email,
    password: formData.password
  }
);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "student",
        JSON.stringify(res.data.student)
      );

      toast.success("Login Successful");

      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="flex justify-center items-center py-20 px-6">

        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-10">

          <h1 className="text-4xl font-bold text-center text-gray-800">
            Login
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-6"
          >

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="p-4 border rounded-xl"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="p-4 border rounded-xl"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-4 rounded-xl"
            >
              Login
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;