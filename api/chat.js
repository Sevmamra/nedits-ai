// This is the serverless function that will run on Vercel
const { OpenAI } = require('openai'); // OpenAI SDK use karenge kyunki DeepSeek ka API iske format se compatible hai

// Initialize OpenAI with the API key from Vercel's environment variables
const openai = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY, // Aapko ye variable Vercel par set karna hoga
    baseURL: 'https://api.deepseek.com/v1' // DeepSeek ka custom URL
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { messages } = req.body;
        
        const completion = await openai.chat.completions.create({
            model: "deepseek-chat", // DeepSeek ka model name
            messages: messages,
            stream: false,
        });

        const responseText = completion.choices[0].message.content;
        res.status(200).json({ response: responseText });

    } catch (error) {
        console.error("Error calling DeepSeek API:", error);
        res.status(500).json({ message: "An error occurred while processing your request." });
    }
}
