import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const prompt = req.body.prompt || "Name 10 outdoor activies to do in Columbus, Ohio.";
  if (prompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt",
      }
    });
    return;
  }

  const temperature = req.body.temperature || 1;
  if (!Number(temperature) && Number(temperature) != 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid temperature (0-2).",
      }
    });
  
    return;
  }
  if (temperature < 0 || temperature > 2) {
    res.status(400).json({
      error: {
        message: "Temperature must be between 0 and 2.",
      }
    });
  
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(prompt),
      // suffix: null,
      max_tokens: 200,
      temperature: Number(temperature),
      // top_p: 1,
      // n: 1,
      // stream: false,
      // logprobs: null,
      // echo: false,
      // stop: null,
      // presence_penalty: 0,
      // frequency_penalty: 0,
      // best_of: 1,
      // logit_bias: null, // Not working
      // user: "user"
    });

    function getText(response) {
      return response.text;
    }
    let response = completion.data.choices.map(getText)
    res.status(200).json({ result: response });
    console.log(response);
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(prompt) {
  const capitalizedPrompt = prompt[0].toUpperCase() + prompt.slice(1).toLowerCase();

  // return `
  //   Suggest three names for an animal that is a superhero.
  //   Animal: Cat
  //   Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
  //   Animal: Dog
  //   Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
  //   Animal: ${capitalizedPrompt}
  //   Names:
  // `;
  return capitalizedPrompt;
}
