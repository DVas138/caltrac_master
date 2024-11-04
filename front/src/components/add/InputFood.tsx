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
  const response = await fetch("https://kigokido.onrender.com/food", {
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
  const [scannedFood, setScannedFood] = useState<Food[]>([]);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<"scan" | "manual">("scan");
  const [card, setCard] = useState<Food>({
    name: "",
    calories: 0,
    img: imgURL,
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
    // <main className="flex flex-row gap-5 justify-between mx-auto bg-gradient-to-r from-purple-500 to-pink-500 w-screen ">
    // <main className=" ">
    //TODO: Button symmetry and size
    <main className="flex flex-col flex-grow items-center bg-gradient-to-r from-purple-500 to-pink-500 ">
      {type === "recipe" ? (
        <div className="m-4">
          <label
            htmlFor="recipe"
            className="block text-bold text-center font-medium leading-6 text-gray-50 mb-2"
          >
            Recipe Name
          </label>
          <input
            id="recipe"
            name="recipe"
            type="text"
            value={recipe.name}
            className="block mx-auto rounded-xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            onInput={(e) => {
              setRecipe({ ...recipe, name: e.currentTarget.value });
            }}
          />
        </div>
      ) : null}
      <section className="grid grid-cols-5 w-3/4 mt-8 rounded-2xl shadow-sm backdrop-blur-[2px] bg-white bg-opacity-70 items-center">
        <button
          className="size-fit min-w-[73px] px-10 py-2 col-span-1 bg-orange-400 text-gray-50 hover:bg-orange-200  hover:text-gray-500 font-bold rounded justify-self-end"
          type={"button"}
          onClick={() => {
            setType("day");
          }}
        >
          As Day
        </button>

        <div className="flex flex-col col-span-3 mx-2.5 flex-wrap align-middle gap-1 p-2.5 border-dotted border-4 border-orange-400 rounded-2xl min-h-[250px]">
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
          className=" size-fit px-10 py-2 col-span-1 bg-orange-400 text-gray-50 hover:bg-orange-200  hover:text-gray-500 font-bold rounded justify-self-start"
          type={"button"}
          onClick={() => {
            setType("recipe");
          }}
        >
          As Recipe
        </button>
      </section>

      {type === "recipe" ? (
        <div className="m-4">
          <label
            htmlFor="servings"
            className="block text-bold text-center font-medium leading-6 text-gray-50"
          >
            How servings you get?
          </label>
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
      ) : (
        <div className="m-4">
          <label
            htmlFor="weight"
            className="block text-bold text-center font-medium leading-6 text-gray-50"
          >
            How much did you weight today?
          </label>
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
      )}
      <button
        className="px-16  bg-orange-400 text-gray-50 hover:bg-orange-200  hover:text-gray-500 font-bold py-2 rounded-2xl mb-11"
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
      {/* <VideoInput*/}
      {/*   fps={10}*/}
      {/*   qrbox={250}*/}
      {/*   disableFlip={false}*/}
      {/*   qrCodeSuccessCallback={(decodedText: any, decodedResult: any) => {*/}
      {/*     console.log(`Scan result: ${decodedText}`, decodedResult);*/}
      {/*   }}*/}
      {/*/> */}
      {/* /*!/*/}
      <div className="grid grid-cols-5 m-8 items-center">
        {!ready ? (
          <button
            className={
              `
              ${mode === "scan" ? "col-start-1 " : "col-start-2 "}` +
              "col-span-1 px-16 text-xl py-4 mr-3.5 bg-orange-400 text-gray-50 hover:bg-orange-200  hover:text-gray-500 font-bold rounded"
            }
            onClick={() => setMode("scan")}
          >
            Scan
          </button>
        ) : null}
        {ready ? (
          <div className="flex col-start-2 col-span-3 flex-col">
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
            <ViewFinder
              className={"col-span-3"}
              onScan={setCard}
              onReady={setReady}
            />
          </>
        ) : (
          <ManualInput onScan={setCard} onReady={setReady} />
        )}
        {!ready ? (
          <button
            className="col-span-1 px-16 text-xl py-4 ml-3.5 bg-orange-400 text-gray-50 hover:bg-orange-200  hover:text-gray-500 font-bold rounded"
            onClick={() => setMode("manual")}
          >
            Manual
          </button>
        ) : null}
      </div>
    </main>
    // </main>
  );
}
