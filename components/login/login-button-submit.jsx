"use client";

import { useFormStatus } from "react-dom";

export default function LoginButtonSubmit() {
  const { pending } = useFormStatus();

  return <button disabled={pending}>{pending ? "Submitting" : "Login"}</button>;
}
