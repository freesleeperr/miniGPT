import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const allowRegins = [
    "localhost:3000",
    "https://mini-gpt-peach.vercel.app",
    "https://mini-gpt-snowy.vercel.app",
  ];
  const reqOrigin = req.headers.origin;

  for (const value in allowRegins) {
    if (reqOrigin === value) {
      res.setHeader("Access-Control-Allow-Origin", reqOrigin);
    } else {
      res.setHeader(
        "Access-Control-Allow-Origin",
        "https://mini-gpt-snowy.vercel.app"
      );
    }
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
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
    res.status(200).json({ meg: "connect" });
    // Handle any other HTTP method
  }
}
