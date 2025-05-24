// import type { MealPlan } from "~/db/schema";

// export class MealPlanService {
//   // todo move all DB stuff to repository
//   private DB: DB;

//   constructor(DB: DB) {
//     this.DB = DB;
//   }

//   async getById(id: string): Promise<MealPlan | null> {
//     // TO DO: implement logic to retrieve a meal plan by ID
//     // For now, return a mock meal plan
//     return {
//       id,
//       userId: "1",
//       weekStartDate: new Date(),
//       mealIds: [],
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//   }

//   async create(mealPlan: MealPlan): Promise<MealPlan> {
//     // Implement logic to create a new meal plan
//     const result = await this.DB.query(
//       "INSERT INTO meal_plans (user_id, week_start_date, meal_ids) VALUES ($1, $2, $3) RETURNING *",
//       [mealPlan.userId, mealPlan.weekStartDate, mealPlan.mealIds]
//     );
//     return result.rows[0];
//   }

//   async update(id: string, mealPlan: MealPlan): Promise<MealPlan> {
//     // Implement logic to update an existing meal plan
//     const result = await this.DB.query(
//       "UPDATE meal_plans SET user_id = $1, week_start_date = $2, meal_ids = $3 WHERE id = $4 RETURNING *",
//       [mealPlan.userId, mealPlan.weekStartDate, mealPlan.mealIds, id]
//     );
//     return result.rows[0];
//   }

//   async delete(id: string): Promise<void> {
//     // Implement logic to delete a meal plan
//     await this.DB.query("DELETE FROM meal_plans WHERE id = $1", [id]);
//   }

//   async getMealPlansByUser(userId: string): Promise<MealPlan[]> {
//     // Implement logic to retrieve a list of meal plans for a specific user
//     const mealPlans = await this.DB.query<MealPlan>(
//       "SELECT * FROM meal_plans WHERE user_id = $1",
//       [userId]
//     );
//     return mealPlans.rows;
//   }

//   async accept(id: string): Promise<MealPlan> {
//     // TO DO: implement logic to accept a meal plan
//     // For now, return the meal plan with an updated status
//     const mealPlan = await this.getById(id);
//     if (!mealPlan) {
//       throw new Error("Meal plan not found");
//     }
//     mealPlan.status = "accepted";
//     return mealPlan;
//   }

//   async getAll(page: number, pageSize: number): Promise<MealPlan[]> {
//     // TO DO: implement logic to retrieve a list of meal plans with pagination
//     // For now, return a mock list of meal plans
//     const mealPlans = [
//       {
//         id: "1",
//         userId: "1",
//         weekStartDate: new Date(),
//         mealIds: [],
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         id: "2",
//         userId: "1",
//         weekStartDate: new Date(),
//         mealIds: [],
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ];
//     return mealPlans.slice(page * pageSize, (page + 1) * pageSize);
//   }
// }
