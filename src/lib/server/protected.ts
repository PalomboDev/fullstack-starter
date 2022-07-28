import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { User } from "@prisma/client";

import { prisma } from "@server/db/client";
import { authOptions } from "@pages/api/auth/[...nextauth]";
import { Session, unstable_getServerSession as getServerSession } from "next-auth";

// Will return local session user by default
export async function protectedServerSideProps(context: GetServerSidePropsContext, redirect?: string, source?: string, permanent?: boolean, fetchUser?: boolean, props?: any): Promise<GetServerSidePropsResult<any>> {
    const session: Session | null = await getServerSession(context.req, context.res, authOptions);
    let user: User | null = null;

    if (session !== null) {
        user = session.user as User;

        if (fetchUser) {
            user = await prisma.user.findUnique({
                where: {
                    id: user.id
                }
            });
        }
    }

    if (user === null) {
        return {
            redirect: {
                destination: redirect ?? "/api/auth/signin",
                permanent: permanent ?? false,
            }
        }
    }

    if (props) {
        if (!props["user"]) {
            props["user"] = user;
        }

        return {
            props
        }
    }

    return {
        props: {
            user
        }
    };
}