import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { LoginSchema } from "./schemas/schemas";
import { prisma } from "./utils/prismaClient";

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

        const user = await prisma.user.findUnique({
            where: {
              email: validatedData.data.email,
            },
          });

        if (!user || !user.password) {
          console.error("User does not exist");
          return null;
        }

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
