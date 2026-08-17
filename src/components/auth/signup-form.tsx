'use client'
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { signUpSchema } from "@/lib/schemas/auth/signUpSchema"
import { Controller, } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"

import { Loader2 } from "lucide-react"
import { useDebounceCallback } from 'usehooks-ts'
import { signIn } from "next-auth/react"
import { useSignupForm } from "@/domains/auth/hooks/useSignupForm"
import { useCheckUsername } from "@/domains/auth/hooks/useCheckUsername"
import { useSignupMutation } from "@/domains/auth/hooks/useSignupMutation"


export function SignupForm() {

  const form = useSignupForm()

  const [username, setUsername] = useState("");

  const debounced = useDebounceCallback(setUsername, 300);

  const {
    data,
    isFetching: isCheckUsername,
  } = useCheckUsername(username);

  const usernameAvailable = data?.success;

  const signUpMutation = useSignupMutation({ form })

  const { isPending } = signUpMutation;

  // Form submission handler
  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    signUpMutation.mutate(data)
  }

  return (
    <div className="w-full px-4 sm:px-6">
      <div className="mx-auto w-full max-w-md rounded-xl bg-background shadow-sm">
        <form
          id="form-rhf-signup"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full"
        >
          <FieldGroup className="space-y-3">
            <div className="mb-2 text-center">
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Create your account
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Fill in the form below to create your account
              </p>
            </div>

            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="username">
                    Username
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      id="username"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                      placeholder="John Doe"
                      autoComplete="username"
                      className="h-10 pr-10"
                    />

                    {isCheckUsername && (
                      <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
                    )}
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                  <p
                    className={
                      usernameAvailable
                        ? "text-sm text-green-600"
                        : "text-sm text-red-600"
                    }
                  >
                    {data?.message}
                  </p>
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">
                    Email
                  </FieldLabel>

                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="john@example.com"
                    autoComplete="email"
                    className="h-10"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>

                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
                    autoComplete="new-password"
                    className="h-10"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Field orientation="horizontal" className="pt-1">
              <Button
                type="submit"
                className="h-10 w-full"
                disabled={isPending}
              >
                {isPending && (
                  <Loader2 className="size-4 animate-spin" />
                )}

                {isPending ? "Creating Account..." : "Create Account"}
              </Button>
            </Field>

            <FieldSeparator className="my-2">
              Or continue with
            </FieldSeparator>

            <Field>
              <Button
                variant="outline"
                type="button"
                onClick={() => signIn("github")}
                className="h-10 w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-4"
                >
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    fill="currentColor"
                  />
                </svg>

                <span>Sign up with GitHub</span>
              </Button>

              <FieldDescription className="px-2 text-center text-xs sm:px-6 sm:text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="font-medium underline underline-offset-4"
                >
                  Sign in
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}



