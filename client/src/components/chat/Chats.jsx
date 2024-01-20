import { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChatContext } from "../../context/ChatContext";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import "./css/chats.css";
import { decodeToken } from "react-jwt";
import { FaUser } from "react-icons/fa";
import { TRANSACTION } from "../../utils/messageType";
import { BiChat } from "react-icons/bi";
export default function Chats() {
  const { token } = useContext(AuthenticationContext);

  const [userId, setUserId] = useState("");
  const [chats, setChats] = useState("");

  const { loadChats } = useContext(ChatContext);

  const navigate = useNavigate();

  useEffect(async () => {
    setChats(await loadChats());
    if (token) {
      const userId = decodeToken(token);
      setUserId(userId._id);
    }
  }, [loadChats, userId]);

  return (
    <>
      {chats && userId && (
        <div className="flex-1 p:2 sm:p-6 justify-self-start flex flex-col h-screen bg-white mx-10 rounded drop-shadow-md">
          <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
            <div className="flex items-center space-x-4">
              <BiChat size={50} />
              <div className="flex flex-col leading-tight">
                <div className="text-2xl mt-1 flex items-center">
                  <span className="text-gray-700 mr-3">Chats</span>
                </div>
              </div>
            </div>
          </div>
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            {chats.map((chat, idx) => {
              const user = chat.users.filter((user) => {
                if (user._id != userId) return user;
              });
              return (
                <button
                  key={idx}
                  onClick={() =>
                    navigate(`/chat/${chat._id}`, { state: { user: user } })
                  }
                >
                  <div className="chat-message">
                    <div className="flex items-end">
                      <div className="flex flex-col space-y-2  max-w-xs mx-2 order-2 items-start">
                        <div>
                          <span className="flex flex-col w-96 h-30 px-4 py-2 rounded inline-block bg-gray-800 text-white items-start">
                            <p className="font-bold text-m">{user[0].name}</p>
                            {chat.messages.length > 0 && (
                              <p className="font-light text-s overflow-hidden">
                                {chat.messages[chat.messages.length - 1]
                                  .messageType == TRANSACTION
                                  ? "PAYMENT INFO"
                                  : chat.messages[chat.messages.length - 1]
                                      .message}
                              </p>
                            )}
                          </span>
                        </div>
                      </div>
                      <FaUser className="order-1" size={60} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
