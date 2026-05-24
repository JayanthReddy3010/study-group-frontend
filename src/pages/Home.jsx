import Navbar from "../components/Navbar";

import { motion } from "framer-motion";

import {
  Users,
  Brain,
  MessageCircle,
  Calendar,
  BookOpen,
  Target,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";

function Home() {

  const API = import.meta.env.VITE_API_URL;

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalGroups: 0,
    totalNotes: 0
  });

  useEffect(() => {

    const fetchHomeStats = async () => {

      try {

        const res = await axios.get(
          `${API}/api/groups/home-stats`
        );

        setStats(res.data);

      } catch (err) {

        console.log(err);
      }
    };

    fetchHomeStats();

  }, []);

  const features = [
    {
      icon: Users,
      title: "Smart Study Groups",
      description:
        "Create and join study groups based on subjects, interests, and academic goals.",
    },
    {
      icon: Brain,
      title: "AI Matching System",
      description:
        "AI-powered recommendations help students find the perfect study partners.",
    },
    {
      icon: MessageCircle,
      title: "Real-Time Chat",
      description:
        "Collaborate instantly with live group chat powered by Socket.io.",
    },
    {
      icon: Calendar,
      title: "Session Scheduling",
      description:
        "Schedule study sessions and manage group availability efficiently.",
    },
    {
      icon: BookOpen,
      title: "Shared Notes",
      description:
        "Upload and access shared notes, PDFs, and learning resources.",
    },
    {
      icon: Target,
      title: "Progress Tracking",
      description:
        "Track milestones, goals, and study progress collaboratively.",
    },
  ];

  return (

    <div className="min-h-screen bg-gray-50 overflow-hidden">

      <Navbar />

      {/* HERO SECTION */}

      <section className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="inline-block bg-white/10 px-5 py-2 rounded-full text-sm backdrop-blur-md mb-8">

              AI-Powered Student Collaboration Platform

            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">

              Find Your Perfect

              <span className="block text-blue-200 mt-2">
                Study Group
              </span>

            </h1>

            <p className="mt-8 text-lg text-blue-100 leading-8 max-w-2xl">

              Collaborate smarter with AI-based group matching,
              real-time communication, shared notes,
              scheduling tools, and progress tracking.

            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/register"
                className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition duration-300"
              >

                Get Started

              </Link>

              <Link
                to="/groups"
                className="bg-blue-500/30 border border-white/20 backdrop-blur-md px-8 py-4 rounded-2xl font-semibold hover:bg-blue-500/50 transition"
              >

                Explore Groups

              </Link>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">

              <div className="grid grid-cols-2 gap-6">

                {/* REAL USERS */}

                <div className="bg-white/10 rounded-2xl p-6">

                  <h2 className="text-4xl font-bold">
                    {stats.totalUsers}+
                  </h2>

                  <p className="mt-2 text-blue-100">
                    Active Students
                  </p>

                </div>

                {/* REAL GROUPS */}

                <div className="bg-white/10 rounded-2xl p-6">

                  <h2 className="text-4xl font-bold">
                    {stats.totalGroups}+
                  </h2>

                  <p className="mt-2 text-blue-100">
                    Study Groups
                  </p>

                </div>

                {/* REAL NOTES */}

                <div className="bg-white/10 rounded-2xl p-6">

                  <h2 className="text-4xl font-bold">
                    {stats.totalNotes}+
                  </h2>

                  <p className="mt-2 text-blue-100">
                    Shared Notes
                  </p>

                </div>

                {/* AI */}

                <div className="bg-white/10 rounded-2xl p-6">

                  <h2 className="text-4xl font-bold">
                    AI
                  </h2>

                  <p className="mt-2 text-blue-100">
                    Smart Matching
                  </p>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center">

          <h2 className="text-5xl font-bold text-gray-900">

            Powerful Features

          </h2>

          <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg">

            Everything students need to collaborate,
            learn, and succeed together.

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 border border-gray-100"
              >

                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center">

                  <Icon
                    className="text-blue-600"
                    size={32}
                  />

                </div>

                <h3 className="text-2xl font-bold mt-8">

                  {feature.title}

                </h3>

                <p className="text-gray-500 mt-5 leading-8">

                  {feature.description}

                </p>

              </motion.div>
            );
          })}

        </div>

      </section>

      {/* CTA SECTION */}

      <section className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white py-24 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-5xl font-bold">

            Start Collaborating Today

          </h2>

          <p className="mt-8 text-xl text-blue-100 leading-8">

            Join the next generation of collaborative
            learning with AI-powered study groups.

          </p>

          <Link
            to="/register"
            className="inline-block mt-10 bg-white text-blue-700 px-10 py-5 rounded-2xl font-bold hover:scale-105 transition"
          >

            Create Free Account

          </Link>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-gray-900 text-gray-300 py-10">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5">

          <h2 className="text-2xl font-bold text-white">

            StudyGroup Finder

          </h2>

          <p className="text-gray-400">

            © 2026 StudyGroup Finder. Built for collaborative learning.

          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;