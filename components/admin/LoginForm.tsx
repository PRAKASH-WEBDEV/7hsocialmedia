"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";
import GoldButton from "@/components/ui/GoldButton";
import { Field, field } from "./ui";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="space-y-5">
      <Field label="Email">
        <input name="email" type="email" required autoComplete="username" defaultValue={state?.email} key={state?.email} className={field} />
      </Field>
      <Field label="Password">
        <input name="password" type="password" required autoComplete="current-password" className={field} />
      </Field>
      {state?.error && <p role="alert" className="text-sm text-red-400">{state.error}</p>}
      <GoldButton type="submit" disabled={pending} className="w-full">
        {pending ? "Signing in…" : "Sign In"}
      </GoldButton>
    </form>
  );
}
