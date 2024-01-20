import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { ChatContext } from "../../context/ChatContext";
import { PropertyHandlingContext } from "../../context/PropertyHandlingContext";
import "./css/chats.css";
import { decodeToken } from "react-jwt";
import { TRANSACTION } from "../../utils/messageType";
import Modal from "../Modal";
import {
  FaArrowCircleLeft,
  FaEthereum,
  FaUserSlash,
  FaUserPlus,
  FaHome,
  FaUser,
} from "react-icons/fa";
import Tooltip from "@material-ui/core/Tooltip";
import DecoratedButton from "../../shared-components/DecoratedButton";

export default function Chat() {
  const { id } = useParams();
  const { loadMessages, sendMessage } = useContext(ChatContext);
  const { token } = useContext(AuthenticationContext);
  const { acceptTenant, makePayment, removeTenant, connectedAccount } =
    useContext(PropertyHandlingContext);

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [userId, setUserId] = useState("");

  // To get info about user we are chating with
  const { state } = useLocation();

  useEffect(async () => {
    const data = await loadMessages(id);
    setResponse(data);
    if (token) {
      const userId = decodeToken(token);
      setUserId(userId._id.toString());
    }
  }, []);

  return (
    <>
      {response && (
        <div className="grid grid-cols-1 px-10">
          <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen bg-white rounded drop-shadow-md">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
              <div className="flex items-center space-x-4">
                <Link to="/chats">
                  <FaArrowCircleLeft size={25} />{" "}
                </Link>
                <FaUser className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
                <div className="flex flex-col leading-tight">
                  <div className="text-2xl mt-1 flex items-center">
                    <span className="text-gray-700 mr-3">
                      {state.user[0].name}
                    </span>
                    <span className="text-green-500">
                      <svg width="10" height="10">
                        <circle
                          cx="5"
                          cy="5"
                          r="5"
                          fill="currentColor"
                        ></circle>
                      </svg>
                    </span>
                  </div>
                  <span className="text-lg text-gray-600">
                    {state.user[0].email}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <FaHome size={50} />
                <Link to={`/property/${response.property._id}`}>
                  <div className="flex flex-col leading-tight">
                    <div className="text-2xl mt-1 flex items-center">
                      <span className="text-gray-700 mr-3">
                        {response.property.name}
                      </span>
                    </div>
                    <span className="text-lg text-gray-600">
                      {response.property.address}
                    </span>
                  </div>
                </Link>
              </div>

              <div className="flex items-center space-x-2">
                {parseInt(response.property.tenant) ==
                  parseInt(connectedAccount) && (
                  <DecoratedButton
                    clickFunction={() => makePayment(response.property, id)}
                    className={
                      "inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                    }
                  >
                    <Tooltip title="Pay">
                      <p>
                        <FaEthereum size={30} />
                      </p>
                    </Tooltip>
                  </DecoratedButton>
                )}

                <TenantStatusFactory
                  response={response}
                  state={state}
                  userId={userId}
                  removeTenant={removeTenant}
                  acceptTenant={acceptTenant}
                />
              </div>
            </div>

            <div
              id="messages"
              className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
            >
              {response.data.messages.map((message) => (
                <MessageDisplayFactory message={message} userId={userId} />
              ))}
            </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
              <div className="relative flex">
                <span className="absolute inset-y-0 flex items-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      ></path>
                    </svg>
                  </button>
                </span>
                <input
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  type="text"
                  placeholder="Write Something"
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
                />
                <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                  <DecoratedButton
                    clickFunction={() => {
                      sendMessage(id, message);
                      setMessage("");
                    }}
                    className={
                      "inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-6 w-6 transform rotate-90"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  </DecoratedButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// * FACTORY PATTERN
function TenantStatusFactory({
  response,
  state,
  userId,
  acceptTenant,
  removeTenant,
}) {
  let condition1 =
    response.property.userId == userId &&
    parseInt(response.property.tenant) == 0;
  let condition2 =
    response.property.userId == userId &&
    parseInt(response.property.tenant) != 0;
  let className =
    "inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none";
  if (condition1) {
    return (
      <DecoratedButton
        className={className}
        clickFunction={() =>
          acceptTenant(
            state.user[0].etherAccount,
            response.property.propertyCount
          )
        }
      >
        <Tooltip title={"Accept Tenant"}>
          <p>
            <FaUserPlus size={30} />
          </p>
        </Tooltip>
      </DecoratedButton>
    );
  } else if (condition2) {
    return (
      <DecoratedButton
        clickFunction={() => removeTenant(response.property.propertyCount)}
        type="button"
        className={className}
      >
        <Tooltip title={"Remove Tenant"}>
          <p>
            <FaUserSlash size={30} />
          </p>
        </Tooltip>
      </DecoratedButton>
    );
  } else {
    return <></>;
  }
}

function MessageDisplayFactory({ message, userId }) {
  let condition1 = message.messageType == TRANSACTION;
  let condition2 = message.senderId != userId;

  if (condition1) {
    return <Modal message={message} />;
  } else if (condition2) {
    return (
      <div className="chat-message">
        <div className="flex items-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                {message.message}
              </span>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            className="w-6 h-6 rounded-full order-1"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="chat-message">
        <div className="flex items-end justify-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                {message.message}
              </span>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            className="w-6 h-6 rounded-full order-2"
          />
        </div>
      </div>
    );
  }
}
