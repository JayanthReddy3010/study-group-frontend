import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import axios from "axios";

function Notes() {

  const [title, setTitle] = useState("");

  const [file, setFile] = useState(null);

  const [notes, setNotes] = useState([]);

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  const groupId = 1;

  const fetchNotes = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/notes/${groupId}`
      );

      setNotes(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleUpload = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("file", file);
    formData.append("uploaded_by", student.id);
    formData.append("group_id", groupId);

    try {

      await axios.post(
        "http://localhost:5000/api/notes/upload",
        formData
      );

      toast.success("Note Uploaded Successfully");

      fetchNotes();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-5xl mx-auto py-10">

        <h1 className="text-4xl font-bold">
          Shared Notes
        </h1>

        <form
          onSubmit={handleUpload}
          className="bg-white p-6 rounded-2xl shadow-md mt-8 flex flex-col gap-6"
        >

          <input
            type="text"
            placeholder="Note Title"
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="p-4 border rounded-xl"
          />

          <input
            type="file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            className="p-4 border rounded-xl"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-4 rounded-xl"
          >
            Upload Note
          </button>

        </form>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {notes.map((note) => (

            <div
              key={note.id}
              className="bg-white p-6 rounded-2xl shadow-md"
            >

              <h2 className="text-2xl font-bold">
                {note.title}
              </h2>

              <a
                href={`http://localhost:5000/uploads/${note.file_url}`}
                target="_blank"
                className="text-blue-600 mt-4 inline-block"
              >
                Download Note
              </a>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Notes;