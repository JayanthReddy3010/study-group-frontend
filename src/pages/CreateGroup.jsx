import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function CreateGroup() {

  const student = JSON.parse(localStorage.getItem("student"));

  const [formData, setFormData] = useState({
    group_name: "",
    subject: "",
    description: "",
    study_mode: "",
    max_members: "",
    created_by: student.id,
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

      await axios.post(
        "http://localhost:5000/api/groups/create",
        formData
      );

      toast.success("Group Created Successfully");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center items-center py-16 px-6">

        <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-10">

          <h1 className="text-4xl font-bold text-center">
            Create Study Group
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mt-10 grid gap-6"
          >

            <input
              type="text"
              name="group_name"
              placeholder="Group Name"
              onChange={handleChange}
              className="p-4 border rounded-xl"
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              onChange={handleChange}
              className="p-4 border rounded-xl"
            />

            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="p-4 border rounded-xl h-32"
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
              type="number"
              name="max_members"
              placeholder="Max Members"
              onChange={handleChange}
              className="p-4 border rounded-xl"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-4 rounded-xl"
            >
              Create Group
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default CreateGroup;