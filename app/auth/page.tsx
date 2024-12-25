"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SignInValidation } from "@/lib/validations/auth";
import { signInWithCredentials } from "@/lib/actions/auth/signin-with-credentials";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
// import { FormError } from "@/components/shared/form-error";
// import { FormSuccess } from "@/components/shared/form-success";
// import { FormWrapper } from "@/components/shared/form-wrapper";

const SignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    // console.log(values)
    const loadingtoastId = toast.loading(
      "🚀 Hold tight! while we validate your credentials"
    );

    startTransition(() => {
      signInWithCredentials(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
            toast.dismiss(loadingtoastId);
          } else if (data?.success) {
            toast.success(data.success);
            toast.dismiss(loadingtoastId);
          } else if (data?.url) {
            window.location.assign(data?.url);
          }
        })
        .catch(() => {
          toast.dismiss(loadingtoastId);
          toast.error("Something went wrong");
        });
    });
  }

  return (
    <section className="w-full max-w-sm h-[100vh] flex justify-center items-center m-auto">
      {" "}
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your email below to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                {showTwoFactor && (
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Two Factor Code</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            placeholder="123456"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {!showTwoFactor && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder="mail@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              type="password"
                              placeholder="your password"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            size="sm"
                            variant="link"
                            asChild
                            className="px-0 font-normal"
                          >
                            <Link href="/auth/reset">Forgot password?</Link>
                          </Button>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>

              <Button
                size="lg"
                className="w-full mt-6"
                type="submit"
                disabled={isPending}
              >
                {isPending
                  ? "Submitting..."
                  : showTwoFactor
                  ? "Confirm"
                  : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>

    // </FormWrapper>
  );
};

export default SignInForm;
