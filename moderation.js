const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

try {
    const response = await openai.createModeration({
        input: "I want to kill them.",
    });

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