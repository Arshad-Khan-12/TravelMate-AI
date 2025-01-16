import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const users = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-4 shadow-md">
      {/* Left Section - Logo */}
      <img
        src="/TravelMate AI.png"
        className="w-32 text-xl font-bold text-primary md:w-40"
      />
      {/* Center Section - Optional Search Bar */}
      {/* Uncomment if needed */}
      {/* <div className="hidden md:flex">
        <input
          type="text"
          placeholder="Search destinations..."
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div> */}

      {/* Right Section */}
      <div className="flex items-center space-x-4 px-2 md:space-x-6">
        <Button className="hidden md:block">Create Trip</Button>
        <Button className="hidden md:block">My Trips</Button>

        {/* Profile Icon with Dropdown */}
        <div className="relative">
          <img
            src={users?.picture} // Replace with user profile pic URL
            alt="Profile"
            className="h-8 w-8 cursor-pointer rounded-full border md:h-10 md:w-10"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800">
              <button
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={() => alert("Logged out")}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
