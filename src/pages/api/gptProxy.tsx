import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "POST") {
    var data = JSON.stringify({
      apiKey: req.body.key,
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
    console.log(data);
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
