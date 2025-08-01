import { component$ } from "@builder.io/qwik";
import { auth } from "../auth";

export const LogOutButton = component$(() => {
  return (
    <button
      onClick$={async () => {
        await auth.signOut();
        window.location.href = "/login"; //TODO centralise route definition
      }}
      class="btn mt-4"
    >
      Logout
    </button>
  );
});
