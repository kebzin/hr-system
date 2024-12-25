// import bcrypt from "bcryptjs"
import * as bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { SignInValidation } from "@/lib/validations/auth";
import { fetchUserByEmail } from "@/lib/api-handler/user";

import { RoleTypes } from "@/types/role";

export default {
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth", // app/signin
    error: "/error", // app/error
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInValidation.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const existingUser = await fetchUserByEmail(email);
          // console.log({existingUser})

          if (!existingUser || !existingUser.password) return null;
          console.log("pass checking for the password");

          const passwordsMatch = await bcrypt.compare(
            password,
            existingUser.password
          );
          console.log("pass compairing  for the password");

          existingUser.password = "";

          // console.log({user})
          if (passwordsMatch) return existingUser;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // console.log({user})
      // console.log({account, profile})
      // if (account && account?.provider !== "credentials" && profile) {
      //   return await signInWithOauth({ account, profile });
      // }

      if (account?.provider === "credentials" && user._id) {
        // const existingUser = await fetchUserById(user._id);
        // console.log({existingUser})
        // console.log("start checking for the  credential");
        // if (!existingUser?.emailVerified) return false;
        // if (existingUser?.isTwoFactorEnabled) {
        //   const twoFactorConfirmation = await fetchConfirmationByUserId(
        //     existingUser._id
        //   );
        //   if (!twoFactorConfirmation) return false;
        //   await deleteConfirmationById(twoFactorConfirmation._id);
        // }
      }

      return true;
    },
    async jwt({ token }) {
      // console.log({token})
      if (!token.email) return token;

      const existingUser = await fetchUserByEmail(token.email);

      if (!existingUser) return token;

      // console.log({existingUser})
      token._id = existingUser._id;
      token.name = existingUser.firstName;
      token.email = existingUser.email;
      token.role = existingUser.role as RoleTypes;

      return token;
    },
    async session({ session, token }) {
      // console.log({session, token})
      if (token._id && session.user) {
        session.user._id = token._id as string;
        session.user.name = token.firstName as string;
        session.user.email = token.email as string;
        session.user.role = token.role as RoleTypes;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
