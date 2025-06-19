import { z } from "zod";
import { AIClient } from "./";
import { expect, test, vi, describe } from "vitest";
import type { ResponseInput } from "openai/resources/responses/responses";

// Mock the entire 'openai' module
vi.mock("openai", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      responses: {
        parse: vi.fn().mockResolvedValue({
          output_parsed: { final_answer: { title: "test", reused: true } },
        }),
      },
    })),
  };
});

const testSchema = z.object({
  title: z.string(),
  reused: z.boolean(),
});
test("should succeed if an api key is provided", () => {
  const client = new AIClient("1234567890");
  expect(client).toBeDefined();
});

describe("query", async () => {
  const client = new AIClient("12345");

  const input: ResponseInput = [{ content: "thus is a test", role: "user" }];
  test("should call the openai api", async () => {
    const result = await client.query(input, testSchema);
    expect(result).toEqual(
      expect.objectContaining({
        output_parsed: expect.any(Object),
      })
    );
  });
});
