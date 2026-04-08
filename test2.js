import { analyzeThought } from './src/lib/gemini.js';

async function run() {
  try {
    const res = await analyzeThought("I am really stressed about work.");
    console.log("SUCCESS:", JSON.stringify(res, null, 2));
  } catch (err) {
    console.error("ERROR:", err);
  }
}

run();
