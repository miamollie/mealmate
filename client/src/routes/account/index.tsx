import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="max-w-sm mx-auto mt-12">
      <h1 class="text-xl font-bold mb-4">My Account</h1>
      Hey "username"! You can manage your account settings here.
      <ul>
        <li>Edit your profile</li>
        <li>Manage your meal plans preferences</li>
        <li>Change recipe preferences</li>
        <li>Change your password</li>
        <li>Logout</li>
      </ul>
      <button
        onClick$={() => {
          // logic to pause meal plan creation
        }}
        class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
      >
        Pause Mealplans
      </button>
      <button
        onClick$={() => {
          // logic to pause meal plan creation
        }}
        class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
      >
        Update password
      </button>
    </div>
  );
});
