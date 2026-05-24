import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { Menu, X, GraduationCap } from "lucide-react";

function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("student");

    navigate("/login");
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div className="bg-blue-600 p-2 rounded-xl">

            <GraduationCap
              className="text-white"
              size={26}
            />

          </div>

          <div>

            <h1 className="text-2xl font-bold text-gray-900">

              StudyGroup

            </h1>

            <p className="text-xs text-gray-500">

              AI Learning Platform

            </p>

          </div>

        </Link>

        {/* DESKTOP MENU */}

        <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">

          <Link
            to="/dashboard"
            className="hover:text-blue-600 transition"
          >
            Dashboard
          </Link>
          <Link
  to="/my-groups"
  className="hover:text-blue-600 transition"
>
  My Groups
</Link>
          <Link
            to="/groups"
            className="hover:text-blue-600 transition"
          >
            Groups
          </Link>

          <Link
            to="/chat"
            className="hover:text-blue-600 transition"
          >
            Chat
          </Link>

          <Link
            to="/notes"
            className="hover:text-blue-600 transition"
          >
            Notes
          </Link>

          <Link
            to="/schedule"
            className="hover:text-blue-600 transition"
          >
            Schedule
          </Link>

          <Link
            to="/progress"
            className="hover:text-blue-600 transition"
          >
            Progress
          </Link>
          <Link to="/profile">
  Profile
</Link>
          {!token ? (

            <div className="flex gap-4">

              <Link
                to="/login"
                className="hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
              >
                Register
              </Link>

            </div>

          ) : (

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
            >
              Logout
            </button>

          )}

        </div>

        {/* MOBILE BUTTON */}

        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="md:hidden"
        >

          {menuOpen ? (
            <X size={30} />
          ) : (
            <Menu size={30} />
          )}

        </button>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5 shadow-lg">

          <Link
            to="/dashboard"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Dashboard
          </Link>
            
          <Link
            to="/groups"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Groups
          </Link>

          <Link
            to="/chat"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Chat
          </Link>

          <Link
            to="/notes"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Notes
          </Link>

          <Link
            to="/schedule"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Schedule
          </Link>

          <Link
            to="/progress"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Progress
          </Link>

          {!token ? (

            <>
              <Link
                to="/login"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="bg-blue-600 text-white px-5 py-3 rounded-xl text-center"
              >
                Register
              </Link>
            </>

          ) : (

            <button
              onClick={logout}
              className="bg-red-500 text-white px-5 py-3 rounded-xl"
            >
              Logout
            </button>

          )}

        </div>

      )}

    </nav>
  );
}

export default Navbar;