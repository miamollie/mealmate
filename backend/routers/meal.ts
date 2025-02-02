
  saveLikedMeal: t.procedure
    .input(z.object({
      mealId: z.string().uuid(),
    }))
    .mutation(async ({ input, ctx }) => {
      // First, check if the meal exists
      const { data: meal } = await supabase
        .from('meals')
        .select()
        .eq('id', input.mealId)
        .single();

      if (!meal) {
        throw new Error('Meal not found');
      }

      // Add to user's liked meals
      const { data: likedMeal, error } = await supabase
        .from('user_liked_meals')
        .insert({
          user_id: ctx.user.id,
          meal_id: input.mealId,
        })
        .select()
        .single();

      if (error) {
        throw new Error('Failed to save liked meal');
      }

      return likedMeal;
    }),
    searchMeals: t.procedure
    .input(z.object({
      cuisine: z.string().optional(),
      difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
      maxPrepTime: z.number().optional(),
      maxCookTime: z.number().optional(),
      category: z.array(z.string()).optional(),
      keyIngredients: z.array(z.string()).optional(),
    }))
    .query(async ({ input }) => {
      let query = supabase.from('meals').select('*');

      if (input.cuisine) {
        query = query.eq('cuisine', input.cuisine);
      }
      if (input.difficulty) {
        query = query.eq('difficulty', input.difficulty);
      }
      if (input.maxPrepTime) {
        query = query.lte('prep_time', input.maxPrepTime);
      }
      if (input.maxCookTime) {
        query = query.lte('cook_time', input.maxCookTime);
      }
      if (input.category) {
        query = query.contains('category', input.category);
      }
      if (input.keyIngredients) {
        query = query.contains('key_ingredients', input.keyIngredients);
      }

      const { data: meals } = await query;
      return meals;
    }),
}