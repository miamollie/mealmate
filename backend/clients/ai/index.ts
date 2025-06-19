/*
AI client is a wrapper around the OpenAI Chat GPT API
It is responsible for initialising the chat gpt client, making requests and handling errors
*/
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import type { ResponseInput } from "openai/resources/responses/responses";

export class AIClient {
  private client;
  private model: string;

  constructor(apiKey: string) {
    this.client = new OpenAI({
      apiKey,
    });

    this.model = "gpt-4o-2024-08-06";
    //Which model to use? OpenAI GPT-4o
    // Supports function calling + JSON mode, making structured output easy.
    // Has strong natural language understanding to balance reuse and diversity.
    // Can reason over prior liked meals if given via context.
  }

  async query(input: ResponseInput, responseSchema: any): Promise<any> {
    try {
      console.log("input: ", input);
      const r = await this.client.responses.parse({
        model: this.model,
        input,
        max_output_tokens: 1000, // ?   todo pick a good value
        text: {
          format: zodTextFormat(responseSchema, "response"),
        },
      });



      console.log(r.output_parsed);
      console.log("answer: ", r.output_parsed?.final_answer);
      // catch any issues with the response
      // if (r.choices[0].message.refusal !== "") {
      //   throw new Error(r.choices[0].refusal);
      // }
      return r;
    } catch (error: any) {
      throw new Error(`Error querying ChatGPT API: ${error.message}`);
    }
  }
}
