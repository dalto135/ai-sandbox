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

    const fs = require('fs');
    const image = req.body.image || "public/solarpunk.png";

    try {
        const response = await openai.createImageVariation(
            fs.createReadStream(image),
            1,
            "512x512"
        );

        function getUrl(image) {
            return image.url
        }

        res.status(200).json({ result: response.data.data.map(getUrl) });
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
