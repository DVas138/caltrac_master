// TODO: Find SVG icons for UserCircleIcon and PhotoIcon
// TODO: Filter out fields that are not needed
import { Form, json, Link, redirect, useLoaderData } from "react-router-dom";
import { useState } from "react";

// @ts-ignore
export async function load({ request, params }) {
  const response = await fetch("https://kigokido.onrender.com/user/", {
    method: "GET",
    headers: {
      Authorization: "bearer " + localStorage.getItem("userToken"),
    },
  });
  // const data = await response.json();
  console.log(response);
  if (response.ok) {
    return response;
  } else {
    throw json({
      status: 500,
      message: "Failed to fetch data about today.",
    });
  }
}
export async function action({ request }: { request: any }) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  console.log(intent);
  const data = Object.fromEntries(formData);
  if (intent == 1) {
    const response = await fetch("https://kigokido.onrender.com/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("userToken"),
      },
      body: JSON.stringify({
        ...data,
        age: parseInt(data.age),
        weight: parseInt(data.weight),
        height: parseInt(data.height),
        sex: parseInt(data.sex),
        calGoal: parseFloat(data.calGoal),
        activity: parseFloat(data.activity),
      }),
    });
    if (response.ok) {
      return redirect("/main/settings");
    } else {
      throw json({
        status: 500,
        message: "Failed to fetch data about today.",
      });
    }
  } else if (intent == 2) {
    const response = await fetch("http://localhost:8000/user", {
      method: "DELETE",
      headers: {
        Authorization: "bearer " + localStorage.getItem("userToken"),
      },
    });
    if (response.ok) {
      return redirect("/");
    } else {
      throw json({
        status: 500,
        message: "Failed to delete a user.",
      });
    }
  }
}
export default function Settings() {
  //TODO: IMPLEMENT BROWSER NATIVE BARCODE SCANNER
  // if (!("BarcodeDetector" in globalThis)) {
  //   console.log(
  //     "Barcode Detector is not supported by this browser.",
  //     globalThis,
  //   );
  // } else {
  //   console.log("Barcode Detector supported!");
  // }
  // console.log(useActionData());
  const data = useLoaderData();
  // @ts-ignore
  const [user, setUser] = useState<any>(data.data);
  return (
    <main className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500">
      <Form method="POST" className="w-11/12 m-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-4xl font-semibold leading-7 text-gray-50">
              Profile
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-bold font-medium leading-6 text-gray-50"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-xl shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={user.username}
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-50 placeholder:text-gray-50 focus:ring-orange-400 sm:text-bold sm:leading-6"
                      placeholder="Your Username"
                      onInput={(event) => {
                        setUser({
                          ...user,
                          username: event.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-bold font-medium leading-6 text-gray-50"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <div className="flex rounded-xl shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-50 placeholder:text-gray-50 focus:ring-orange-400 sm:text-bold sm:leading-6"
                      placeholder="Your Email Address"
                      value={user.email}
                      onInput={(event) => {
                        setUser({
                          ...user,
                          email: event.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="password"
                  className="block text-bold font-medium leading-6 text-gray-50"
                >
                  Password
                </label>
                <div className="mt-2">
                  <div className="flex rounded-xl shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="password"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-50 placeholder:text-gray-50 focus:ring-orange-400 sm:text-bold sm:leading-6"
                      placeholder="At least one Upper letter, Special Symbol, Number "
                      onInput={(event) => {
                        setUser({
                          ...user,
                          password: event.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="passwordRep"
                  className="block text-bold font-medium leading-6 text-gray-50"
                >
                  Again Password
                </label>
                <div className="mt-2">
                  <div className="flex rounded-xl shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="password"
                      name="passwordRep"
                      id="passwordRep"
                      autoComplete="passwordRep"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-50 placeholder:text-gray-50 focus:ring-orange-400 sm:text-bold sm:leading-6"
                      placeholder="At least one Upper letter, Special Symbol, Number "
                      onInput={(event) => {
                        setUser({
                          ...user,
                          passwordRep: event.currentTarget.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-50">
              Personal Information
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="age"
                  className="block text-bold font-medium leading-6 text-gray-50"
                >
                  Age
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="age"
                    id="age"
                    autoComplete="age"
                    placeholder="Greater than 12 years"
                    className="block w-full rounded-xl border-0 py-1.5 text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-50 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-bold sm:leading-6"
                    value={user.age}
                    onInput={(event) => {
                      setUser({
                        ...user,
                        age: event.currentTarget.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="weight"
                  className="block text-bold font-medium leading-6 text-gray-50"
                >
                  Weight (kg)
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    autoComplete="weight"
                    className="block w-full rounded-xl border-0 py-1.5 text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-50 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-bold sm:leading-6"
                    value={user.weight}
                    onInput={(event) => {
                      setUser({
                        ...user,
                        weight: event.currentTarget.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="height"
                  className="block text-bold font-medium leading-6 text-gray-50"
                >
                  Height (cm)
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="height"
                    id="height"
                    autoComplete="height"
                    className="block w-full rounded-xl border-0 py-1.5 text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-50 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-bold sm:leading-6"
                    value={user.height}
                    onInput={(event) => {
                      setUser({
                        ...user,
                        height: event.currentTarget.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="sex"
                  className="block text-bold font-medium leading-6 text-gray-50"
                >
                  Gender
                </label>
                <div className="mt-2">
                  <select
                    id="sex"
                    name="sex"
                    autoComplete="sex"
                    className="block w-full rounded-xl border-0 py-1.5 text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:max-w-xs sm:text-bold sm:leading-6"
                  >
                    <option value={1} selected={user.sex === 1}>
                      Male
                    </option>
                    <option value={2} selected={user.sex === 2}>
                      Female
                    </option>
                  </select>
                </div>
              </div>
              <fieldset>
                <legend className="text-base font-semibold leading-6 text-gray-50">
                  Weight Goals
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <label
                      htmlFor="maintain"
                      className="block text-bold font-medium leading-6 text-gray-50"
                    >
                      Maintain
                    </label>
                    <input
                      id="maintain"
                      name="calGoal"
                      value={0}
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-orange-600"
                    />
                  </div>
                  <div className="flex items-center gap-x-3">
                    <label
                      htmlFor="mildloss"
                      className="block text-bold font-medium leading-6 text-gray-50"
                    >
                      Mild Loss (0.25 kg/week)
                    </label>
                    <input
                      id="mildloss"
                      name="calGoal"
                      value={0.9}
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-orange-600"
                    />
                  </div>
                  <div className="flex items-center gap-x-3">
                    <label
                      htmlFor="loss"
                      className="block text-bold font-medium leading-6 text-gray-50"
                    >
                      Loss (0.5 kg/week)
                    </label>
                    <input
                      id="loss"
                      name="calGoal"
                      value={0.79}
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-orange-600"
                    />
                  </div>
                  <div className="flex items-center gap-x-3">
                    <label
                      htmlFor="extremeloss"
                      className="block text-bold font-medium leading-6 text-gray-50"
                    >
                      Extreme Loss (1 kg/week)
                    </label>
                    <input
                      id="extremeloss"
                      name="calGoal"
                      value={0.59}
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-orange-600"
                    />
                  </div>{" "}
                  <div className="flex items-center gap-x-3">
                    <label
                      htmlFor="mildgain"
                      className="block text-bold font-medium leading-6 text-gray-50"
                    >
                      Mild Gain (0.25 kg/week)
                    </label>
                    <input
                      id="mildgain"
                      name="calGoal"
                      value={1.1}
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-orange-600"
                    />
                  </div>
                  <div className="flex items-center gap-x-3">
                    <label
                      htmlFor="gain"
                      className="block text-bold font-medium leading-6 text-gray-50"
                    >
                      Gain (0.5 kg/week)
                    </label>
                    <input
                      id="gain"
                      name="calGoal"
                      value={1.21}
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-orange-600"
                    />
                  </div>
                  <div className="flex items-center gap-x-3">
                    <label
                      htmlFor="extremegain"
                      className="block text-bold font-medium leading-6 text-gray-50"
                    >
                      Extreme Gain (1 kg/week)
                    </label>
                    <input
                      id="extremegain"
                      name="calGoal"
                      value={1.41}
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-orange-600"
                    />
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <fieldset>
              <legend className="text-base font-semibold leading-6 text-gray-50">
                Activity Levels
              </legend>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <label
                    htmlFor="sedenatry"
                    className="block text-bold font-medium leading-6 text-gray-50"
                  >
                    Sedentary (no exercise)
                  </label>
                  <input
                    id="sedenatry"
                    name="activity"
                    value={1.2}
                    type="radio"
                    checked={user.activity === 1.2}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-orange-600"
                  />
                </div>
                <div className="flex items-center gap-x-3">
                  <label
                    htmlFor="lactivity"
                    className="block text-bold font-medium leading-6 text-gray-50"
                  >
                    Lightly active (1-3 days/week)
                  </label>
                  <input
                    id="lactivity"
                    name="activity"
                    value={1.375}
                    type="radio"
                    checked={user.activity === 1.375}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-orange-600"
                  />
                </div>
                <div className="flex items-center gap-x-3">
                  <label
                    htmlFor="mactivity"
                    className="block text-bold font-medium leading-6 text-gray-50"
                  >
                    Moderately active (3-5 days/week)
                  </label>
                  <input
                    id="mactivity"
                    name="activity"
                    value={1.55}
                    type="radio"
                    checked={user.activity === 1.55}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-orange-600"
                  />
                </div>
                <div className="flex items-center gap-x-3">
                  <label
                    htmlFor="vactivity"
                    className="block text-bold font-medium leading-6 text-gray-50"
                  >
                    Active (6-7 days/week)
                  </label>
                  <input
                    id="vactivity"
                    name="calGoal"
                    value={1.725}
                    type="radio"
                    checked={user.activity === 1.725}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-orange-600"
                  />
                </div>{" "}
                <div className="flex items-center gap-x-3">
                  <label
                    htmlFor="eactivity"
                    className="block text-bold font-medium leading-6 text-gray-50"
                  >
                    Very active (hard exercise 6–7 days/week)
                  </label>
                  <input
                    id="eactivity"
                    name="calGoal"
                    value={1.9}
                    type="radio"
                    checked={user.activity === 1.9}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-orange-600"
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div className="my-6 mx-auto flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="rounded-xl bg-red-500 px-3 py-2 text-bold font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            <Link to="/main/today">Cancel</Link>
          </button>
          <button
            name="intent"
            value={1}
            type="submit"
            className="rounded-xl bg-lime-300 px-3 py-2 text-bold font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            Save
          </button>
          <button
            name="intent"
            value={2}
            type="submit"
            className="rounded-xl justify-self-center bg-red-500 px-3 py-2 text-bold font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            Delete
          </button>
        </div>
      </Form>
    </main>
  );
}
