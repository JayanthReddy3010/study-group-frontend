import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Schedule() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sessions, setSessions] = useState([]);

  const student = JSON.parse(localStorage.getItem("student"));
  const groupId = 1;

  // GET SCHEDULES
  const fetchSchedules = async () => {
    try {
      const res = await axios.get(
        `https://study-group-backend-b1kf.onrender.com/api/schedules/${groupId}`
      );
      setSessions(res.data);
    } catch (err) {
      console.log("Fetch error:", err.message);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // CREATE SCHEDULE
  const createSchedule = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://study-group-backend-b1kf.onrender.com/api/schedules/create",
        {
          group_id: groupId,
          title: title,
          session_date: date,
          session_time: time,
        }
      );

      toast.success("Session Scheduled");

      setTitle("");
      setDate("");
      setTime("");

      fetchSchedules();
    } catch (err) {
      console.log("Create error:", err.message);
      toast.error("Error creating schedule");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto py-10">
        <h1 className="text-4xl font-bold">Study Sessions</h1>

        {/* FORM */}
        <form
          onSubmit={createSchedule}
          className="bg-white p-6 rounded-2xl shadow-md mt-8 grid gap-6"
        >
          <input
            type="text"
            placeholder="Session Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-4 border rounded-xl"
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-4 border rounded-xl"
            required
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-4 border rounded-xl"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-4 rounded-xl"
          >
            Schedule Session
          </button>
        </form>

        {/* LIST */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white p-6 rounded-2xl shadow-md"
            >
              <h2 className="text-2xl font-bold">
                {session.title}
              </h2>

              <p className="mt-3 text-gray-600">
                📅 {session.session_date}
              </p>

              <p className="mt-2 text-blue-600">
                ⏰ {session.session_time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Schedule;