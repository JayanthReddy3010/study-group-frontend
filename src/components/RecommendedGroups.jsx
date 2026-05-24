import { useEffect, useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

function RecommendedGroups() {

  const [groups, setGroups] = useState([]);

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  const fetchRecommendations = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/groups/recommend/${student.id}`
      );

      setGroups(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div>

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-3xl font-bold text-gray-800">
            AI Recommended Groups
          </h2>

          <p className="text-gray-500 mt-2">
            Smart recommendations based on your
            skills, subjects, and preferences.
          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        {groups.length === 0 ? (

          <div className="bg-gray-50 border rounded-2xl p-8">

            <h3 className="text-xl font-semibold">
              No matching groups found
            </h3>

            <p className="text-gray-500 mt-2">
              Try updating your subjects and skills.
            </p>

          </div>

        ) : (

          groups.map((group, index) => (

            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
              }}
              className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 p-6 rounded-3xl shadow-md hover:shadow-xl transition"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="text-2xl font-bold">
                    {group.group_name}
                  </h3>

                  <p className="text-blue-600 mt-2 font-medium">
                    {group.subject}
                  </p>

                </div>

                <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold">

                  {group.compatibilityScore}% Match

                </div>

              </div>

              <p className="mt-5 text-gray-600 leading-7">
                {group.description}
              </p>

              <div className="flex justify-between items-center mt-6">

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium">

                  {group.study_mode}

                </span>

                <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-xl">

                  Join Group

                </button>

              </div>

            </motion.div>
          ))
        )}

      </div>

    </div>
  );
}

export default RecommendedGroups;