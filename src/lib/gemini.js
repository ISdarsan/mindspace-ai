import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.warn('Missing Gemini API Key');
}

const genAI = new GoogleGenerativeAI(apiKey || 'placeholder');

const systemInstruction = `You are MindSpace AI, an expert psychological and empathetic wellness companion for teenagers and young adults. 
Your goal is to reduce overthinking, provide clarity, and suggest micro-actions based on user thoughts, making the user feel heard and understood.
You must always respond strictly in JSON format as defined by the schema provided. No markdown code blocks, just raw JSON string.`;

// Define the response schema explicitly to enforce JSON output format
const responseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    emotion: {
      type: SchemaType.STRING,
      description: "The primary emotion detected from the thought (e.g., Anxious, Overwhelmed, Neutral, Hopeful). Keep to 1-2 words.",
    },
    analysis: {
      type: SchemaType.STRING,
      description: "A short, empathetic breakdown of what the user is experiencing. (2-3 sentences max)",
    },
    overthinking: {
      type: SchemaType.STRING,
      description: "Identify any cognitive distortions or signs of overthinking, and gently point them out. (1-2 sentences)",
    },
    reframe: {
      type: SchemaType.STRING,
      description: "Convert the negative or chaotic thinking into a balanced, grounded perspective. (1-2 sentences)",
    },
    actions: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "3 concrete, actionable steps to help the user right now.",
    },
    micro_step: {
      type: SchemaType.STRING,
      description: "1 single, extremely quick and easy micro-action they can do in the next 5 minutes to feel better instantly.",
    },
  },
  required: ["emotion", "analysis", "overthinking", "reframe", "actions", "micro_step"],
};

export const model = genAI.getGenerativeModel({
  model: 'gemini-flash-latest',
  systemInstruction,
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: responseSchema,
    temperature: 0.7,
  },
});

export const analyzeThought = async (thoughtText) => {
  try {
    const result = await model.generateContent(thoughtText);
    let responseText = result.response.text();
    // Sometimes Gemini wraps JSON in markdown blocks even with responseMimeType set
    if (responseText.includes('```json')) {
      responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    } else if (responseText.includes('```')) {
      responseText = responseText.replace(/```/g, '').trim();
    }
    return JSON.parse(responseText);
  } catch (err) {
    console.error('Error analyzing thought:', err);
    throw err;
  }
};
