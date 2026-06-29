'use client';

import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import Link from 'next/link';
import { IoEyeOffOutline } from 'react-icons/io5';
import { IoEyeOutline } from 'react-icons/io5';
import { signIn, signUp } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { signInSchema } from '../authSchema';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailSignInPending, startEmailSignInPending] = useTransition();
  const [googleSignInPending, startGoogleSignInPending] = useTransition();
  const [githubSignInPending, startGithubSignInPending] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isFormLoading =
    emailSignInPending || googleSignInPending || githubSignInPending;

  function onSubmit(values) {
    startEmailSignInPending(async () => {
      await signUp.email({
        ...values,
        callbackURL: '/',
        fetchOptions: {
          onSuccess: () => {
            form.reset();
            toast.success('Signed in successful');
            router.push('/');
          },
          onError: (ctx) => {
            toast.error(ctx.error.message ?? 'An error occurred!');
          },
        },
      });
    });
  }

  const handleGoogleSignIn = () => {
    startGoogleSignInPending(async () => {
      await signIn.social({
        provider: 'google',
        callbackURL: '/',
        fetchOptions: {
          onSuccess: () => {
            form.reset();
            toast.success('Signed in successful');
            router.push('/');
          },
          onError: (ctx) => {
            toast.error(ctx.error.message ?? 'An error occurred!');
          },
        },
      });
    });
  };

  const handleGithubSignIn = () => {
    startGithubSignInPending(async () => {
      await signIn.social({
        provider: 'github',
        callbackURL: '/',
        fetchOptions: {
          onSuccess: () => {
            form.reset();
            toast.success('Signed in successful');
            router.push('/');
          },
          onError: (ctx) => {
            toast.error(ctx.error.message ?? 'An error occurred!');
          },
        },
      });
    });
  };

  return (
    <div className="flex-1 bg-card sm:px-10 px-5 py-10 flex flex-col justify-center relative">
      {isFormLoading && (
        <div className="absolute flex items-center justify-center w-full h-full left-0 top-0">
          <Spinner className="size-6 text-muted-foreground" />
        </div>
      )}

      <div
        className={cn(
          'w-full mx-auto',
          isFormLoading && 'opacity-30 pointer-events-none',
        )}
      >
        <h2 className="text-xl font-semibold text-center">Sign In Account</h2>
        <p className="text-muted-foreground text-sm text-center mt-1 mb-6">
          Enter your personal data to sign in your account.
        </p>

        {/* OAuth Buttons */}
        <div className="flex gap-3 mb-5">
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            variant="outline"
            className="flex-1 !bg-transparent text-sm gap-2 h-auto py-2 rounded-md hover:!bg-muted-foreground/10"
          >
            {/* Google Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          <Button
            type="button"
            onClick={handleGithubSignIn}
            variant="outline"
            className="flex-1 !bg-transparent text-sm gap-2 h-auto py-2 rounded-md hover:!bg-muted-foreground/10"
          >
            {/* GitHub Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Github
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-muted" />
          <span className="text-muted-foreground text-xs">Or</span>
          <div className="flex-1 h-px bg-muted" />
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="example@gmail.com"
                    autoComplete="off"
                    className="rounded-md h-auto py-2 px-4"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Password
                  </FieldLabel>
                  <div className="flex items-center justify-center relative w-full">
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="********"
                      autoComplete="off"
                      className="rounded-md h-auto py-2 px-4"
                    />
                    <button
                      type="button"
                      className="absolute right-3 cursor-pointer text-muted-foreground hover:text-primary"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button type="submit" className="w-full h-auto py-2 rounded-full">
            Sign In
          </Button>
        </form>

        <p className="text-center text-muted-foreground text-xs mt-5">
          Don&apos;t have an account?{' '}
          <Link
            href="/sign-up"
            className="text-primary font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
