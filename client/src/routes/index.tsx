import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { client } from "../../trpc";

// fixme
export const useOnboardingAction = routeAction$(
  async (data) => {
    client.healthcheck.query();

    return {
      success: true,
      data,
    };
  }
  // zod$({
  //   peopleCount: z.number().min(1).max(10),
  //   dietaryPreferences: z.array(z.string()),
  //   allergies: z.array(z.string()),
  //   cuisinePreferences: z.array(z.string()),
  // })
);

export default component$(() => {
  const action = useOnboardingAction();


  return (
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">AI Meal Planner</h1>

      <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold mb-6">Let's Get Started</h2>

        <Form action={action} class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              How many people are you cooking for?
            </label>
            <input
              type="number"
              name="peopleCount"
              min="1"
              max="10"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Dietary Preferences
            </label>
            <div class="mt-2 space-y-2">
              {[
                "Vegetarian",
                "Vegan",
                "Pescatarian",
                "Gluten-Free",
                "Dairy-Free",
              ].map((pref) => (
                <label key={pref} class="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    name="dietaryPreferences"
                    value={pref}
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="ml-2">{pref}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Any allergies?
            </label>
            <input
              type="text"
              name="allergies"
              placeholder="e.g., nuts, shellfish (comma separated)"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Cuisine Preferences
            </label>
            <div class="mt-2 space-y-2">
              {["Italian", "Mexican", "Asian", "Mediterranean", "American"].map(
                (cuisine) => (
                  <label key={cuisine} class="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      name="cuisinePreferences"
                      value={cuisine}
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="ml-2">{cuisine}</span>
                  </label>
                )
              )}
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Generate Meal Plan
          </button>
        </Form>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "AI Meal Planner",
  meta: [
    {
      name: "description",
      content: "Get personalized meal plans powered by AI",
    },
  ],
};
