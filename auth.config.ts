import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { LoginSchema } from "./schemas/schemas";
import { prisma } from "./utils/prismaClient";
import bcryptjs from "bcryptjs";

export default {
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const validatedData = LoginSchema.safeParse(credentials);

        if (!validatedData.success) {
          console.error("Invalid credentials", validatedData.error.message);
          return null;
        }

        // const user = await getUserByEmail(validatedData.data.email);
        // was getting error from this ^

        const userExists = await prisma.user.findUnique({
          where: {
            email: validatedData.data.email,
          },
        });

        if (!userExists || !userExists.password) {
          console.error("User does not exist");
          return null;
        }

        const isPasswordCorrect = await bcryptjs.compare(
          validatedData.data.password,
          userExists.password,
        );

        if (!isPasswordCorrect) {
          console.error("Incorrect password");
          return null;
        }

        const { password, ...userWithoutPassword } = userExists;

        return userWithoutPassword;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
