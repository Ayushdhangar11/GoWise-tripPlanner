// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai"

export async function generateTravelPlan(inputText) {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY  })
  const config = {
    thinkingConfig: {
      thinkingBudget: -1
    },
    responseMimeType: "application/json",
  }
  const model = "gemini-2.5-pro"
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days with each day plan with best time to visit in JSON format.`
        }
      ]
    },
    {
      role: "model",
      parts: [
        {
          text: `**Developing the Vegas Itinerary**

I'm starting to build a basic structure for a Las Vegas travel itinerary, focusing on affordability. I've broken down the request into key elements, like location (Vegas) and budget. The next step is to add constraints and more elements, such as the duration of the trip (3 days) and the type of travelers (a couple).


**Analyzing the Request Details**

I'm now fully immersed in the nitty-gritty details of the travel plan request. I've pinpointed all the key components: the 3-day duration, the couple as the target audience, the budget-conscious approach, and the crucial requirement for a JSON output. My focus has shifted towards the specific JSON structure. I'm actively outlining fields like "Hotel Options List," complete with essential details (name, address, price range, image URL, geo-coordinates, and rating), and the "Suggested Itinerary" that will break down each day into a theme, ideal visiting times, and a list of engaging activities. I'm confident in producing a concise, practical itinerary.


**Defining JSON Output Structure**

I'm solidifying the JSON structure for the itinerary. I've broken down the necessary fields for the hotel list, including hotel name, address, price range, image URL, geo-coordinates, and rating. The "Suggested Itinerary" is now planned as an array of daily plans, each with a theme, suggested visiting times, and a list of engaging, budget-conscious activities. I'm focusing on crafting concise activity details with descriptions, place image URLs, geo-coordinates, ticket pricing (free or estimated cost), travel times, and suggested durations. This approach ensures a user-friendly and actionable itinerary.


**Developing Activity Descriptions**

I'm now refining the activity descriptions and details for the itinerary. I'm focusing on providing concise yet engaging information for each place, including descriptions, image URLs, geo-coordinates, ticket pricing, travel times, and suggested durations. This meticulous approach ensures a well-organized and user-friendly guide.


**Developing Activity Details**

I'm now focusing on filling out the activity details, ensuring concise descriptions, image URLs, and estimated costs or "free" designations. I've also identified potential budget-friendly eateries and happy hour spots, as well as affordable hotel options like the Flamingo and Golden Nugget. The itinerary structure is set, and I'm adding final touches to make it both practical and engaging.


**Planning the Budget Itinerary**

I'm now focusing on filling out the activity details, ensuring concise descriptions, image URLs, and estimated costs or "free" designations. I've also identified potential budget-friendly eateries and happy hour spots, as well as affordable hotel options like the Flamingo and Golden Nugget. The itinerary structure is set, and I'm adding final touches to make it both practical and engaging. This step includes crafting descriptions and locating relevant images and coordinate data for the itinerary's activities.


**Crafting Detailed Activity Data**

I'm now focused on the final JSON output. I've refined the activity details, ensuring concise descriptions, image URLs, and estimated costs. I've also integrated options like the High Roller Observation Wheel and Pinball Hall of Fame for those seeking variety. The JSON structure is set, and I'm polishing the final details, ensuring user-friendliness.


**Crafting Detailed JSON Output**

I've finalized the detailed JSON structure, including hotel options with estimated prices and descriptions. I'm focusing on providing accurate geo-coordinates, travel times, and activity durations. I am ensuring that the itinerary is easy to follow and that all activities are suitable for a budget-conscious couple, and polished it to make it more appealing.


**Finalizing Itinerary Details**

I've finished meticulously crafting the JSON output, including detailed hotel options with estimated prices and concise activity descriptions. My focus has been on accurate geo-coordinates, travel times, and duration estimates. I'm ensuring the itinerary is suitable for a couple on a budget and polishing it for user-friendliness.


`
        },
        {
          text: `\`\`\`json
{
  "tripDetails": {
    "location": "Las Vegas",
    "duration": "3 Days",
    "travelerType": "Couple",
    "budget": "Cheap"
  },
  "hotelOptions": [
    {
      "hotelName": "The LINQ Hotel + Experience",
      "address": "3535 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
      "price": "Around $50 - $150 per night (Note: Prices fluctuate. Always check for mandatory resort fees).",
      "hotelImageUrl": "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
      "geoCoordinates": {
        "latitude": 36.1175,
        "longitude": -115.1708
      },
      "rating": 4.1,
      "description": "A modern, vibrant hotel at the heart of the Strip. It offers direct access to The LINQ Promenade and the High Roller. Rooms are contemporary and it's known for a younger, energetic crowd. Excellent central location for a budget price."
    },
    {
      "hotelName": "Flamingo Las Vegas Hotel & Casino",
      "address": "3555 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
      "price": "Around $40 - $140 per night (Note: Prices fluctuate. Always check for mandatory resort fees).",
      "hotelImageUrl": "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
      "geoCoordinates": {
        "latitude": 36.1162,
        "longitude": -115.1706
      },
      "rating": 3.9,
      "description": "An iconic, classic Vegas hotel with a prime center-Strip location. It features a beautiful 15-acre Caribbean-style pool area and the free Flamingo Wildlife Habitat. A great budget option for its location."
    },
    {
      "hotelName": "Excalibur Hotel & Casino",
      "address": "3850 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
      "price": "Around $35 - $120 per night (Note: Prices fluctuate. Always check for mandatory resort fees).",
      "hotelImageUrl": "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
      "geoCoordinates": {
        "latitude": 36.0986,
        "longitude": -115.1755
      },
      "rating": 3.8,
      "description": "A castle-themed hotel on the south end of the Strip, connected to Luxor and Mandalay Bay via a free tram. It offers some of the lowest room rates on the Strip, making it a top choice for budget travelers."
    },
    {
      "hotelName": "Golden Nugget Las Vegas Hotel & Casino",
      "address": "129 E Fremont St, Las Vegas, NV 89101, USA",
      "price": "Around $60 - $160 per night (Note: Prices fluctuate. Always check for mandatory resort fees).",
      "hotelImageUrl": "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder--image.png",
      "geoCoordinates": {
        "latitude": 36.1709,
        "longitude": -115.1435
      },
      "rating": 4.3,
      "description": "The most luxurious hotel in Downtown Las Vegas. It provides a more upscale experience while still being budget-friendly compared to Strip hotels. Located directly on the Fremont Street Experience and features an acclaimed pool with a shark tank."
    }
  ],
  "itinerary": [
    {
      "day": "Day 1",
      "theme": "South Strip Wonders & Iconic Sights",
      "budgetTip": "Purchase a 24-hour Deuce bus pass for around $8 to easily travel up and down the Strip. Most of today's activities are free to see.",
      "activities": [
        {
          "placeName": "Welcome to Fabulous Las Vegas Sign",
          "placeDetails": "Start your trip with an iconic photo at the world-famous sign. It's a must-do for first-time visitors. There's usually a line, but it moves quickly.",
          "placeImageUrl": "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
          "geoCoordinates": {
            "latitude": 36.0820,
            "longitude": -115.1728
          },
          "ticketPricing": "Free",
          "timeToTravel": "Varies (Suggest taking a Deuce bus or rideshare from your hotel)",
          "bestTimeToVisit": "Early morning (8-10 AM) to avoid large crowds and the midday heat.",
          "duration": "30-45 minutes"
        },
        {
          "placeName": "Explore South Strip Themed Hotels",
          "placeDetails": "Walk through the giant pyramid of the Luxor and the medieval castle of the Excalibur. These hotels are attractions in themselves and are connected by a free tram.",
          "placeImageUrl": "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
          "geoCoordinates": {
            "latitude": 36.0975,
            "longitude": -115.1762
          },
          "ticketPricing": "Free",
          "timeToTravel": "15-minute walk or 5-minute bus ride from the Las Vegas Sign.",
          "bestTimeToVisit": "Late morning (10 AM - 1 PM)",
          "duration": "1.5 - 2 hours"
        },
        {
          "placeName": "M&M's World and Coca-Cola Store",
          "placeDetails": "Explore four floors of colorful M&M's merchandise and create your own custom candy. Next door, try Coca-Cola samples from around the world (tasting tray has a fee) and meet the polar bear mascot.",
          "placeImageUrl": "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
          "geoCoordinates": {
            "latitude": 36.1045,
            "longitude": -115.1725
          },
          "ticketPricing": "Free to enter. Merchandise and tasting trays are extra.",
          "timeToTravel": "10-minute bus ride or 20-minute walk from Excalibur.",
          "bestTimeToVisit": "Afternoon (2 PM - 4 PM)",
          "duration": "1 - 1.5 hours"
        },
        {
          "placeName": "Bellagio Conservatory & Botanical Gardens",
          "placeDetails": "An absolutely stunning and free indoor garden that changes its elaborate display with the seasons. A beautiful, peaceful escape from the casino floor.",
          "placeImageUrl": "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
          "geoCoordinates": {
            "latitude": 36.1132,
            "longitude": -115.1765
          },
          "ticketPricing": "Free",
          "timeToTravel": "15-minute walk from M&M's World.",
          "bestTimeToVisit": "Late Afternoon (4 PM - 5 PM)",
          "duration": "45 minutes"
        },
        {
          "placeName": "Fountains of Bellagio Show",
          "placeDetails": "End your day with the iconic and romantic fountain show. A spectacular display of water, light, and music. Shows run frequently and are a quintessential Vegas experience.",
          "placeImageUrl": "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
          "geoCoordinates": {
            "latitude": 36.1127,
            "longitude": -115.1741
          },
          "ticketPricing": "Free",
          "timeToTravel": "2-minute walk from the Bellagio Conservatory.",
          "bestTimeToVisit": "Evening/Night (Shows are every 30 minutes in the afternoon, and every 15 minutes from 8 PM to midnight).",
          "duration": "15-30 minutes (watch a show or two)"
        }
      ]
    },
    {
      "day": "Day 2",
      "theme": "Downtown Vegas & Vintage Fun",
      "budgetTip": "Food and drinks are significantly cheaper on Fremont Street than on the Strip. Look for happy hour specials and low-cost casino food courts.",
      "activities": [
        {
          "placeName": "Pinball Hall of Fame",
          "placeDetails": "A huge museum featuring hundreds of pinball and arcade games from every era. It's not just a museum; you can play them all! A fun, nostalgic, and cheap way to spend a few hours.",
          "placeImageUrl": "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
          "geoCoordinates": {
            "latitude": 36.0903,
            "longitude": -115.1735
          },
          "ticketPricing": "Free to enter. Pay per game (most are 25-75 cents). Budget $10-20 per person for plenty of play time.",
          "timeToTravel": "Located at the south end of the Strip, take a Deuce bus or rideshare.",
          "bestTimeToVisit": "Late morning / Early Afternoon (11 AM - 2 PM)",
          "duration": "1.5 - 2 hours"
        },
        {
          "placeName": "Downtown Container Park",
          "placeDetails": "An open-air shopping and entertainment venue made from repurposed shipping containers. Features unique boutique shops, quirky restaurants, and a giant fire-breathing praying mantis sculpture at the entrance.",
          "placeImageUrl": "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
          "geoCoordinates": {
            "latitude": 36.1669,
            "longitude": -115.1369
          },
          "ticketPricing": "Free to enter.",
          "timeToTravel": "20-minute bus ride or 10-minute rideshare from Pinball Hall of Fame to Downtown.",
          "bestTimeToVisit": "Late Afternoon (4 PM - 6 PM)",
          "duration": "1 - 1.5 hours"
        },
        {
          "placeName": "Fremont Street Experience",
          "placeDetails": "The heart of Downtown Vegas. A five-block pedestrian mall covered by the Viva Vision canopy, the world's largest video screen. Enjoy street performers, live music on multiple stages, and a vintage Vegas vibe.",
          "placeImageUrl": "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
          "geoCoordinates": {
            "latitude": 36.1705,
            "longitude": -115.1444
          },
          "ticketPricing": "Free",
          "timeToTravel": "5-minute walk from Container Park.",
          "bestTimeToVisit": "Evening (After 6 PM)",
          "duration": "2 - 3 hours"
        },
        {
          "placeName": "Viva Vision Light Show",
          "placeDetails": "The main event of the Fremont Street Experience. Every hour, the massive overhead canopy comes to life with a stunning audio-visual show. It's an immersive and unforgettable experience.",
          "placeImageUrl": "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
          "geoCoordinates": {
            "latitude": 36.1705,
            "longitude": -115.1444
          },
          "ticketPricing": "Free",
          "timeToTravel": "You are already there.",
          "bestTimeToVisit": "Night (shows run hourly, starting around 6 PM).",
          "duration": "6-8 minutes per show"
        }
      ]
    },
    {
      "day": "Day 3",
      "theme": "Mid-Strip Exploration & Relaxation",
      "budgetTip": "Enjoy a cheap and delicious lunch at a classic spot like In-N-Out Burger or Tacos El Gordo near the mid-Strip area.",
      "activities": [
        {
          "placeName": "Flamingo Wildlife Habitat",
          "placeDetails": "A serene and free attraction located on the grounds of the Flamingo hotel. See a flock of Chilean flamingos, plus swans, ducks, koi fish, and turtles in a beautiful garden setting.",
          "placeImageUrl": "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
          "geoCoordinates": {
            "latitude": 36.1169,
            "longitude": -115.1695
          },
          "ticketPricing": "Free",
          "timeToTravel": "Varies depending on your hotel location. It's center-strip.",
          "bestTimeToVisit": "Morning (9 AM - 11 AM) when the animals are more active.",
          "duration": "30-45 minutes"
        },
        {
          "placeName": "The Venetian Grand Canal Shoppes",
          "placeDetails": "Window shop as you stroll through a stunning recreation of Venice, complete with canals, gondolas (rides are expensive), and a painted sky ceiling. It's a beautiful place to walk around for free.",
          "placeImageUrl": "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
          "geoCoordinates": {
            "latitude": 36.1216,
            "longitude": -115.1695
          },
          "ticketPricing": "Free to walk through.",
          "timeToTravel": "10-minute walk from the Flamingo.",
          "bestTimeToVisit": "Anytime",
          "duration": "1 - 1.5 hours"
        },
        {
          "placeName": "Fall of Atlantis Show at The Forum Shops",
          "placeDetails": "Located inside the Forum Shops at Caesars Palace, this is a free animatronic show with fire, water, and talking statues telling the myth of Atlantis. A fun, kitschy, and classic Vegas attraction.",
          "placeImageUrl": "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
          "geoCoordinates": {
            "latitude": 36.1171,
            "longitude": -115.1741
          },
          "ticketPricing": "Free",
          "timeToTravel": "10-minute walk from The Venetian.",
          "bestTimeToVisit": "Check for showtimes (typically run on the hour).",
          "duration": "15 minutes"
        },
        {
          "placeName": "LINQ Promenade",
          "placeDetails": "A lively outdoor district with dozens of shops and restaurants. It's a great place to grab a final cheap meal or a drink. The promenade leads to the High Roller observation wheel, which is beautiful to see even from the ground.",
          "placeImageUrl": "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png",
          "geoCoordinates": {
            "latitude": 36.1180,
            "longitude": -115.1690
          },
          "ticketPricing": "Free to walk through.",
          "timeToTravel": "5-minute walk from The Forum Shops.",
          "bestTimeToVisit": "Afternoon / Evening",
          "duration": "1 - 2 hours (flexible, depends on departure time)"
        }
      ]
    }
  ]
}
\`\`\``
        }
      ]
    },
     {
      role: "user",
      parts: [
        {
          text: inputText
        }
      ]
    }
  ];

  try {
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents
    });

    let result = "";
    for await (const chunk of response) {
      result += chunk.text;
    }
    return result;
  } catch (error) {
    if (error?.response?.status === 429 || error?.message?.includes("429")) {
      throw new Error("You have exceeded your Gemini API quota. Please wait and try again later.");
    }
    throw error;
  }
}

