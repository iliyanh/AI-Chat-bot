import axios from "axios";

export default async function handler(req, res) {
    const key = process.env.OPENAI_API_KEY;

    if (req.method !== "POST") {
        res.status(405).json({ message: "This endpoint only accepts POST requests." })
    }
    try {
        const { body } = req;
        const url = "https://api.openai.com/v1/chat/completions";
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
        };

        const response = axios.post(url, body, { headers: headers })
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" })
    }



}
