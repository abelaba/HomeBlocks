import { TransactionContext } from "../context/TransactionContext";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";

export default function SignUp() {
  const { connectedAccount } = useContext(TransactionContext);
  const { register } = useContext(AuthenticationContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <img
            class="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
            Sign up for an account
          </h2>
        </div>
        <form class="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="ethAccount" class="sr-only">
                Ethereum Account
              </label>
              <input
                value={connectedAccount}
                disabled
                id="ethAccount"
                name="ethAccount"
                type="text"
                required
                class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10  my-2 text-base"
                placeholder="No ethereum account"
              />
            </div>
            <div>
              <label for="full-name" class="sr-only">
                Full Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                id="full-name"
                name="fullname"
                type="text"
                required
                class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10  my-2 text-base"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label for="email-address" class="sr-only">
                Email address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email-address"
                name="email"
                type="email"
                required
                class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10  my-2 text-base"
                placeholder="Email address"
              />
            </div>
            <div>
              <label for="password" class="sr-only">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                required
                class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10  my-2 text-base"
                placeholder="Password"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            {/* <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div> */}

            {/* <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div> */}
          </div>

          <div>
            <button
              disabled={!connectedAccount}
              onClick={(e) => {
                register(e, name, email, password, connectedAccount);
              }}
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
