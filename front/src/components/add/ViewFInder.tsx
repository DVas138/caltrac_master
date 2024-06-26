import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import { Food } from "./InputFood";
export default function BarcodeScanner({
  onScan,
  onReady,
}: {
  onScan: Dispatch<SetStateAction<Food>>;
  onReady: Dispatch<SetStateAction<boolean>>;
}) {
  const [result, setResult] = useState("");
  const [amount, setAmount] = useState(100);
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });
  async function handleScan(barcode: string) {
    if (barcode.length !== 0) {
      const response = await fetch(
        `https://world.openfoodfacts.net/api/v2/product/${barcode}?fields=product_name,abbreviated_product_name,nutriments,nutriscore_data`,
        // `https://world.openfoodfacts.net/api/v2/product/3800748060642?fields=product_name,brands,nutriments,nutriscore_data`,
      );
      const data = await response.json();
      onScan({
        name: data.product.product_name + " " + data.product.brands,
        calories: data.product.nutriments["energy-kcal_100g"] * (amount / 100),
        img: "https://cdn.builder.io/api/v1/image/assets/TEMP/a6be1c74ad0f3bb3710f887d49671427be75ba3922f2cf1e3ade755bfde6d271?apiKey=ea474bbdb6aa47209952665d35262dd2&",
        amount: amount,
        barcode: parseInt(barcode),
      });
      onReady(true);

      console.log(
        data.product.nutriments["energy-kcal_100g"],
        data.product.product_name + " " + data.product.brands,
      );
    }
  }
  useEffect(() => {
    handleScan(result);
  }, [result]);
  return (
    <>
      <video ref={ref} />
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Set Amount in Grams
        </label>
        <div className="mt-2">
          <input
            id="amount"
            name="amount"
            type="number"
            autoComplete="number"
            value={amount}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onInput={(e) => {
              setAmount(e.currentTarget.valueAsNumber);
            }}
          />
        </div>
      </div>
    </>
  );
}
