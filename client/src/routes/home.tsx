import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { auth } from "../auth";

export default component$(() => {
  const nav = useNavigate();

  useVisibleTask$(async () => {
    const { data } = await auth.getSession();
    if (!data.session) {
      nav("/login"); //todo, centralise routes
    }
  });

  return (
    <div class="max-w-sm mx-auto mt-12">
      <h1 class="text-xl font-bold">Welcome to MealMate</h1>
      <p>Let's get cooking</p>
    </div>
  );
});
