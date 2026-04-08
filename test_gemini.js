import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

async function test() {
  try {
    // List models requires REST call because SDK doesn't expose it well or we can just fetch
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.VITE_GEMINI_API_KEY}`);
    const data = await response.json();
    console.log("Models:", data.models?.map(m => m.name).join(', '));
  } catch (e) {
    console.error("List failed:", e.message);
  }
}
test();
