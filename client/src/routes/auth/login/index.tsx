import { component$, useSignal, $ } from "@builder.io/qwik";
import { auth } from "../../../auth";
import { useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const email = useSignal("");
  const password = useSignal("");
  const errorMsg = useSignal("");
  const nav = useNavigate();

  const handleLogin = $(async () => {
    const { error } = await auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      errorMsg.value = error.message;
    } else {
      errorMsg.value = "";
      nav("/home"); // redirect on success
    }
  });

  return (
    <div class="max-w-sm mx-auto mt-12">
      <h1 class="text-xl font-bold mb-4">Log In</h1>
      <input
        type="email"
        placeholder="Email"
        bind:value={email}
        class="input mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        bind:value={password}
        class="input mb-2 w-full"
      />
      <button onClick$={handleLogin} class="btn w-full">
        Log In
      </button>
      {errorMsg.value && <p class="text-red-500 mt-2">{errorMsg.value}</p>}
    </div>
  );
});
