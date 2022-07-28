import type { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import type { User } from "@prisma/client";

import { protectedServerSideProps } from "@lib/server/protected";

type ServerSideProps = {
    hello: string;
    user: User;
};

// This page uses protectedServerSideProps which will check if the user's session
// is valid and optionally refetch the user from the database. If the user's session
// is invalid it will by default redirect them to the sign-in page, or you can pass
// a custom redirect url.

// You can assume that the user prop will almost always be NOT null.
const ServerSide: NextPage<ServerSideProps> = ({ hello, user }) => {
    if (!user) {
        return null;
    }

    return (
        <>
            Server Side Protected - {hello} - {user.name}
        </>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ServerSideProps>> {
    return protectedServerSideProps(context, undefined, "/protected/server-side", false, true, {
        hello: "world"
    });
}

export default ServerSide;
