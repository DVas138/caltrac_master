import FoodCard from "./FoodCard.tsx";
// import VideoInput from "./VideoInput.tsx";
import ViewFinder from "./ViewFInder.tsx";
import { useState } from "react";
import ManualInput from "./ManualInpt.tsx";
import { json, redirect, useSubmit } from "react-router-dom";
import imgURL from "../../../public/food_cover.svg";

export type Food = {
  name: string;
  calories: number;
  img?: string;
  amount: number;
  barcode: number;
};

export async function action({ request }: { request: Request }) {
  const data = await request.json();

  // const formData = await request.formData();
  // const data = Object.fromEntries(formData);
  const response = await fetch("http://localhost:8000/food", {
    method: "POST",
    headers: {
      Authorization: "bearer " + localStorage.getItem("userToken"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
    }),
  });
  if (response.ok) {
    return redirect("/main/today");
  } else {
    throw json({
      status: 500,
      message: "Failed to fetch data about today.",
    });
  }
}

export default function InputFood() {
  //TODO: Add State for Scanned Food it will be and array of objects and it will be updated by the answer from the scan data
  // request. State would be initialized form the today document if it exists.
  const [scannedFood, setScannedFood] = useState<Food[]>([]);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<"scan" | "manual">("scan");
  const [card, setCard] = useState<Food>({
    name: "",
    calories: 0,
    img: "",
    amount: 0,
    barcode: 0,
  });
  const [type, setType] = useState<"day" | "recipe">("day");
  const [recipe, setRecipe] = useState<{ name: string; servings: number }>({
    name: "",
    servings: 0,
  });
  const [weight, setWeight] = useState<number>(0);
  const submit = useSubmit();
  // console.log(scannedFood);
  // console.log(card);
  function filterFood(food: string) {
    setScannedFood(scannedFood.filter((item) => item.name !== food));
  }
  return (
    <main className="flex flex-row gap-5 justify-between mx-auto bg-gradient-to-r from-purple-500 to-pink-500 w-screen ">
      <section className="flex flex-col justify-between items-center m-auto h-full lg:min-w-[1000px]">
        {type === "recipe" ? (
          <div className="mb-4">
            <label
              htmlFor="recipe"
              className="block text-bold text-center font-medium leading-6 text-gray-50"
            >
              Recipe Name
            </label>
            <div className="mt-2">
              <input
                id="recipe"
                name="recipe"
                type="text"
                autoComplete="number"
                value={recipe.name}
                className="block w-full rounded-xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                onInput={(e) => {
                  setRecipe({ ...recipe, name: e.currentTarget.value });
                }}
              />
            </div>
          </div>
        ) : null}
        <article className="flex flex-row items-center px-4 pt-3.5 pb-7 mb-16 w-fit rounded-2xl shadow-sm backdrop-blur-[2px] bg-white bg-opacity-70 ">
          <button
            className="size-fit px-10 mr-3.5 bg-orange-400 text-gray-50 hover:bg-orange-200  hover:text-gray-500 font-bold py-2 rounded"
            onClick={() => {
              setType("day");
            }}
          >
            As Day
          </button>

          <div className="flex flex-col flex-wrap align-middle gap-1 p-2.5 border-dotted border-4 border-orange-400  rounded-2xl min-w-72 min-h-52 max-h-[60vh]">
            {scannedFood.map((food) => (
              <FoodCard
                key={food.calories}
                name={food.name}
                calories={food.calories}
                amount={food.amount}
                onFilter={filterFood}
              >
                <img
                  src={food.img}
                  alt={`Food with ${food.calories} calories`}
                  className="shrink-0 aspect-square size-16 bg-gray-500 bg-opacity-70 p-0.5 rounded-2xl"
                />
              </FoodCard>
            ))}
          </div>
          <button
            className=" size-fit px-10 ml-3.5 bg-orange-400 text-gray-50 hover:bg-orange-200  hover:text-gray-500 font-bold py-2 rounded"
            onClick={() => {
              setType("recipe");
            }}
          >
            As Recipe
          </button>
        </article>
        {type === "recipe" ? (
          <div className="mb-4">
            <label
              htmlFor="servings"
              className="block text-bold text-center font-medium leading-6 text-gray-50"
            >
              How servings you get?
            </label>
            <div className="mt-2">
              <input
                id="servings"
                name="servings"
                type="number"
                autoComplete="number"
                value={recipe.servings}
                className="block w-full rounded-xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                onInput={(e) => {
                  setRecipe({
                    ...recipe,
                    servings: e.currentTarget.valueAsNumber,
                  });
                }}
              />
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <label
              htmlFor="weight"
              className="block text-bold text-center font-medium leading-6 text-gray-50"
            >
              How much did you weight today?
            </label>
            <div className="mt-2">
              <input
                id="weight"
                name="weight"
                type="number"
                autoComplete="number"
                value={weight}
                className="block w-full rounded-xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                onInput={(e) => {
                  setWeight(e.currentTarget.valueAsNumber);
                }}
              />
            </div>
          </div>
        )}
        <button
          className="size-fit px-16  bg-orange-400 text-gray-50 hover:bg-orange-200  hover:text-gray-500 font-bold py-2 rounded-2xl mb-11"
          onClick={() => {
            submit(
              {
                weight: weight,
                foods: scannedFood,
                type: type,
                recipe: recipe,
              },
              {
                method: "post",
                encType: "application/json",
                action: "/main/add",
              },
            );
          }}
        >
          Save as {type}
        </button>
        {/*<VideoInput*/}
        {/*  fps={10}*/}
        {/*  qrbox={250}*/}
        {/*  disableFlip={false}*/}
        {/*  // qrCodeSuccessCallback={(decodedText: any, decodedResult: any) => {*/}
        {/*  //   console.log(`Scan result: ${decodedText}`, decodedResult);*/}
        {/*  // }}*/}
        {/*/>*/}
        <div className="flex mb-11 items-center">
          {!ready ? (
            <button
              className=" size-fit px-16 text-xl py-4 mr-3.5 bg-orange-400 text-gray-50 hover:bg-orange-200  hover:text-gray-500 font-bold rounded"
              onClick={() => setMode("scan")}
            >
              Scan
            </button>
          ) : null}
          {ready ? (
            <div className="flex flex-col">
              <FoodCard
                name={card.name}
                calories={card.calories}
                amount={card.amount}
                onFilter={filterFood}
              >
                <img
                  src={imgURL}
                  alt={"Food Image 4"}
                  className="shrink-0 aspect-square size-16 bg-gray-500 bg-opacity-70 p-0.5 rounded-2xl"
                />
              </FoodCard>
              <button
                className="mx-auto my-8 size-fit px-10 bg-green-200 hover:bg-green-700 text-gray-500 hover:text-gray-200 font-bold py-2 rounded"
                onClick={() => {
                  setScannedFood([...scannedFood, card]);
                  setReady(false);
                }}
              >
                Approve
              </button>
              <button
                className="mx-auto mb-8 size-fit px-10 bg-red-200 hover:bg-green-700 text-gray-500 hover:bg-red-500 hover:text-gray-200 font-bold py-2 rounded"
                onClick={() => {
                  setReady(false);
                }}
              >
                Deny
              </button>
            </div>
          ) : mode === "scan" ? (
            <>
              <ViewFinder onScan={setCard} onReady={setReady} />
            </>
          ) : (
            <ManualInput onScan={setCard} onReady={setReady} />
          )}
          {!ready ? (
            <button
              className=" size-fit px-16 text-xl py-4 ml-3.5 bg-orange-400 text-gray-50 hover:bg-orange-200  hover:text-gray-500 font-bold rounded"
              onClick={() => setMode("manual")}
            >
              Manual
            </button>
          ) : null}
        </div>
      </section>
    </main>
  );
}
