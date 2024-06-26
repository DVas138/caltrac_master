// import React from "react";
export default  function TravelLandingPage() {
    return (
        <div className="container mx-auto px-4 py-10">
            <header className="flex justify-between items-center">
                <div className="text-xl font-bold">Travel</div>
                <div className="hidden lg:flex space-x-4">
                    <a href="#" className="text-gray-700 hover:text-gray-500">Mobile</a>
                    <a href="#" className="text-gray-700 hover:text-gray-500">My Trips</a>
                </div>
            </header>
            <main className="flex flex-col lg:flex-row lg:space-x-10 mt-10">
                <div className="w-full lg:w-3/5 space-y-10">
                    <h1 className="text-3xl font-bold leading-tight">Explore New Places</h1>
                    <p className="text-gray-700 text-lg">
                        Plan and book your perfect trip with expert advice, travel tips,
                        destination information and inspiration from us.
                    </p>
                    <div className="flex space-x-4">
                        <button className="btn btn-primary">Discover Now</button>
                        <button className="btn btn-outline">Request a Call Back</button>
                    </div>
                </div>
                <div className="w-full lg:w-2/5 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Group Trip</h2>
                    <div className="flex justify-between items-center mb-2">
                        <p className="font-bold">Warwick Hotels & Resorts</p>
                        <a href="#" className="text-gray-500 hover:text-gray-400">See More</a>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                            <img
                                src="[travel hotel icon]"
                                alt="Hotel icon"
                                className="w-6 h-6"
                            />
                            <p>Facilities</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <img
                                src="[travel swimming icon]"
                                alt="Swimming icon"
                                className="w-6 h-6"
                            />
                            <p>Swimming</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <img src="[travel wifi icon]" alt="Wifi icon" className="w-6 h-6" />
                            <p>Wi-Fi</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <img src="[travel air conditioner icon]" alt="Air conditioner icon" className="w-6 h-6" />
                            <p>AC</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <img src="[travel dinner icon]" alt="Dinner icon" className="w-6 h-6" />
                            <p>Dinner</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-xl font-bold">$450.00</div>
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm text-gray-500">Booking ID: 9347384</p>
                            <button className="btn btn-sm btn-outline">Booking Now</button>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="mt-10 text-center text-gray-500">
                &copy; 2024 All rights reserved.
            </footer>
        </div>
    );
}