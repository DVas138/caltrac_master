import { Form, json, Link, redirect } from "react-router-dom";

export async function logoutUser() {
  console.log(localStorage.getItem("userToken"));
  localStorage.removeItem("userToken");
  return redirect("/");
}

export async function action({ request }: { request: any }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch("http://localhost:8000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("userToken", data.data.token);
    return redirect("/main/today");
  } else {
    throw json({ error: "Invalid email or password" }, { status: 401 });
  }
}
export default function LogIn() {
  return (
    <>
      <div className="flex h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto scale-[2]"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2741f3981513f9944f06280c7390a0eee43fbd44a9aa5942a3426c86783e66a0?apiKey=ea474bbdb6aa47209952665d35262dd2&"
            alt="KIDOKIGO Logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </Form>
          {/*TODO: Add Link to Register*/}
          <p className="mt-10 text-center text-sm text-gray-700">
            Not a member?
            <Link
              to="/register"
              className="font-semibold leading-6 text-gray-900 hover:text-indigo-500 ml-2"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
