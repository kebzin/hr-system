"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ResetPasswordValidation } from "@/lib/validations/auth";
import { resetPassword } from "@/lib/actions/auth/reset-password";

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
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ResetForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetPasswordValidation>>({
    resolver: zodResolver(ResetPasswordValidation),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ResetPasswordValidation>) {
    // console.log(values)
    const loadingtoastId = toast.loading(
      "🚀 Hold tight! while we send you a reset password link"
    );

    startTransition(() => {
      resetPassword(values)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
            toast.dismiss(loadingtoastId);
          } else if (data?.success) {
            toast.success(data.error);
            toast.dismiss(loadingtoastId);
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
          <Link href={"/auth"}>
            <Button size={"icon"}>
              <ArrowLeft />
            </Button>
          </Link>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your email below to receive a reset password link
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="mail@cashup.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                size="lg"
                className="w-full mt-6"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Send reset email"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ResetForm;
