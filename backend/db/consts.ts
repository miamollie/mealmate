import { z } from "zod";

const DAYCOUNT = z.number().min(0).max(6).default(0);
const CUISINE = z.enum(["indian", "vietnamese", "italian", "greek", "mexican"]);
const SPICE = z.enum(["low", "medium", "high"]);
const ALLERGY = z.enum(["peanuts", "eggs", "gluten", "soy", "dairy"]);
const DIETARY = z.enum([
  "vegetarian",
  "vegan",
  "kosher",
  "fodmap",
  "halal",
  "paleo",
]);
const DIFFICULTY = z.enum(["easy", "medium", "hard"]);

export { DAYCOUNT, CUISINE, SPICE, ALLERGY, DIETARY, DIFFICULTY };