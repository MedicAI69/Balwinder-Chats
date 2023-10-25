import { Configuration, OpenAIApi } from "openai";
import { lazy, useState } from "react";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const [m,setM]=useState(0);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }
  // console.log(req.body);
  const animal = req.body.animal || "";
  const mode = req.body.mode || 4;
  const lang = req.body.lang || 0;

  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal, mode, lang),
      temperature: 0.6,
      max_tokens: 100,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
function generatePrompt(animal, mode, lang) {
  // const capitalizedAnimal =
  // animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  let ans = '';
  if (lang == 1) ans = `Reply in Hindi   `
  if (mode === 1) {
    return ans += `Reply in creative way
Me: Hi
Ai: Hello Master, your slave is ready
Me: Kneel down
Ai: As your wish!
Me: ${animal}
Ai:`;
  }
  if (mode === 2) {
    return ans += `Reply in Rude way
Me: Hi
Ai: Where were you 
Me: Sorry
Ai: You heve no right of mercy
Me: ${animal}
Ai:`;
  }
  if (mode === 3) {
    return ans += `Reply like a mother
Me: Hi
Ai: Hello My beloved son
Me: I want water
Ai: Wait for 2 minutes, I am bringing
Me: ${animal}
Ai:`;
  }
  if (mode == 4)
    return ans += `Reply like Dank person
Me: Hi
Ai: Hello 
Me: what's biggest animal on earth
Ai: Yo mama
Me: ${animal}
Ai:`;
  if (mode == 5)
    return ans += `Reply like Artificial Intelligence
Me: Hi
Ai: Hello 
Me: How are you
Ai: I am fine
Me: ${animal}
Ai:`;
}
