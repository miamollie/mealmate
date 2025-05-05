/*

AI client is a wrapper around the Chat GPT API
It is responsible for initialising the chat gpt client, making requests and handling errors
*/
import { OpenAI } from "openai";

type Message = {
  role: string;
  content: string;
};

export class AIClient {
  private openai: any;

  constructor(apiKey: string) {
    this.openai = this.openai = new OpenAI({
      apiKey,
    });
  }

  async query(messages: Message[]): Promise<string> {
    try {
      const response = await this.openai.createCompletion({
        model: "text-davinci-003", // document which model and why? gpt-4? gpt-3.5-turbo for cost control
        messages,
        // max_tokens: 2048, // Use max_tokens cap (e.g. 800–1200) cost limiting

        // temperature: 0.7,
        // top_p: 1,
        // presence_penalty: 0,
        // frequency_penalty: 0,
        // response_format ?
      });

      const completion = response.data.choices[0].text; // why always 0?

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
      return completion;
    } catch (error: any) {
      throw new Error(`Error querying ChatGPT API: ${error.message}`);
    }
  }
}
