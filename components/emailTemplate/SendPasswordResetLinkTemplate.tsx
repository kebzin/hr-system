import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const SendPasswordResetLinkTemplate: React.FC<{
  data: { email: string; resetLink: string };
}> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          We&apos;ve received a request to reset your password for your account
          at
          {" " + data.email}. If you made this request, please follow the
          instructions below. If you didn&apos;t make this request, please
          disregard this email. Please click on the link below to reset your
          password. If you didn&apos;t request this password reset, please
          ignore this email.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground">
          Please click the link below to reset your password. This link will be
          valid for 24 hours. If you didn&apos;t request this password reset,
          please disregard this email.
        </p>
        <a href={data.resetLink}>Reset Password</a>
        <p className="mt-5">
          If you have any questions, please contact support at
          <a href="mailto:support@algose.dev">support@algos.dev</a>.
        </p>
        <p>Thank you for using CashUp!</p>
      </CardContent>
    </Card>
  );
};

export default SendPasswordResetLinkTemplate;
