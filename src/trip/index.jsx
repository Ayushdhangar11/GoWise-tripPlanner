import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Input } from "../components/ui/input.jsx";
import { Button } from "../components/ui/button.jsx";
import {
  AIPROMPT,
  SelectBudgetOptions,
  SelectNoOfPersons,
} from "../constants/option.jsx";
import { generateTravelPlan } from "../services/Aimodal.jsx";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog.jsx";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig"; // Adjust the path as needed to your firebase config
import { useNavigate } from "react-router-dom";


function CreateTrip() {
  const [openDialog, setOpenDialog] = useState(false); // using for managing dialog state
  //dialog state is used to show the login dialog when user is not logged in
  // State to manage form data
  const [formData, setFormData] = useState({});
  // Function to handle form submission

  const router = useNavigate(); // Using useNavigate hook from react-router-dom for navigation

  const handleIpChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("Form Data Updated:", formData); // Debugging: Log the form data to console
  }, [formData]);

  const [isGenerating, setIsGenerating] = useState(false); // Add this state

  const debounceRef = useRef(null);

  const signInWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
    onError: (error) => {
      console.error("Login Failed:", error);
      toast.error("Login failed. Please try again.");
    },
  });

  const handleGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      toast.error("Please log in to generate a trip.");
      return;
    }

    if (isGenerating) return; // Prevent multiple API calls while waiting for response
    if (debounceRef.current) return; // Prevent rapid calls (optional, for extra safety)
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null;
    }, 5000);

    if (
      !formData.place ||
      !formData.noOfDays ||
      !formData.budget ||
      !formData.noOfPersons
    ) {
      toast("Please fill in all fields before generating the trip.");
      return;
    }

    setIsGenerating(true); // Set loading state

    const Prompt = AIPROMPT.replaceAll("{location}", formData.place)
      .replaceAll("{noOfDays}", formData.noOfDays)
      .replaceAll("{People}", formData.noOfPersons)
      .replaceAll("{Budget}", formData.budget);

    console.log("Prompt:", Prompt); // Debugging: Log the prompt to console
    try {
      const response = await generateTravelPlan(Prompt);
      console.log("Response:", response); // Debugging: Log the response to console
      toast.success("Trip generated successfully!");
      saveAiTrip(response);
    } catch (error) {
      console.error("Error generating trip:", error); // Debugging: Log the error to console
      toast.error(
        error.message || "Failed to generate trip. Please try again."
      );
    } finally {
      setIsGenerating(false); // Reset loading state
    }
  };

  const saveAiTrip = async (TripData) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString(); // Generate a unique document ID based on the current timestamp
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user.email,
      id: docId, // Include the unique ID in the document
    });
    console.log("Trip saved successfully with ID:", docId); // Debugging: Log the document ID to console
    toast.success("Trip saved successfully!");
    router(`/view-trip/${docId}`); // Navigate to the view trip page with the document ID
    setFormData({}); // Reset form data after saving trip

  };

  const getUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("User Profile:", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("User profile fetched successfully!");
        setOpenDialog(false); // Close the dialog after fetching user profile
        handleGenerateTrip(); // Call the function to generate trip after fetching user profile
        // You can also update the formData or state with the user profile data here
        // You can also update the UI or state with the user profile data here  
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        return null;
      });
  };


  // State variables for managing input and suggestions
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: value,
            format: "json",
            addressdetails: 1,
            limit: 5,
          },
        }
      );
      setSuggestions(res.data);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    console.log("Selected Place:", place); // Debugging: Log the selected place to console
    setSelectedLocation(place.display_name);
    setQuery(place.display_name);
    setSuggestions([]);
  };

  return (
 <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
    {/* Video Background */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
    >
      <source src="/HD.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="relative z-10 sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 ml-55 mr-55 rounded-3xl align-center bg-white bg-opacity-1 w-full max-w-4xl" 
      style={{
        boxShadow: "0 8px 32px 0 lightblue",
            background: "rgba(255,255,255,0.7)", // 0.8 = 80% opacity, lower for more transparency

      }}
    >
      <h2 className="font-bold text-4xl mt-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        Tell Us Your Travel Preferences
      </h2>
      <p className="mt-4 text-gray-700 text-xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your Destination?
          </h2>

          {/* Autocomplete input */}
          <Input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Enter a destination"
            className="w-full border border-[#222831] rounded-md px-4 py-2 text-lg bg-white"
          />

          {/* Suggestion list */}
          {suggestions.length > 0 && (
            <ul className="border border-gray-300 rounded-md mt-2 max-h-60 overflow-y-auto bg-white z-50 relative">
              {suggestions.map((place, index) => (
                <li
                  key={index}
                  onClick={() => {
                    handleSelect(place);
                    handleIpChange("place", place.display_name);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}

          {/* Selected Location Display */}
          {selectedLocation && (
            <p className="mt-4 text-green-700 font-medium">
              You selected: {selectedLocation}
            </p>
          )}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">
          What is your Trip Duration?
        </h2>
        <Input
          type="number"
          placeholder="Enter number of days"
          className="w-full border border-[#0f1114] rounded-md px-4 py-2 text-lg bg-white"
          onChange={(e) => handleIpChange("noOfDays", e.target.value)}
          value={formData.noOfDays || ""}
        />
      </div>

     <div className="mt-10">
  <h2 className="text-xl my-3 font-semibold tracking-wide text-gray-800">
    Select Your Budget
  </h2>
  <p className="text-gray-600 mb-4">
    Choose a budget that suits your travel plans.
  </p>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {SelectBudgetOptions.map((option) => {
      const isSelected = formData.budget === option.title;
      return (
        <div
          key={option.id}
          onClick={() => handleIpChange("budget", option.title)}
          className={`
            group transition-all duration-300 cursor-pointer
            rounded-xl p-6 flex flex-col items-center shadow-lg
            border-2
            ${isSelected
              ? "border-amber-400 bg-white/80 shadow-amber-200"
              : "border-transparent bg-white/60 hover:border-amber-200 hover:bg-white/90"}
            hover:scale-105
          `}
          style={{
            boxShadow: isSelected
              ? "0 4px 24px 0 rgba(251,191,36,0.25)"
              : "0 2px 8px 0 rgba(0,0,0,0.08)",
            backdropFilter: "blur(4px)",
          }}
        >
          <span className="text-3xl mb-2">{option.icon}</span>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{option.title}</h3>
          <p className="text-gray-600 text-center mb-1">{option.desc}</p>
        </div>
      );
    })}
  </div>
</div>

      <div className="mt-10">
  <h2 className="text-xl my-3 font-semibold tracking-wide text-gray-800">
    How many people are traveling?
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {SelectNoOfPersons.map((option) => {
      const isSelected = formData.noOfPersons === option.no;
      return (
        <div
          key={option.id}
          onClick={() => handleIpChange("noOfPersons", option.no)}
          className={`
            group transition-all duration-300 cursor-pointer
            rounded-xl p-6 flex flex-col items-center shadow-lg
            border-2
            ${isSelected
              ? "border-amber-400 bg-white/80 shadow-amber-200"
              : "border-transparent bg-white/60 hover:border-amber-200 hover:bg-white/90"}
            hover:scale-105
          `}
          style={{
            boxShadow: isSelected
              ? "0 4px 24px 0 rgba(251,191,36,0.25)"
              : "0 2px 8px 0 rgba(0,0,0,0.08)",
            backdropFilter: "blur(4px)",
          }}
        >
          <span className="text-3xl mb-2">{option.icon}</span>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{option.title}</h3>
          <p className="text-gray-600 text-center mb-1">{option.desc}</p>
          <span className="text-sm text-amber-600 font-bold">{option.no}</span>
        </div>
      );
    })}
  </div>
</div>

      <div className="flex justify-end mt-10 mb-10" disabled={isGenerating}>
        <Button onClick={handleGenerateTrip}>
          {isGenerating ? "Generating..." : "Generate Trip"}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className="text-2xl font-bold mt-7">Login Required</h2>
              <h2>You need to be logged in to create a trip. Please log in to your
                account to continue.</h2>

              <Button className={"mt-7 w-full flex justify-center gap-3"} onClick={() => signInWithGoogle()}>Sign In With Google <FcGoogle className="h-8 w-8" /></Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  );
}

export default CreateTrip;
