import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@server/db/client";
import { env } from "../../../env/server.mjs";

import NextAuth, { type NextAuthOptions } from "next-auth";

import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    // Include user.id on session
    callbacks: {
        async session({ session, token, user }) {
            if (session.user) {
                session.user.id = user.id;
            }

            return session;
        },
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: env.GITHUB_ID,
            clientSecret: env.GITHUB_SECRET
        })
    ],
};

export default NextAuth(authOptions);
