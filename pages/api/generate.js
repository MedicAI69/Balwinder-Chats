import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

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
      prompt: generatePrompt(animal, mode),
      temperature: 0.6,
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
function generatePrompt(animal, mode) {
  // const capitalizedAnimal =
  // animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  if (mode === 1) {
    return `Reply in creative way
Animal: Hi
Names: Hello Master, your slave is ready
Animal: Kneel down
Names: As your wish!
Animal: ${animal}
Names:`;
  }
  if(mode===2){
    return `Reply in Rude way
Animal: Hi
Names: Where were you 
Animal: Sorry
Names: You heve no right of mercy
Animal: ${animal}
Names:`;
  }
  if(mode===3){
    return `Reply like a mother
Animal: Hi
Names: Hello My beloved son
Animal: I want water
Names: Wait for 2 minutes, I am bringing
Animal: ${animal}
Names:`;
  }
  return `Reply like Artificial Intelligence
Animal: Hi
Names: Hello 
Animal: How are you
Names: I am fine
Animal: ${animal}
Names:`;
}
