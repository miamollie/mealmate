/*

Completion Service is a wrapper around the Chat GPT API
It is responsible for initialising the chat gpt client, making requests and handling errors

*/

import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const completion = await openai.chat.completions.create({
  messages: [
    {
      role: "user",
      content: prompt, //passed in
    },
  ],
  model: "gpt-4",
  response_format: { type: "json_object" },
});

// handle errors
if (
  !completion ||
  !completion.choices ||
  !completion.choices[0] ||
  !completion.choices[0].message ||
  !completion.choices[0].message.content
) {
  throw new Error("nope");
}

