
/*

Recommendation Service takes user preferences and responds with recommended meals
It is responsible for fetching users preferences, and calling the completion client

*/

const meals = JSON.parse(completion.choices[0].message.content).meals as Meal[];
