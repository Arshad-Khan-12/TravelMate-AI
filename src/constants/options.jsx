export const SelectTravelsList = [
  {
    id: 1,
    title: "Solo",
    desc: "Traveling alone",
    icon: "👤",
    people: "1 person",
  },
  {
    id: 2,
    title: "Couple",
    desc: "Traveling with partner",
    icon: "👫",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    desc: "Traveling with family",
    icon: "👪",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "Traveling with friends",
    icon: "👬",
    people: "6 or more people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💰",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Balanced experience",
    icon: "💸",
  },
  {
    id: 3,
    title: "Expensive",
    desc: "Go all out",
    icon: "💵",
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format";
