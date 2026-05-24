import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";
import socket from "../socket";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
function Groups() {

  const [groups, setGroups] = useState([]);

  const [search, setSearch] = useState("");

  const [modeFilter, setModeFilter] =
    useState("All");

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  const fetchGroups = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/groups/all"
      );

      setGroups(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const joinGroup = async (groupId) => {

    try {

      await axios.post(
        "http://localhost:5000/api/groups/join",
        {
          student_id: student.id,
          group_id: groupId,
        }
      );

      toast.success("Joined Group Successfully");
      socket.emit("group_joined", {
  message: `${student.fullname} joined ${group.group_name}`
});
    } catch (err) {
      console.log(err);
    }
  };

  const filteredGroups = groups.filter(
    (group) => {

      const matchesSearch =
        group.group_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        group.subject
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesMode =
        modeFilter === "All" ||
        group.study_mode === modeFilter;

      return matchesSearch && matchesMode;
    }
  );

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-6 md:p-10">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

          <div>

            <h1 className="text-4xl font-bold">
              Explore Study Groups
            </h1>

            <p className="text-gray-500 mt-2">
              Discover groups based on your
              interests and study preferences.
            </p>

          </div>

        </div>

        {/* SEARCH + FILTER */}

        <div className="bg-white rounded-3xl shadow-md p-6 mt-8 flex flex-col md:flex-row gap-5">

          <div className="flex items-center border rounded-2xl px-4 flex-1">

            <Search
              className="text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search by subject or group..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full p-4 outline-none"
            />

          </div>

          <select
            value={modeFilter}
            onChange={(e) =>
              setModeFilter(e.target.value)
            }
            className="p-4 border rounded-2xl"
          >

            <option value="All">
              All Modes
            </option>

            <option value="Online">
              Online
            </option>

            <option value="Offline">
              Offline
            </option>

            <option value="Both">
              Both
            </option>

          </select>

        </div>

        {/* GROUPS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

          {filteredGroups.length === 0 ? (

            <div className="bg-white rounded-3xl p-10 shadow-md col-span-full text-center">

              <h2 className="text-2xl font-bold">
                No Groups Found
              </h2>

              <p className="text-gray-500 mt-3">
                Try changing your search or
                filters.
              </p>

            </div>

          ) : (

            filteredGroups.map((group, index) => (

              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                }}
                className="bg-white rounded-3xl p-7 shadow-md hover:shadow-2xl transition duration-300"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {group.group_name}
                    </h2>

                    <p className="text-blue-600 mt-2 font-medium">
                      {group.subject}
                    </p>

                  </div>

                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold">

                    {group.study_mode}

                  </span>

                </div>

                <p className="mt-5 text-gray-600 leading-7">

                  {group.description}

                </p>

                <div className="mt-8 flex justify-between items-center">

                  <div>

                    <p className="text-sm text-gray-400">
                      Max Members
                    </p>

                    <p className="font-bold">
                      {group.max_members}
                    </p>

                  </div>

                  <div className="flex justify-between items-center mt-6">

  {/* MEMBER COUNT */}

  <div className="flex items-center gap-3">

    <span className="bg-gray-100 px-4 py-2 rounded-xl text-sm">

      {group.member_count} / {group.max_members} Members

    </span>

    {group.member_count >= group.max_members && (

      <span className="bg-red-100 text-red-600 px-3 py-2 rounded-xl text-sm font-semibold">

        Group Full

      </span>

    )}

  </div>

  {/* JOIN BUTTON */}

  <button
    disabled={
      group.member_count >= group.max_members
    }
    onClick={() => joinGroup(group.id)}
    className={`px-5 py-2 rounded-xl text-white font-semibold transition

      ${
        group.member_count >= group.max_members
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }
    `}
  >

    {group.member_count >= group.max_members
      ? "Full"
      : "Join Group"}

  </button>

</div>

                </div>

              </motion.div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default Groups;