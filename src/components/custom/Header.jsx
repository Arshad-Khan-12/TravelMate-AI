import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Cross2Icon } from "@radix-ui/react-icons";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (response) => getUserProfile(response),
    onError: (error) => console.log(error),
  });

  const getUserProfile = async (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?accesstoken=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        toast("Login Successful");
      });
  };

  useEffect(() => {
    // console.log(user);
  }, [user]);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-4 shadow-md">
      {/* Left Section - Logo */}
      <img
        src="/TravelMate AI.png"
        className="w-32 text-xl font-bold text-primary md:w-40 cursor-pointer"
        alt="TravelMate AI"
        onClick={() => navigate("/")}
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
        <Link to={"/create-trip"}>
          <Button className="hidden sm:block">Create Trip</Button>
        </Link>
        {user && (
          <Link to={"/my-trips"}>
            <Button className="text-xs sm:text-sm md:text-base py-1 sm:py-1 px-2 sm:px-4">
              My Trips
            </Button>
          </Link>
        )}

        {/* <Link to={"/my-trips"}>
          <Button className="hidden md:block">My Trips</Button>
        </Link> */}

        {user ? (
          <div className="relative">
            <img
              src={user?.picture} // Replace with user profile pic URL
              alt="Profile"
              className="h-8 w-8 cursor-pointer rounded-full border md:h-10 md:w-10"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800">
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.removeItem("user");
                    navigate("/");
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <img
                      className="h-24 mx-auto"
                      src="public/TravelMate AI.png"
                      alt=""
                    />
                    {/* Add close button */}
                    <button
                      onClick={() => setOpenDialog(false)}
                      className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                    >
                      <Cross2Icon className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </button>
                  </DialogTitle>
                  <DialogDescription>
                    <h2 className="font-bold text-xl text-gray-800 text-center  ">
                      Sign in with Google
                    </h2>
                    <p className="mt-5">
                      {" "}
                      Sign in with Google Authentication securely to continue
                      using the App{" "}
                    </p>
                    <Button onClick={login} className="w-full mt-5" variant="">
                      Sign in
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/* <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
            <Dialog open={openDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <img
                      className="h-24 mx-auto"
                      src="public/TravelMate AI.png"
                      alt=""
                    />
                  </DialogTitle>
                  <DialogDescription>
                    <h2 className="font-bold text-xl text-gray-800 text-center  ">
                      Sign in with Google
                    </h2>
                    <p className="mt-5">
                      {" "}
                      Sign in with Google Authentication securely to continue
                      using the App{" "}
                    </p>
                    <Button onClick={login} className="w-full mt-5" variant="">
                      Sign in
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog> */}
          </div>
        )}
      </div>
    </header>
  );
}
