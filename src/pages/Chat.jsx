import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import socket from "../socket";
import { MessageCircle } from "lucide-react";

function Chat() {

  const [groupId, setGroupId] = useState("1");

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [unread, setUnread] = useState(0);

  const messagesEndRef = useRef(null);

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  /* JOIN ROOM */

  useEffect(() => {

    socket.emit("join_room", groupId);

  }, [groupId]);

  /* RECEIVE MESSAGE */

  useEffect(() => {

    const receiveHandler = (data) => {

      setMessages((prev) => {

        const alreadyExists = prev.some(
          (msg) =>
            msg.message === data.message &&
            msg.author === data.author &&
            msg.time === data.time
        );

        if (alreadyExists) {
          return prev;
        }

        return [...prev, data];
      });

      if (data.author !== student?.fullname) {
        setUnread((prev) => prev + 1);
      }
    };

    socket.off("receive_message");

    socket.on(
      "receive_message",
      receiveHandler
    );

    return () => {
      socket.off(
        "receive_message",
        receiveHandler
      );
    };

  }, [student]);

  /* AUTO SCROLL */

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);

  /* SEND MESSAGE */

  const sendMessage = async () => {

    if (message.trim() === "") return;

    const messageData = {

      room: groupId,

      author:
        student?.fullname || student?.email,

      message: message,

      time:
        new Date().getHours() +
        ":" +
        String(new Date().getMinutes()).padStart(2, "0")

    };

    socket.emit(
      "send_message",
      messageData
    );

    setMessage("");
  };

  /* ENTER KEY */

  const handleKeyPress = (e) => {

    if (e.key === "Enter") {

      sendMessage();

    }
  };

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-4">

        <div className="flex justify-between items-center">

          <h1 className="text-4xl font-bold">
            Group Chat
          </h1>

          <div className="relative">

            <MessageCircle size={34} />

            {
              unread > 0 && (

                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">

                  {unread}

                </span>

              )
            }

          </div>

        </div>

        <div className="bg-white h-[550px] rounded-3xl shadow-lg mt-8 p-6 overflow-y-auto">

          {
            messages.length === 0 && (

              <div className="flex items-center justify-center h-full text-gray-400 text-lg">

                No messages yet

              </div>

            )
          }

          {
            messages.map((msg, index) => (

              <div
                key={index}
                className={`mb-5 flex ${
                  msg.author ===
                  (student?.fullname || student?.email)
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${
                    msg.author ===
                    (student?.fullname || student?.email)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
                >

                  <p className="font-bold text-sm">
                    {msg.author}
                  </p>

                  <p className="mt-1 break-words">
                    {msg.message}
                  </p>

                  <p
                    className={`text-xs mt-2 ${
                      msg.author ===
                      (student?.fullname || student?.email)
                        ? "text-blue-100"
                        : "text-gray-400"
                    }`}
                  >

                    {msg.time}

                  </p>

                </div>

              </div>

            ))
          }

          <div ref={messagesEndRef}></div>

        </div>

        <div className="flex gap-4 mt-6">

          <input
            type="text"
            placeholder="Type message..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={handleKeyPress}
            className="flex-1 p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-2xl font-semibold transition"
          >

            Send

          </button>

        </div>

      </div>

    </div>
  );
}

export default Chat;