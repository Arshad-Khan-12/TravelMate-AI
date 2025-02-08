
# TravelMate AI

An intelligent, AI-driven travel assistant that crafts customized itineraries tailored to your unique preferences
## About

TravelMate AI is a revolutionary web application designed to simplify your travel planning. By harnessing advanced artificial intelligence, the app generates bespoke itineraries based on your interests, budget, and schedule. Whether you're looking for adventure, relaxation, or cultural exploration, TravelMate AI adapts to your needs and provides real-time recommendations throughout your journey.




## Core Features

- AI-Driven Itinerary Planning: Generate personalized travel plans based on your preferences.
- Budget Management: Get detailed cost estimates and optimize your spending.
- Local Recommendations: Discover must-visit spots, restaurants, and cultural events.
- Group Trip Planning: Collaborate with others to create shared itineraries.
- Real-Time Updates: Receive live notifications and updates for your trip.
## Demo

https://travelmate-ai.netlify.app/


## Screenshots

![image](https://github.com/user-attachments/assets/cc0f0124-42f7-41b0-a997-36c037e814e8)

## Technology Stack

- **Frontend:** Vite, React, Tailwind CSS, ShadCN UI
- **Backend:** Firebase, Gemini API
- **Other Tools:** Axios, Sonner, Netlify

---
# Installation & Setup

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** (or yarn)
- **Firebase CLI** (optional, for backend management)

## Installation Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your_username/travelmate-ai.git
   cd travelmate-ai

2. **Install Dependencies:**

   ```bash
    npm install



3. **Run the Project Locally:**

    ```bash 
    npm run dev


## Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_GOOGLE_API_KEY=your_google_api_key_here
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
```
## API / Integration Details

### APIs Used

- **Gemini API:**  
  - **Purpose:** Generates AI-driven travel recommendations and personalized itineraries.  
  - **Usage:** The backend sends user preferences to the Gemini API to produce custom travel plans.

- **Google OAuth & Google Maps API:**  
  - **Google OAuth:**  
    - **Purpose:** Authenticates users securely using their Google accounts.  
    - **Usage:** Integrated into the sign-in process to ensure safe and streamlined user authentication.
  - **Google Maps API:**  
    - **Purpose:** Displays maps, locates destinations, and provides directions.  
    - **Usage:** Used on the frontend to render interactive maps and location details for trip planning.

- **Firebase:**  
  - **Purpose:** Handles user authentication and stores trip data.  
  - **Usage:** The backend leverages Firebase for data persistence and real-time updates.


