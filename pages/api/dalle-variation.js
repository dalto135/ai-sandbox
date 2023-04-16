import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const fs = require('fs');

export default async function (req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
        error: {
            message: "OpenAI API key not configured, please follow instructions in README.md",
        }
        });
        return;
    }

    const image = req.body.image || "public/solarpunk.png";
    if (image.trim().length === 0) {
        res.status(400).json({
        error: {
            message: "Please enter a valid image location",
        }
        });
        return;
    }

    const imageNumber = Number(req.body.imageNumber) || 1;
    if (imageNumber == 0) {
        res.status(400).json({
        error: {
            message: "Please select an image number",
        }
        });
        return;
    }

    const imageSize = req.body.imageSize || "256x256";
    if (imageSize == "") {
        res.status(400).json({
        error: {
            message: "Please select an image size",
        }
        });
        return;
    }

    try {
        const response = await openai.createImageVariation(
            fs.createReadStream(image),
            imageNumber,
            imageSize
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
