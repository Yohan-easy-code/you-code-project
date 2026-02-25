import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/env";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
      authorization: { params: { scope: "read:user user:email" } },
    }),
  ],
  secret: env.AUTH_SECRET,
  session: { strategy: "database" },

  callbacks: {
    async session({ session, user }) {
      if (!session.user) return session;

      session.user.id = user.id;

      // récupère le role depuis la DB (propre et typed)
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true },
      });

      session.user.role = dbUser?.role ?? "USER";

      return session;
    },
  },
});
