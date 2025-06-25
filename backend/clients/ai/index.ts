/*
AI client is a wrapper around the OpenAI Chat GPT API
It is responsible for initialising the chat gpt client, making requests and handling errors
*/
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import type { ResponseInput } from "openai/resources/responses/responses";
import type { ZodTypeAny } from "zod";

export class AIClient {
  private client;
  private model: string;

  constructor(apiKey: string) {
    this.client = new OpenAI({
      apiKey,
    });

    this.model = "gpt-4o-2024-08-06";
    // Why this model? OpenAI GPT-4o
    // Supports function calling + JSON mode, making structured output easy.
    // Has strong natural language understanding to balance reuse and diversity.
    // Can reason over prior liked meals if given via context.
  }

  async query(
    input: ResponseInput,
    responseSchema: ZodTypeAny
  ): Promise<ZodTypeAny> {
    try {
      console.log("input: ", input);
      const r = await this.client.responses.parse({
        model: this.model,
        input,
        max_output_tokens: 1000, // TODO pick a good value
        text: {
          format: zodTextFormat(responseSchema, "response"),
        },
      });

      if (r.error !== undefined) {
        throw new Error("Model responded with an error");
      }

      if (r.output_parsed?.final_answer === undefined) {
        throw new Error("Model did not respond with a final answer");
      }

      if (r.status && ["failed", "incomplete"].includes(r.status)) {
        throw new Error("Model did not respond successfully");
      }

      return r.output_parsed?.final_answer;
    } catch (error: any) {
      throw new Error(`Error querying ChatGPT API: ${error.message}`);
    }
  }
}
