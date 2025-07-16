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

Step 1: Correct the location to a full, properly formatted version using real-world geography. Example: "munar, kerala, tamil nadu" → "Munnar, Kerala, India"

Step 2: Generate a valid JSON object with the following **3 top-level keys only**:
1. "correctedLocation": A string of the corrected location.
2. "hotels": An array of 2–5 real, verified hotels near the corrected location. Each hotel object must include:
   - "hotelName"
   - "hotelAddress"
   - "price": Price per night as a string (e.g., "₹1500 per night", "₹2500 - ₹3500")
   - "rating"
   - "description"
   - "geoCoordinates": { "lat": number, "lng": number }

3. "itinerary": An object with keys "day1", "day2", ..., up to the number of days (${noOfDays}). Each day must include:
   - "morning", "afternoon", and "evening" keys (required).
   - Each time slot is an object with:
     - "startTime" (e.g., "08:00 AM")
     - "endTime"
     - "placeName" (real place/activity)
     - "placeDetails" (what the user will do)
     - "geoCoordinates": { "lat": number, "lng": number }
     - "address" (real-world full address)
     - "ticketPricing" (e.g., "₹50 per person", "Free")
     - "bestTimeToVisit" (e.g., "Morning", "Afternoon", "Evening")
     - "timeToTravel" (e.g., "10 minutes from XYZ")
     - "nextSuggestedAction" (what to do after)

Rules:
- All fields are mandatory. Never return N/A or empty fields.
- If no sightseeing is suitable, suggest an alternative like a museum, food break, cultural activity, or cafe visit.
- Use only verified, real-world places with accurate coordinates and realistic descriptions.
- Do not include markdown, explanations, or non-JSON formatting in your output.
- All strings and keys must use double quotes.
- Output must be a **valid, clean JSON object only**, nothing else.

Return only the valid raw JSON.
`;

    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let text = response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (
      !text ||
      text.includes("503") ||
      text.toLowerCase().includes("unavailable")
    ) {
      throw new Error(
        "Gemini API is overloaded or returned an empty response."
      );
    }

    let cleaned = text
      .replace(/```json|```/g, "")
      .replace(/\/\/.*(?=[\n\r])/g, "")
      .replace(/,\s*([}\]])/g, "$1")
      .replace(/^\s*[\r\n]/gm, "")
      .trim();

    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start === -1 || end === -1 || start >= end) {
      throw new Error("Response does not contain a valid JSON object.");
    }

    const jsonOnly = cleaned.slice(start, end + 1);

    try {
      return JSON.parse(jsonOnly);
    } catch (parseError) {
      console.error("JSON PARSE ERROR:\n", parseError.message);
      console.error("Raw Response:\n", text);
      console.error("Cleaned JSON:\n", jsonOnly);
      throw new Error("Invalid JSON structure in Gemini response.");
    }
  } catch (err) {
    console.error("Gemini Error:", err);
    throw new Error(
      err.message.includes("503")
        ? "Gemini API is currently overloaded. Please try again in a few minutes."
        : "Failed to generate a valid trip response."
    );
  }
};
