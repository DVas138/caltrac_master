import * as React from "react";

interface Item {
    src: string;
    alt: string;
    name: string;
    price: string;
    origin: string;
}

const items: Item[] = [
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d41f1109eb43134235d39489eb5374f7e235f5eab63d19146ba42d18cd5cea13?apiKey=ea474bbdb6aa47209952665d35262dd2&",
        alt: "Heirloom tomato",
        name: "Heirloom tomato",
        price: "$5.99 / lb",
        origin: "Grown in San Juan Capistrano, CA"
    },
    {
        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/23c2113f02256a3bc2a202f240a83672038c5391f9cc37a3fd939f9493a3758d?apiKey=ea474bbdb6aa47209952665d35262dd2&",
        alt: "Organic ginger",
        name: "Organic ginger",
        price: "$12.99 / lb",
        origin: "Grown in Huntington Beach, CA"
    }
];

const NavItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="self-stretch my-auto">{children}</div>
);

const ButtonItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="justify-center self-stretch px-6 py-4 font-semibold text-white bg-lime-800 rounded-lg max-md:px-5">{children}</div>
);

const ItemCard: React.FC<Item> = ({ src, alt, name, price, origin }) => (
    <section className="flex flex-col grow pb-8 w-full text-xl font-semibold leading-7 rounded-3xl border-2 border-solid bg-stone-50 border-neutral-200 max-md:mt-8">
        <img loading="lazy" src={src} alt={alt} className="w-full aspect-[1.33]" />
        <div className="flex flex-col self-start mt-7 ml-6 max-md:ml-2.5">
            <div className="text-black">{name}</div>
            <div className="mt-3.5 text-lime-800">{price}</div>
            <div className="mt-7 text-base leading-6 text-neutral-500">{origin}</div>
        </div>
    </section>
);

const MyComponent: React.FC = () => (
    <div className="flex flex-col pt-8 pb-20 bg-white">
        <header className="flex gap-5 self-center px-5 w-full max-w-[1248px] max-md:flex-wrap max-md:max-w-full">
            <h1 className="flex-auto my-auto text-3xl font-medium tracking-tight leading-8 text-lime-800">World Peas</h1>
            <nav className="flex gap-5 justify-between items-center text-base leading-5 text-center text-black max-md:flex-wrap max-md:max-w-full">
                <NavItem>Shop</NavItem>
                <NavItem>Newstand</NavItem>
                <NavItem>Who we are</NavItem>
                <NavItem>My profile</NavItem>
                <ButtonItem>Basket (3)</ButtonItem>
            </nav>
        </header>

        <section className="flex gap-5 justify-between items-start px-20 pt-16 pb-8 mt-8 w-full text-black bg-white max-md:flex-wrap max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-wrap">
                <h2 className="grow text-6xl tracking-tighter leading-[76.8px] max-md:text-4xl">Produce</h2>
                <time className="flex-auto self-end mt-8 text-xl leading-7">
                    <span className="font-medium">Fresh</span>
                    <span className="font-light"> — August 21, 2023</span>
                </time>
            </div>
            <div className="flex gap-2 mt-3.5 text-base font-semibold leading-5 text-center">
                <button className="justify-center px-4 py-3.5 text-white whitespace-nowrap bg-lime-800 rounded-3xl">Default</button>
                <button className="justify-center px-4 py-3.5 whitespace-nowrap bg-white rounded-3xl border border-solid border-stone-300">A-Z</button>
                <button className="justify-center px-5 py-3.5 bg-white rounded-3xl border border-solid border-stone-300">List view</button>
            </div>
        </section>

        <main className="mt-10 ml-24 max-w-full w-[822px]">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                {items.map((item, index) => (
                    <div key={index} className={`${index === 1 ? "ml-5 max-md:ml-0" : ""} flex flex-col w-6/12 max-md:ml-0 max-md:w-full`}>
                        <ItemCard src={item.src} alt={item.alt} name={item.name} price={item.price} origin={item.origin} />
                    </div>
                ))}
            </div>
        </main>
    </div>
);

export default MyComponent;