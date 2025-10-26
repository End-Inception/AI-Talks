import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));


const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async(req, res) => {
    const { message } = req.body;

    try{
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: message }],
        });

        const reply = completion.choices[0].message.content;
        res.json({ reply });
    }catch(error) {
        console.error("Error:", error);
        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));