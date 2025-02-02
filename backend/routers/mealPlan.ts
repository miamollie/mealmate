import { OpenAI } from 'openai';
import { z } from 'zod';
import { mealSchema, userSchema, type Meal } from '../../db/schema';
import { publicProcedure, router } from '../trpc';



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});



export const mealPlanRouter = router({
  generateMealPlan: publicProcedure

  // should be getting this info from the stored user profile
    .input(z.object({
      peopleCount: z.number().min(1),
      dietaryPreferences: z.array(z.string()),
      allergies: z.array(z.string()),
      cuisinePreferences: z.array(z.string()),
    }))
    .mutation(async ({ input, ctx }) => {
      // move to a completion client package
      // Generate meal suggestions using ChatGPT
      const prompt = `Generate a week of dinner recipes for ${input.peopleCount} people.
        Dietary preferences: ${input.dietaryPreferences.join(', ')}
        Allergies to avoid: ${input.allergies.join(', ')}
        Preferred cuisines: ${input.cuisinePreferences.join(', ')}
        
        Please provide 7 recipes in JSON format. Each recipe should include:
        {
          name: string,
          description: string,
          ingredients: string[],
          instructions: string[],
          prepTime: number (in minutes),
          cookTime: number (in minutes),
          servings: number,
          difficulty: "easy" | "medium" | "hard",
          cuisine: string,
          category: string[],
          keyIngredients: string[]
        }`;

      const completion = await openai.chat.completions.create({
        messages: [{ 
          role: 'user', 
          content: prompt 
        }],
        model: 'gpt-4',
        response_format: { type: "json_object" }
      });

      // handle errors
      if (!completion || !completion.choices || !completion.choices[0] || !completion.choices[0].message || !completion.choices[0].message.content) {
        throw new Error("nope");
      }

      const meals = JSON.parse(completion.choices[0].message.content).meals as Meal[];

      // Save user preferences
      const { data: user } = await supabase
        .from('users')
        .insert({
          email: ctx.user.email,
          peopleCount: input.peopleCount,
          dietaryPreferences: input.dietaryPreferences,
          allergies: input.allergies,
          cuisinePreferences: input.cuisinePreferences,
        })
        .select()
        .single();

      // Return generated meals without saving them
      return {
        suggestedMeals: meals,
        userId: user.id
      };
    }),

  acceptMeal: t.procedure
    .input(z.object({
      meal: mealSchema,
      weekDay: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
      mealPlanId: z.string().uuid().optional()
    }))
    .mutation(async ({ input, ctx }) => {
      // Save the accepted meal
      const { data: savedMeal } = await supabase
        .from('meals')
        .insert({
          name: input.meal.name,
          description: input.meal.description,
          ingredients: input.meal.ingredients,
          instructions: input.meal.instructions,
          prep_time: input.meal.prepTime,
          cook_time: input.meal.cookTime,
          servings: input.meal.servings,
          difficulty: input.meal.difficulty,
          cuisine: input.meal.cuisine,
          category: input.meal.category,
          key_ingredients: input.meal.keyIngredients,
        })
        .select()
        .single();

      if (!savedMeal) {
        throw new Error('Failed to save meal');
      }

      // If mealPlanId is provided, update existing meal plan
      if (input.mealPlanId) {
        const { data: existingPlan } = await supabase
          .from('meal_plans')
          .select('meal_ids')
          .eq('id', input.mealPlanId)
          .single();

        if (existingPlan) {
          const updatedMealIds = existingPlan.meal_ids.map((entry: any) => 
            entry.day === input.weekDay 
              ? { ...entry, mealId: savedMeal.id }
              : entry
          );

          await supabase
            .from('meal_plans')
            .update({ meal_ids: updatedMealIds })
            .eq('id', input.mealPlanId);

          return { savedMeal, mealPlanId: input.mealPlanId };
        }
      }

      // Create new meal plan if none exists
      const { data: newMealPlan } = await supabase
        .from('meal_plans')
        .insert({
          user_id: ctx.user.id,
          week_start_date: new Date(),
          meal_ids: [{
            day: input.weekDay,
            mealId: savedMeal.id,
          }],
        })
        .select()
        .single();

      return {
        savedMeal,
        mealPlanId: newMealPlan.id
      };
    }),

  


  getMealPlan: t.procedure
    .input(z.object({
      mealPlanId: z.string().uuid(),
    }))
    .query(async ({ input }) => {
      const { data: mealPlan } = await supabase
        .from('meal_plans')
        .select('*, meals(*)')
        .eq('id', input.mealPlanId)
        .single();

      if (!mealPlan) {
        throw new Error('Meal plan not found');
      }

      return mealPlan;
    }),

  
});