"use client";

import { useFormState } from "react-dom";

import classes from "./page.module.css";
import { signInAction } from "@/lib/actions";
import LoginButtonSubmit from "@/components/login/login-button-submit";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [state, formAction] = useFormState(signInAction, { message: null });

  if (state.status === "Success") {
    redirect("/");
  }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Login With <span className={classes.highlight}>your account</span>
        </h1>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <p>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </p>

          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <LoginButtonSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
