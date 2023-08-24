import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { TransactionContext } from "../context/TransactionContext";
import { ChatContext } from "../context/ChatContext";
import { PropertyHandlingContext } from "../context/PropertyHandlingContext";
import "./css/chats.css";
import { decodeToken } from "react-jwt";
import { TRANSACTION } from "../utils/messageType";
import Modal from "./Modal";
import {
  FaArrowCircleLeft,
  FaEthereum,
  FaUserSlash,
  FaUserPlus,
  FaHome,
  FaUser,
} from "react-icons/fa";
import Tooltip from "@material-ui/core/Tooltip";
import DecoratedButton from "../patterns/DecoratedButton";

export default function Chat() {
  const { id } = useParams();
  const { loadMessages, sendMessage } = useContext(ChatContext);
  const { token } = useContext(AuthenticationContext);
  const { sendTransaction } = useContext(TransactionContext);
  const { acceptTenant, makePayment, removeTenant, connectedAccount } =
    useContext(PropertyHandlingContext);

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [userId, setUserId] = useState("");

  // To get info about user we are chating with
  const { state } = useLocation();

  useEffect(async () => {
    setResponse(await loadMessages(id));

    if (token) {
      const userId = decodeToken(token);
      setUserId(userId._id);
    }
  }, []);
  console.log(response);

  return (
    <>
      {response && (
        <div className="grid grid-cols-1 px-10">
          <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen bg-white rounded drop-shadow-md">
            <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
              <div class="flex items-center space-x-4">
                <Link to="/chats">
                  <FaArrowCircleLeft size={25} />{" "}
                </Link>
                <FaUser class="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
                <div class="flex flex-col leading-tight">
                  <div class="text-2xl mt-1 flex items-center">
                    <span class="text-gray-700 mr-3">{state.user[0].name}</span>
                    <span class="text-green-500">
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
                  <span class="text-lg text-gray-600">
                    {state.user[0].email}
                  </span>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <FaHome size={50} />
                <Link to={`/property/${response.property.propertyCount}`}>
                  <div class="flex flex-col leading-tight">
                    <div class="text-2xl mt-1 flex items-center">
                      <span class="text-gray-700 mr-3">
                        {response.property.name}
                      </span>
                    </div>
                    <span class="text-lg text-gray-600">
                      {response.property.address}
                    </span>
                  </div>
                </Link>
              </div>

              <div class="flex items-center space-x-2">
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
              class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
            >
              {response.data.messages.map((message) => (
                <MessageDisplayFactory message={message} userId={userId} />
              ))}

              {/*
                            <div class="chat-message">
                                    <div class="flex items-end">
                                        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                        <div><span class="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">I get the same error on Arch Linux (also with sudo)</span></div>
                                        <div><span class="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">I also have this issue, Here is what I was doing until now: #1076</span></div>
                                        <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">even i am facing</span></div>
                                        </div>
                                        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-1"/>
                                    </div>
                            </div> */}
            </div>
            <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
              <div class="relative flex">
                <span class="absolute inset-y-0 flex items-center">
                  <button
                    type="button"
                    class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="h-6 w-6 text-gray-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
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
                  class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
                />
                <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
                  {/* <button type="button" class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-600">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                                    </svg>
                                    </button>
                                    <button type="button" class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-600">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    </button>
                                    <button type="button" class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-600">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    </button> */}
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
                      class="h-6 w-6 transform rotate-90"
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
      <div class="chat-message">
        <div class="flex items-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                {message.message}
              </span>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            class="w-6 h-6 rounded-full order-1"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div class="chat-message">
        <div class="flex items-end justify-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
              <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                {message.message}
              </span>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            class="w-6 h-6 rounded-full order-2"
          />
        </div>
      </div>
    );
  }
}
