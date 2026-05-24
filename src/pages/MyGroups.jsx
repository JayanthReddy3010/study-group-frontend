import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
function MyGroups() {

  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState({});
  const [tasks, setTasks] = useState({});
  const [progress, setProgress] = useState({});
  const [taskInput, setTaskInput] = useState({});

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {

    const fetchGroups = async () => {

      try {

        const res = await axios.get(
          `${API}/api/groups/my/${student.id}`
        );

        const groupsData = Array.isArray(res.data)
          ? res.data
          : [];

        setGroups(groupsData);

        // FETCH MEMBERS + TASKS + PROGRESS

        groupsData.forEach(async (group) => {

          try {

            // MEMBERS

            const memberRes = await axios.get(
              `${API}/api/groups/members/${group.id}`
            );

            setMembers((prev) => ({
              ...prev,
              [group.id]: memberRes.data
            }));

            // TASKS

            const taskRes = await axios.get(
              `${API}/api/groups/tasks/${group.id}`
            );

            setTasks((prev) => ({
              ...prev,
              [group.id]: taskRes.data
            }));

            // PROGRESS

            const progressRes = await axios.get(
              `${API}/api/groups/progress/${group.id}`
            );

            setProgress((prev) => ({
              ...prev,
              [group.id]: progressRes.data
            }));

          } catch (err) {

            console.log(err);
          }
        });

      } catch (err) {

        console.log(err);
      }
    };

    fetchGroups();

  }, []);

  // CREATE TASK

  const createTask = async (groupId) => {

    try {

      if (!taskInput[groupId]) return;

      await axios.post(
        `${API}/api/groups/task/create`,
        {
          group_id: groupId,
          task_title: taskInput[groupId]
        }
      );

      // REFRESH TASKS

      const taskRes = await axios.get(
        `${API}/api/groups/tasks/${groupId}`
      );

      setTasks((prev) => ({
        ...prev,
        [groupId]: taskRes.data
      }));

      // REFRESH PROGRESS

      const progressRes = await axios.get(
        `${API}/api/groups/progress/${groupId}`
      );

      setProgress((prev) => ({
        ...prev,
        [groupId]: progressRes.data
      }));

      // CLEAR INPUT

      setTaskInput((prev) => ({
        ...prev,
        [groupId]: ""
      }));

    } catch (err) {

      console.log(err);
    }
  };

  // TOGGLE TASK

  const toggleTask = async (
    taskId,
    groupId
  ) => {

    try {

      await axios.put(
        `${API}/api/groups/task/${taskId}`
      );

      // REFRESH TASKS

      const taskRes = await axios.get(
        `${API}/api/groups/tasks/${groupId}`
      );

      setTasks((prev) => ({
        ...prev,
        [groupId]: taskRes.data
      }));

      // REFRESH PROGRESS

      const progressRes = await axios.get(
        `${API}/api/groups/progress/${groupId}`
      );

      setProgress((prev) => ({
        ...prev,
        [groupId]: progressRes.data
      }));

    } catch (err) {

      console.log(err);
    }
  };

  // DELETE GROUP

  const deleteGroup = async (groupId) => {

    try {

      await axios.delete(
        `${API}/api/groups/${groupId}/${student.id}`
      );

      setGroups(
        groups.filter(
          (group) => group.id !== groupId
        )
      );

    } catch (err) {

      alert(
        err.response?.data ||
        "Delete Failed"
      );
    }
  };

  return (

  <div className="min-h-screen bg-gray-100">

    <Navbar />

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        My Groups
      </h1>

      {/* EMPTY STATE */}

      {groups.length === 0 ? (

        <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
            alt="empty"
            className="w-40 mx-auto"
          />

          <h2 className="text-3xl font-bold mt-8">
            No Groups Joined Yet
          </h2>

          <p className="text-gray-500 mt-4 text-lg">

            You have not joined any study groups.
            Explore groups and start collaborating.

          </p>

          <a
            href="/groups"
            className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition"
          >

            Explore Groups

          </a>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {Array.isArray(groups) &&
            groups.map((group) => (

            <div
              key={group.id}
              className="bg-white shadow-lg rounded-2xl p-6"
            >

              {/* GROUP HEADER */}

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-2xl font-bold">
                    {group.group_name}
                  </h2>

                  <p className="text-blue-600 mt-1">
                    {group.subject}
                  </p>

                </div>

                {group.created_by === student.id && (

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl text-sm">
                    Creator
                  </span>

                )}

              </div>

              {/* DESCRIPTION */}

              <p className="text-gray-600 mt-4">
                {group.description}
              </p>

              {/* MEMBERS */}

              <div className="mt-6">

                <h3 className="font-bold text-lg mb-3">
                  Members
                </h3>

                <div className="space-y-3">

                  {members[group.id]?.map((member) => (

                    <div
                      key={member.id}
                      className="bg-gray-100 rounded-xl p-3 flex justify-between items-center"
                    >

                      <div>

                        <p className="font-semibold">
                          {member.fullname}
                        </p>

                        <p className="text-sm text-gray-500">
                          {member.department}
                        </p>

                      </div>

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm">
                        {member.skills}
                      </span>

                    </div>
                  ))}

                </div>

              </div>

              {/* PROGRESS */}

              <div className="mt-8">

                <div className="flex justify-between mb-2">

                  <h3 className="font-bold">
                    Progress
                  </h3>

                  <span className="font-semibold text-blue-600">

                    {
                      progress[group.id]
                        ?.percentage || 0
                    }%

                  </span>

                </div>

                <div className="w-full bg-gray-200 h-4 rounded-full">

                  <div
                    className="bg-blue-600 h-4 rounded-full transition-all"
                    style={{
                      width: `${
                        progress[group.id]
                          ?.percentage || 0
                      }%`
                    }}
                  ></div>

                </div>

              </div>

              {/* ADD TASK */}

              <div className="mt-8 flex gap-3">

                <input
                  type="text"
                  placeholder="Add milestone..."
                  value={
                    taskInput[group.id] || ""
                  }
                  onChange={(e) =>
                    setTaskInput((prev) => ({
                      ...prev,
                      [group.id]:
                        e.target.value
                    }))
                  }
                  className="flex-1 border p-3 rounded-xl"
                />

                <button
                  onClick={() =>
                    createTask(group.id)
                  }
                  className="bg-blue-600 text-white px-5 rounded-xl"
                >

                  Add

                </button>

              </div>

              {/* TASKS */}

              <div className="mt-6 space-y-3">

                {tasks[group.id]?.map((task) => (

                  <div
                    key={task.id}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-xl"
                  >

                    <div className="flex items-center gap-3">

                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() =>
                          toggleTask(
                            task.id,
                            group.id
                          )
                        }
                      />

                      <p
                        className={
                          task.completed
                            ? "line-through text-gray-400"
                            : ""
                        }
                      >

                        {task.task_title}

                      </p>

                    </div>

                  </div>

                ))}

              </div>

              {/* FOOTER */}

              <div className="mt-6 flex justify-between items-center">

                <div className="flex gap-3">

                  <span className="bg-gray-100 px-4 py-2 rounded-xl">
                    {group.study_mode}
                  </span>

                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl">
                    Max: {group.max_members}
                  </span>

                </div>

                {group.created_by === student.id && (

                  <button
                    onClick={() =>
                      deleteGroup(group.id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                  >

                    Delete

                  </button>

                )}

              </div>

            </div>
          ))}

        </div>
      )}

    </div>

  </div>

);
}

export default MyGroups;