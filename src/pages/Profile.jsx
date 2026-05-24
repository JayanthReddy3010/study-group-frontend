import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    department: "",
    skills: "",
    strong_subjects: "",
    weak_subjects: "",
    preferred_mode: ""
  });

  const [password, setPassword] =
    useState("");

  useEffect(() => {

    if (student) {

      setFormData({
        fullname:
          student.fullname || "",

        email:
          student.email || "",

        department:
          student.department || "",

        skills:
          student.skills || "",

        strong_subjects:
          student.strong_subjects || "",

        weak_subjects:
          student.weak_subjects || "",

        preferred_mode:
          student.preferred_mode || ""
      });
    }

  }, []);

  // HANDLE CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // UPDATE PROFILE

  const updateProfile = async () => {

  try {

    const res = await axios.put(
      `http://localhost:5000/api/students/update/${student.id}`,
      formData
    );

    localStorage.setItem(
      "student",
      JSON.stringify(res.data)
    );

    alert("Profile Updated");

    window.location.reload();

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data || "Update Failed"
    );
  }
};

  // DELETE ACCOUNT

  const deleteAccount = async () => {

  try {

    const res = await axios.post(
      `http://localhost:5000/api/students/delete/${student.id}`,
      {
        password
      }
    );

    alert(res.data);

    localStorage.clear();

    navigate("/login");

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data ||
      "Delete Failed"
    );
  }
};

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-3xl mx-auto p-8">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-4xl font-bold mb-8">

            My Profile

          </h1>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="skills"
              placeholder="Skills"
              value={formData.skills}
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="strong_subjects"
              placeholder="Strong Subjects"
              value={formData.strong_subjects}
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="weak_subjects"
              placeholder="Weak Subjects"
              value={formData.weak_subjects}
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

          </div>

          <select
            name="preferred_mode"
            value={formData.preferred_mode}
            onChange={handleChange}
            className="border p-4 rounded-xl w-full mt-6"
          >

            <option value="">
              Select Study Mode
            </option>

            <option value="Online">
              Online
            </option>

            <option value="Offline">
              Offline
            </option>

            <option value="Hybrid">
              Hybrid
            </option>

          </select>

          <button
            onClick={updateProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl mt-8 w-full"
          >

            Update Profile

          </button>

        </div>

        {/* DELETE ACCOUNT */}

        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8 border border-red-200">

          <h2 className="text-2xl font-bold text-red-600">

            Delete Account

          </h2>

          <p className="text-gray-500 mt-3">

            Enter your password to permanently
            delete your account.

          </p>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="border p-4 rounded-xl w-full mt-6"
          />

          <button
            onClick={deleteAccount}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl mt-6 w-full"
          >

            Delete Account

          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;