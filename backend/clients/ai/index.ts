/*

AI client is a wrapper around the Chat GPT API
It is responsible for initialising the chat gpt client, making requests and handling errors
*/
import { OpenAI } from "openai";

// : process.env.OPENAI_API_KEY

export class AIClient {
  private openai: any;

  constructor(apiKey: string) {
    //how do node apps handle env variables - inline or injected into constructor
    this.openai = this.openai = new OpenAI({
      apiKey,
    });
  }

  async query(prompt: string): Promise<string> {
    try {
      const response = await this.openai.createCompletion({
        model: "text-davinci-003", // which model and why?
        prompt,
        max_tokens: 2048,
        temperature: 0.7,
        top_p: 1,
        presence_penalty: 0,
        frequency_penalty: 0,
      });

      const completion = response.data.choices[0].text;
      return completion;
    } catch (error) {
      console.error(`Error querying ChatGPT API: ${error.message}`);
      throw new Error(`Error querying ChatGPT API: ${error.message}`);
    }
  }
}



// const completion = await openai.chat.completions.create({
//   messages: [
//     {
//       role: "user",
//       content: prompt, //passed in
//     },
//   ],
//   model: "gpt-4",
//   response_format: { type: "json_object" },
// });

// // handle errors
// if (
//   !completion ||
//   !completion.choices ||
//   !completion.choices[0] ||
//   !completion.choices[0].message ||
//   !completion.choices[0].message.content
// ) {
//   throw new Error("nope");
// }
