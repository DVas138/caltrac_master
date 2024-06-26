import FoodCard from "../add/FoodCard.tsx";

const foodImages = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/51b7ebbc737afcfa9f8cb1b8dc3c8bf47cc1ae3f3bf3bbe2729d45e260474a5e?apiKey=ea474bbdb6aa47209952665d35262dd2&",
    alt: "Food Image 1",
    name: "FOOD",
    calories: 233,
    amount: 300,
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/51b7ebbc737afcfa9f8cb1b8dc3c8bf47cc1ae3f3bf3bbe2729d45e260474a5e?apiKey=ea474bbdb6aa47209952665d35262dd2&",
    alt: "Food Image 2",
    name: "FOOD",
    calories: 233,
    amount: 300,
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a6be1c74ad0f3bb3710f887d49671427be75ba3922f2cf1e3ade755bfde6d271?apiKey=ea474bbdb6aa47209952665d35262dd2&",
    alt: "Food Image 3",
    name: "FOOD",
    calories: 233,
    amount: 300,
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a6be1c74ad0f3bb3710f887d49671427be75ba3922f2cf1e3ade755bfde6d271?apiKey=ea474bbdb6aa47209952665d35262dd2&",
    alt: "Food Image 4",
    name: "FOOD",
    calories: 233,
    amount: 300,
  },
];
import HomeAside from "../aside/HomeAside.tsx";
import ProgressBar from "./ProgressBar.tsx";
import WeekChart from "./WeekChart.tsx";
import { redirect, useLoaderData } from "react-router-dom";

export async function getUserToday() {
  const response = await fetch("http://localhost:8000/today", {
    method: "GET",
    headers: {
      Authorization: "bearer " + localStorage.getItem("userToken"),
    },
  });
  if (!response.ok) {
    redirect("add");
  } else {
    return response;
  }
}

export default function Today() {
  // @ts-ignore
  console.log(useLoaderData());
  const todayData: any = useLoaderData();
  console.log(todayData.foods);
  const week: string[] = [
    todayData.days[0].date,
    todayData.days[todayData.days.length - 1].date,
  ];
  return (
    <main className="flex flex-row gap-5 justify-between mx-auto my-16 w-screen max-md:mt-10 max-md:max-w-full">
      <HomeAside week={week} />
      <section className="flex flex-col justify-between m-auto h-full max-md:max-w-full">
        <article className="flex flex-row px-16 pt-3.5 pb-7 mx-auto rounded-2xl shadow-sm backdrop-blur-[2px] bg-white bg-opacity-70 max-md:px-5 max-md:mr-2.5 max-md:max-w-full">
          <ProgressBar goals={todayData.goal} byNow={todayData.calories} />
          <div className="flex flex-col grow text-2xl text-white whitespace-nowrap max-md:mt-10 max-md:max-w-full">
            {todayData.foods.map((food: any) => (
              <FoodCard
                key={food.id}
                name={food.name}
                amount={food.amount}
                calories={food.calories}
                onFilter={() => ({})}
              >
                <img
                  src={foodImages[0].src}
                  alt={foodImages[0].alt}
                  className="shrink-0 aspect-square w-[51px]"
                />
              </FoodCard>
            ))}
          </div>
        </article>
        <WeekChart weekData={todayData.days} />
      </section>
    </main>
  );
}
