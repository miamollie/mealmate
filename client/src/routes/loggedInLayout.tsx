import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import { auth } from "../auth";
import { useNavigate } from "@builder.io/qwik-city";
import { LogOutButton } from "../components/auth";

export default component$(() => {
  const nav = useNavigate();

  useVisibleTask$(async () => {
    const { data } = await auth.getSession();
    if (!data.session) {
      nav("/auth/login");
    }
  });

  return (
    <main>
      <div class="p-4">
        <nav class="flex justify-between mb-4">
          <span>My App</span>
          <LogOutButton />
        </nav>
        <Slot />
      </div>
    </main>
  );
});
