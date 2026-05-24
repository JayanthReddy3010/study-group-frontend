import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";

import axios from "axios";

function Progress() {

  const [title, setTitle] = useState("");

  const [milestones, setMilestones] = useState([]);

  const groupId = 1;

  const fetchMilestones = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/milestones/${groupId}`
      );

      setMilestones(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMilestones();
  }, []);

  const addMilestone = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/milestones/create",
        {
          group_id: groupId,
          title,
        }
      );

      setTitle("");

      fetchMilestones();

    } catch (err) {
      console.log(err);
    }
  };

  const completeMilestone = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/milestones/complete/${id}`
      );

      fetchMilestones();

    } catch (err) {
      console.log(err);
    }
  };

  const completedCount = milestones.filter(
    (m) => m.status === "Completed"
  ).length;

  const progressPercentage =
    milestones.length > 0
      ? (completedCount / milestones.length) * 100
      : 0;

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-5xl mx-auto py-10">

        <h1 className="text-4xl font-bold">
          Group Progress Tracker
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-md mt-8">

          <div className="flex justify-between mb-3">

            <span className="font-semibold">
              Progress
            </span>

            <span className="text-blue-600 font-bold">
              {Math.round(progressPercentage)}%
            </span>

          </div>

          <div className="w-full bg-gray-200 h-5 rounded-full">

            <div
              className="bg-blue-600 h-5 rounded-full"
              style={{
                width: `${progressPercentage}%`,
              }}
            ></div>

          </div>

        </div>

        <form
          onSubmit={addMilestone}
          className="bg-white p-6 rounded-2xl shadow-md mt-8 flex gap-4"
        >

          <input
            type="text"
            placeholder="Add Milestone"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="flex-1 p-4 border rounded-xl"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-8 rounded-xl"
          >
            Add
          </button>

        </form>

        <div className="grid gap-6 mt-10">

          {milestones.map((milestone) => (

            <div
              key={milestone.id}
              className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center"
            >

              <div>

                <h2 className="text-xl font-bold">
                  {milestone.title}
                </h2>

                <p
                  className={`mt-2 ${
                    milestone.status === "Completed"
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}
                >
                  {milestone.status}
                </p>

              </div>

              {milestone.status !== "Completed" && (

                <button
                  onClick={() =>
                    completeMilestone(milestone.id)
                  }
                  className="bg-green-600 text-white px-5 py-2 rounded-lg"
                >
                  Complete
                </button>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Progress;