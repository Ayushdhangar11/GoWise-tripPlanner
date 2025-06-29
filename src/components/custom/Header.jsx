import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover.jsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "../ui/dialog.jsx";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  // Google sign-in logic
  const signInWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
    onError: (error) => {
      console.error("Login Failed:", error);
      toast.error("Login failed. Please try again.");
    },
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("User profile fetched successfully!");
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        return null;
      });
  };

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, []);

  return (
    <div className="P-4 shadow-sm flex justify-between items-center px-5 bg-[#343333] ">
      <div className="m-2.5">
        <a href="/"></a>
        <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />
      </div>
      <div className="m-2.5">
        {user ? (
          <div className="flex items-center gap-2">
            <a href="/trip-history">
            <Button>My Trip</Button>
            </a>
            <Popover>
              <PopoverTrigger asChild>
                <img
                  src={user.picture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-200 cursor-pointer"
                  style={{ background: "none" }}
                />
              </PopoverTrigger>
              <PopoverContent className="w-32 p-2">
                <button
                  className="w-auto text-white rounded"
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.reload();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <>
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription>
                    <img src="/logo.svg" alt="" />
                    <h2 className="text-2xl font-bold mt-7">Login Required</h2>
                    <h2>
                      You need to be logged in to create a trip. Please log in to your
                      account to continue.
                    </h2>
                    <Button
                      className={"mt-7 w-full flex justify-center gap-3"}
                      onClick={() => signInWithGoogle()}
                    >
                      Sign In With Google <FcGoogle className="h-8 w-8" />
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
