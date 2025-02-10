/*

Completion Service is a wrapper around the Chat GPT API
It is responsible for initialising the chat gpt client, making requests and handling errors

*/


const completion = await openai.chat.completions.create({
  messages: [
    {
      role: "user",
      content: prompt,
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

