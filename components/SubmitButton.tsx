// components/SubmitButton.tsx

"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-green-400 to-cyan-400 px-6 py-4 text-black font-semibold"
    >
      {pending ? "Joining..." : "Join Waitlist"}
    </button>
  );
}