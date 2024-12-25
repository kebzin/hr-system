import SendPasswordResetLinkTemplate from "@/components/emailTemplate/SendPasswordResetLinkTemplate";
import { v4 as uuidv4 } from "uuid";

import { Resend } from "resend";
import { PasswordResetToken } from "../models/auth.model";
import connectDB from "../db";
const resend = new Resend(process.env.RESEND_API_KEY);
const baseURL = process.env.NEXT_PUBLIC_APP_URL;

// using resend to send the password reset link
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${baseURL}/auth/new-password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["honorablewaiga@gmail.com"],
    subject: " password reset",
    react: SendPasswordResetLinkTemplate({ data: { resetLink, email } }),
  });
  // check if the email reset link is succesfull or not
  if (error) {
    return { error: error.message };
  }

  console.log("Email sent: ", data);
  return { success: "Password reset sent successfully" };
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 60 * 60 * 1000); // 1 hour

  await connectDB();

  await PasswordResetToken.deleteOne({ email });

  const passwordResetToken = new PasswordResetToken({
    email,
    token,
    expires,
  });

  await passwordResetToken.save();

  return { ...passwordResetToken._doc, _id: passwordResetToken._id.toString() };
};
