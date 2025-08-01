import { component$, useSignal, $ } from "@builder.io/qwik";
import { auth } from "../../../auth";

export default component$(() => {
  const email = useSignal("");
  const password = useSignal("");
  const errorMsg = useSignal("");
  const successMsg = useSignal("");

  const handleSignup = $(async () => {
    const { error } = await auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      errorMsg.value = error.message;
      successMsg.value = "";
    } else {
      successMsg.value =
        "Signup successful! Check your email for confirmation.";
      errorMsg.value = "";
    }
  });

  return (
    <div class="max-w-sm mx-auto mt-12">
      <h1 class="text-xl font-bold mb-4">Sign Up</h1>
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
      <button onClick$={handleSignup} class="btn w-full">
        Sign Up
      </button>
      {errorMsg.value && <p class="text-red-500 mt-2">{errorMsg.value}</p>}
      {successMsg.value && (
        <p class="text-green-500 mt-2">{successMsg.value}</p>
      )}
    </div>
  );
});
