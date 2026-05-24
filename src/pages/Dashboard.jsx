import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import RecommendedGroups from "../components/RecommendedGroups";
import socket from "../socket";
import { motion } from "framer-motion";

import {
  Users,
  BookOpen,
  Target,
  PlusCircle,
  MessageCircle,
  Layers3,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

function Dashboard() {

  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const student = JSON.parse(
    localStorage.getItem("student")
  );
const [notification, setNotification] = useState("");
  const [stats, setStats] = useState({
  totalUsers: 0,
  totalGroups: 0,
  totalNotes: 0,
  myGroups: 0,
  progress: 0,
  schedules: []
});

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

    const fetchStats = async () => {

      try {

        const res = await axios.get(
          `${API}/api/groups/dashboard/${student.id}`
        );

        setStats(res.data);
        socket.on(
  "new_join_notification",
  (data) => {

    setNotification(data.message);

    setTimeout(() => {
      setNotification("");
    }, 4000);

  }
);
      } catch (err) {

        console.log(err);
      }
    };

    fetchStats();

  }, []);

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-6 md:p-10">
        {
  notification && (

    <div className="bg-green-500 text-white p-4 rounded-xl mb-6 shadow-lg">

      {notification}

    </div>

  )
}
        {/* HERO SECTION */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-xl"
        >

          <h1 className="text-4xl md:text-5xl font-bold">

            Welcome back,

            <span className="block mt-2">
              {student?.fullname}
            </span>

          </h1>

          <p className="mt-5 text-lg text-blue-100 max-w-2xl">

            Collaborate smarter with AI-powered study
            groups, shared notes, live chat, and
            milestone tracking.

          </p>

          <div className="flex flex-wrap gap-4 mt-8">

            <Link
              to="/create-group"
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition"
            >

              <PlusCircle size={20} />
              Create Group

            </Link>

            <Link
              to="/chat"
              className="bg-blue-500 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-400 transition"
            >

              <MessageCircle size={20} />
              Open Chat

            </Link>

          </div>

        </motion.div>

        {/* DYNAMIC STATS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          {/* TOTAL USERS */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Total Students
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {stats.totalUsers}
                </h2>

              </div>

              <div className="bg-blue-100 p-4 rounded-2xl">

                <Users
                  className="text-blue-600"
                  size={30}
                />

              </div>

            </div>

          </motion.div>

          {/* TOTAL GROUPS */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Total Groups
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {stats.totalGroups}
                </h2>

              </div>

              <div className="bg-green-100 p-4 rounded-2xl">

                <Layers3
                  className="text-green-600"
                  size={30}
                />

              </div>

            </div>

          </motion.div>

          {/* NOTES */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Shared Notes
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {stats.totalNotes}
                </h2>

              </div>

              <div className="bg-orange-100 p-4 rounded-2xl">

                <BookOpen
                  className="text-orange-600"
                  size={30}
                />

              </div>

            </div>

          </motion.div>

          {/* MY GROUPS */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  My Groups
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {stats.myGroups}
                </h2>

              </div>

              <div className="bg-purple-100 p-4 rounded-2xl">

                <Target
                  className="text-purple-600"
                  size={30}
                />

              </div>

            </div>

          </motion.div>

        </div>

        {/* MAIN CONTENT */}

        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          {/* LEFT SIDE */}

          <div className="lg:col-span-2">

            {/* AI GROUPS */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl p-8 shadow-md"
            >

              <RecommendedGroups />

            </motion.div>

            {/* UPCOMING */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-md mt-8"
            >

              <h2 className="text-2xl font-bold">
                Upcoming Study Sessions
              </h2>

              <div className="space-y-5 mt-6">

  {stats.schedules.length === 0 ? (

    <p className="text-gray-500">
      No schedules available
    </p>

  ) : (

    stats.schedules.map((schedule) => (

      <div
        key={schedule.id}
        className="border rounded-2xl p-5"
      >

        <div className="flex justify-between">

          <div>

            <h3 className="font-bold text-lg">
              {schedule.title}
            </h3>

            <p className="text-gray-500 mt-1">
              {schedule.group_name}
            </p>

          </div>

          <div className="text-blue-600 font-semibold">

            {schedule.session_date}
            <br />
            {schedule.session_time}

          </div>

        </div>

      </div>
    ))
  )}

</div>

            </motion.div>

          </div>

          {/* RIGHT SIDE */}

          <div>

            {/* PROFILE */}

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-8 shadow-md"
            >

              <div className="flex flex-col items-center">

                <img
                  src={`https://ui-avatars.com/api/?name=${student?.fullname}`}
                  alt="profile"
                  className="w-28 h-28 rounded-full"
                />

                <h2 className="text-2xl font-bold mt-5">
                  {student?.fullname}
                </h2>

                <p className="text-gray-500 mt-2">
                  {student?.department}
                </p>

              </div>

              <div className="mt-8 space-y-4">

                <div>

                  <p className="text-gray-500">
                    Strong Subjects
                  </p>

                  <p className="font-semibold mt-1">
                    {student?.strong_subjects}
                  </p>

                </div>

                <div>

                  <p className="text-gray-500">
                    Weak Subjects
                  </p>

                  <p className="font-semibold mt-1">
                    {student?.weak_subjects}
                  </p>

                </div>

                <div>

                  <p className="text-gray-500">
                    Skills
                  </p>

                  <p className="font-semibold mt-1">
                    {student?.skills}
                  </p>

                </div>

              </div>

            </motion.div>

            {/* PROGRESS */}

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-md mt-8"
            >

              <h2 className="text-2xl font-bold">
                Weekly Progress
              </h2>

              <div className="mt-6">

                <div className="flex justify-between mb-2">

                  <span>Study Goal</span>

                  <span className="font-bold">
                    {stats.progress}%
                  </span>

                </div>

                <div className="w-full bg-gray-200 h-4 rounded-full">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.progress}%` }}
                    transition={{ duration: 1 }}
                    className="bg-blue-600 h-4 rounded-full"
                  ></motion.div>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;