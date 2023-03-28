import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    var data = JSON.stringify({
      apiKey: process.env.OPENAI_API_KEY,
      sessionId: req.body.sessionId,
      content: req.body.content,
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      headers: { "Content-Type": "application/json" },
      url: "https://api.openai-proxy.com/pro/chat/completions",

      data: data,
    };
    axios(config)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        res.status(404);
        console.log(error);
      });
    // Process a POST request
  } else {
    res.status(200).json({ name: "Reid" });
    // Handle any other HTTP method
  }
}
