import FoodCard from "./FoodCardBar.tsx";

const foodImages = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/51b7ebbc737afcfa9f8cb1b8dc3c8bf47cc1ae3f3bf3bbe2729d45e260474a5e?apiKey=ea474bbdb6aa47209952665d35262dd2&",
    alt: "Food Image 1",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/51b7ebbc737afcfa9f8cb1b8dc3c8bf47cc1ae3f3bf3bbe2729d45e260474a5e?apiKey=ea474bbdb6aa47209952665d35262dd2&",
    alt: "Food Image 2",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a6be1c74ad0f3bb3710f887d49671427be75ba3922f2cf1e3ade755bfde6d271?apiKey=ea474bbdb6aa47209952665d35262dd2&",
    alt: "Food Image 3",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a6be1c74ad0f3bb3710f887d49671427be75ba3922f2cf1e3ade755bfde6d271?apiKey=ea474bbdb6aa47209952665d35262dd2&",
    alt: "Food Image 4",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a6be1c74ad0f3bb3710f887d49671427be75ba3922f2cf1e3ade755bfde6d271?apiKey=ea474bbdb6aa47209952665d35262dd2&",
    alt: "Food Image 4",
  },
];
import MonthAside from "..//aside/MonthAside.tsx";
import MonthChart from "./MonthChart.tsx";

export default function Month() {
  return (
    <main className="flex flex-row gap-5 justify-between mx-auto my-16 w-screen ">
      <MonthAside />
      <section className="flex flex-col justify-between m-auto h-full lg:min-w-[1000px]">
        <MonthChart />
        <article className="flex flex-row px-40 pt-3.5 pb-7 mx-auto mb-16 w-[80%] justify-center rounded-2xl shadow-sm backdrop-blur-[2px] bg-white bg-opacity-70 ">
          <div className="flex flex-col w-3/4">
            {foodImages.map((image, index) => (
              <FoodCard key={index}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="shrink-0 aspect-square w-[51px] ml-4 mt-4"
                />
              </FoodCard>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
