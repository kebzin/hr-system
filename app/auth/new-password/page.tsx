"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { NewPasswordValidation } from "@/lib/validations/auth";
import { newPassword } from "@/lib/actions/auth/new-password";

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
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordValidation>>({
    resolver: zodResolver(NewPasswordValidation),
    defaultValues: {
      newPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof NewPasswordValidation>) {
    // console.log(values)
    const loadingtoastId = toast.loading(
      "🚀 Hold tight! while we reset your passwor"
    );

    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
            toast.dismiss(loadingtoastId);
          } else if (data?.success) {
            toast.success(data.success);
            toast.dismiss(loadingtoastId);
            router.replace("/auth");
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
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below to reset your account password
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          type="password"
                          placeholder="new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          type="password"
                          placeholder="confirm password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <FormError message={error} />
          <FormSuccess message={success} /> */}
              <Button
                size="lg"
                className="w-full mt-6"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Reset password"}
              </Button>
            </form>
            <Button variant={"link"}>SignIn</Button>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default NewPasswordForm;
