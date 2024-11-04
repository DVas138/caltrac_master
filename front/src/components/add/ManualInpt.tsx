import { Dispatch, SetStateAction, useRef } from "react";
import { Food } from "./InputFood.tsx";

import imgURL from "../../../public/food_cover.svg";
export default function ManualInput({
  onScan,
  onReady,
}: {
  onScan: Dispatch<SetStateAction<Food>>;
  onReady: Dispatch<SetStateAction<boolean>>;
}) {
  const barcode = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const calories = useRef<HTMLInputElement>(null);
  const amount = useRef<HTMLInputElement>(null);

  return (
    <div
      className="p-4 border-4 border-dotted border-orange-400 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
      // style={{ boxShadow: "inset 0 0 0 5px green" }}
    >
      <label
        htmlFor="barcode"
        className="block text-bold font-medium leading-6 text-gray-50"
      >
        Barcode
      </label>
      <div className="mt-2">
        <input
          id="barcode"
          name="barcode"
          type="number"
          autoComplete="number"
          ref={barcode}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <h3 className="block text-bold text-center font-medium leading-6 text-gray-50">
        OR
      </h3>
      <label
        htmlFor="name"
        className="block text-bold font-medium leading-6 text-gray-50"
      >
        Food Name
      </label>
      <div className="mt-2">
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="text"
          ref={name}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <label
        htmlFor="calories"
        className="block text-bold font-medium leading-6 text-gray-50"
      >
        Calories
      </label>
      <div className="mt-2">
        <input
          id="calories"
          name="calories"
          type="number"
          autoComplete="number"
          ref={calories}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div className="mb-8">
        <label
          htmlFor="amount"
          className="block text-bold font-medium leading-6 text-gray-50"
        >
          Set Amount in Grams
        </label>
        <div className="mt-2">
          <input
            id="amount"
            name="amount"
            type="number"
            ref={amount}
            autoComplete="number"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <button
        className="ml-4  mb-8 size-fit px-10 bg-green-200 hover:bg-green-700 text-gray-500 hover:text-gray-200 font-bold py-2 rounded"
        onClick={async () => {
          if (
            barcode.current &&
            amount.current &&
            barcode.current.value.length !== 0
          ) {
            const response = await fetch(
              `https://world.openfoodfacts.net/api/v2/product/${barcode.current.valueAsNumber}?fields=product_name,abbreviated_product_name,nutriments,nutriscore_data`,
              // `https://world.openfoodfacts.net/api/v2/product/3800748060642?fields=product_name,brands,nutriments,nutriscore_data`,
            );
            const data = await response.json();
            console.log("Manual input data", data);
            data.product.brands = data.product.brands
              ? data.product.brands
              : "";
            data.product.product_name = data.product.product_name
              ? data.product.product_name
              : "";
            onScan({
              name: data.product.product_name + " " + data.product.brands,
              calories:
                data.product.nutriments["energy-kcal_100g"] *
                (amount.current.valueAsNumber / 100),
              // img: "https://cdn.builder.io/api/v1/image/assets/TEMP/a6be1c74ad0f3bb3710f887d49671427be75ba3922f2cf1e3ade755bfde6d271?apiKey=ea474bbdb6aa47209952665d35262dd2&",
              img: imgURL,
              amount: amount.current.valueAsNumber,
              barcode: barcode.current.valueAsNumber,
            });
          } else if (
            name.current &&
            calories.current &&
            amount.current &&
            barcode.current &&
            name.current.value.length !== 0
          ) {
            onScan({
              name: name.current.value,
              calories:
                calories.current.valueAsNumber *
                (amount.current.valueAsNumber / 100),
              // img: "https://cdn.builder.io/api/v1/image/assets/TEMP/a6be1c74ad0f3bb3710f887d49671427be75ba3922f2cf1e3ade755bfde6d271?apiKey=ea474bbdb6aa47209952665d35262dd2&",
              img: imgURL,
              amount: amount.current.valueAsNumber,
              barcode: 0,
            });
          } else {
            onScan({
              name: "No Input Data",
              calories: 0,
              // img: "https://cdn.builder.io/api/v1/image/assets/TEMP/a6be1c74ad0f3bb3710f887d49671427be75ba3922f2cf1e3ade755bfde6d271?apiKey=ea474bbdb6aa47209952665d35262dd2&",
              img: imgURL,
              amount: 0,
              barcode: 0,
            });
          }
          onReady(true);
        }}
      >
        Approve
      </button>
    </div>
  );
}
