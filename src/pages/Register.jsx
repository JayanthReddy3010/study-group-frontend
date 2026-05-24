import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function Register() {

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    college: "",
    department: "",
    semester: "",
    strong_subjects: "",
    weak_subjects: "",
    skills: "",
    study_mode: "",
    availability: "",
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
      "https://study-group-backend-b1kf.onrender.com/api/students/register",
      {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        college: formData.college,
        department: formData.department,
        semester: formData.semester,
        strong_subjects: formData.strong_subjects,
        weak_subjects: formData.weak_subjects,
        skills: formData.skills,
        study_mode: formData.study_mode,
        availability: formData.availability
      }
    );

    toast.success("Registration Successful");

    console.log(res.data);

  } catch (err) {

    console.log(err);

    toast.error(
      err.response?.data || "Registration Failed"
    );
  }
};
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="flex justify-center items-center py-16 px-6">

        <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-10">

          <h1 className="text-4xl font-bold text-center text-gray-800">
            Create Your Profile
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              onChange={handleChange}
              className="p-4 border rounded-xl"
            />

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

            <input
              type="text"
              name="college"
              placeholder="College"
              onChange={handleChange}
              className="p-4 border rounded-xl"
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              onChange={handleChange}
              className="p-4 border rounded-xl"
            />

            <input
              type="text"
              name="semester"
              placeholder="Semester"
              onChange={handleChange}
              className="p-4 border rounded-xl"
            />

            <input
              type="text"
              name="strong_subjects"
              placeholder="Strong Subjects"
              onChange={handleChange}
              className="p-4 border rounded-xl"
            />

            <input
              type="text"
              name="weak_subjects"
              placeholder="Weak Subjects"
              onChange={handleChange}
              className="p-4 border rounded-xl"
            />

            <input
              type="text"
              name="skills"
              placeholder="Skills"
              onChange={handleChange}
              className="p-4 border rounded-xl"
            />

            <select
              name="study_mode"
              onChange={handleChange}
              className="p-4 border rounded-xl"
            >
              <option>Select Mode</option>
              <option>Online</option>
              <option>Offline</option>
              <option>Both</option>
            </select>

            <input
              type="text"
              name="availability"
              placeholder="Availability"
              onChange={handleChange}
              className="p-4 border rounded-xl md:col-span-2"
            />
            
            <button
  type="submit"
  className="bg-blue-600 text-white py-4 rounded-xl md:col-span-2"
>
  Register
</button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Register;