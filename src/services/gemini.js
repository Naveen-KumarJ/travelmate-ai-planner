import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const getTripPlan = async ({
  location,
  noOfDays,
  traveller,
  budget,
}) => {
  try {
    const prompt = `
You are a helpful and detail-oriented travel assistant.

The user may input a misspelled or incomplete location.

User Input:
- Location: ${location}
- Number of Days: ${noOfDays}
- Travel Type: ${traveller}
- Budget: ${budget}

---

🧭 Step 1: Correct the location to a full, properly formatted version using real-world geography (e.g., "munar, kerala, tamil nadu" → "Munnar, Kerala, India").

---

🧳 Step 2: Generate a realistic 3-part JSON object with only the following top-level keys:

1. "correctedLocation": The corrected and formatted location string.

2. "hotels": An array of 2 to 5 real, verified hotels in or near the corrected location. Only use popular or well-reviewed hotels. Each hotel object must contain:
   - "hotelName"
   - "hotelAddress"
   - "price"
   - "rating"
   - "description"
   - "hotelImageUri"
   - "geoCoordinates": { "lat": ..., "lng": ... }

3. "itinerary": An object with keys like "day1", "day2", ..., based on the number of days (${noOfDays}). Each day must contain:

- **morning**, **afternoon**, and **evening** keys — all three must be present for every day.

- If a sightseeing spot is not available for a time slot, recommend a **valid alternate activity** like visiting a museum, exploring local markets, enjoying a cultural show, or relaxing at a popular cafe. Do **not** leave any field blank or say "N/A".

Each section must include:
- "startTime" (e.g., "08:00 AM")
- "endTime" (e.g., "11:30 AM")
- "placeName" (real, popular location or activity)
- "placeDetails" (what the user will see/do)
- "placeImageUri" (Wikimedia Commons, Unsplash, Pexels — no placeholders)
- "geoCoordinates": { "lat": ..., "lng": ... }
- "address" (full, real-world address)
- "ticketPricing" (e.g., "₹50 per person" or "Free")
- "bestTimeToVisit" (e.g., "Morning")
- "timeToTravel" (e.g., "15 minutes from Hotel ABC")
- "nextSuggestedAction" (a meaningful suggestion for what to do next)

🚫 Avoid vague phrases like "some place", "a village", or "a nearby restaurant".

✅ Each field must be complete and realistic for all time slots on every day.

⚠️ Mandatory Rule: Do not skip any of morning, afternoon, or evening for any day. If a sightseeing location is not suitable, provide a meaningful alternative such as a food break, cultural activity, museum visit, or relaxation spot.
    

---

📌 Important Rules:
- Output must be valid raw JSON (no markdown).
- Use real, specific, tourist-friendly data.
- No vague words like “some temple” or “a hotel”.
- All coordinates must be accurate.
- Use only public image links (Wikimedia/Unsplash/Pexels).

📌 Output Format:
A JSON object with:
- correctedLocation
- hotels
- itinerary
`;

    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("No content received from Gemini.");

    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Gemini Error:", err);
    throw new Error("Failed to parse Gemini response.");
  }
};
