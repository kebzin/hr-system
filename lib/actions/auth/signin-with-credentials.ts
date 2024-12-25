"use server";

import { z } from "zod";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { routes } from "@/routes";
import connectDB from "@/lib/db";

import { SignInValidation } from "@/lib/validations/auth";
import User from "@/lib/models/auth.model";

type SignInInput = z.infer<typeof SignInValidation>;

export const signInWithCredentials = async (
  values: SignInInput,
  callbackUrl?: string | null
) => {
  // console.log({callbackUrl})
  const validatedFields = SignInValidation.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  await connectDB();

  const existingUser = await User.findOne({ email });
  // console.log({existingUser})

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }
  if (!existingUser.password) {
    return {
      error: "Password is not being set yet. please reset your password",
    };
  }
  const passwordsMatch = await bcrypt.compare(password, existingUser.password);
  // if password do not match
  if (!passwordsMatch) {
    return { error: "Invalid password!" };
  }

  // if (!existingUser.emailVerified) {
  //   const verificationToken = await generateToken({
  //     email: existingUser.email,
  //   });
  //   // console.log({verificationToken})

  //   await sendVerificationEmail(existingUser.email, verificationToken);

  //   // const verificationToken = await generateVerificationToken(existingUser.email)

  //   // await sendVerificationEmail(
  //   //   verificationToken.email,
  //   //   verificationToken.token
  //   // )

  //   return { success: "Confirmation email sent!" };
  // }

  // if (existingUser.isTwoFactorEnabled && existingUser.email) {
  //   if (code) {
  //     const twoFactorToken = await TwoFactorToken.findOne({
  //       email: existingUser.email,
  //     });

  //     if (!twoFactorToken || twoFactorToken.token !== code) {
  //       return { error: "Invalid code!" };
  //     }

  //     const hasExpired = new Date(twoFactorToken.expires) < new Date();

  //     await TwoFactorToken.findByIdAndDelete(twoFactorToken._id);

  //     if (hasExpired) {
  //       return { error: "Code expired!" };
  //     }

  //     const existingConfirmation = await TwoFactorConfirmation.findOne({
  //       userId: existingUser._id,
  //     });

  //     if (existingConfirmation) {
  //       await TwoFactorConfirmation.findByIdAndDelete(existingConfirmation._id);
  //     }

  //     const twoFactorConfirmation = new TwoFactorConfirmation({
  //       userId: existingUser._id,
  //     });
  //     await twoFactorConfirmation.save();
  //   } else {
  //     const twoFactorToken = await generateCode(existingUser.email);
  //     // console.log({twoFactorToken})

  //     await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken);

  //     // const twoFactorToken = await generateTwoFactorToken(existingUser.email)

  //     // await sendTwoFactorTokenEmail(
  //     //   twoFactorToken.email,
  //     //   twoFactorToken.token
  //     // )

  //     return { twoFactor: true };
  //   }
  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
    });
    return { url: callbackUrl || routes.defaultLoginRedirect };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
