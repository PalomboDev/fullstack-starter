import { NextRouter, useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { AuthableNextPageType } from "../../lib/client/authable-next-page";
import { UseSessionOptions } from "next-auth/react/types";

type AuthProps = {
    authable: AuthableNextPageType;
    children: JSX.Element;
};

export default function Auth({ authable, children }: AuthProps): JSX.Element {
    const router: NextRouter = useRouter();
    const sessionOptions: UseSessionOptions<any> = {
        required: true
    };

    if (authable.unauthorizedRedirect) {
        console.log("1")
        sessionOptions.onUnauthenticated = () => {
            if (authable.unauthorizedRedirect) {
                router
                    .push(authable.unauthorizedRedirect)
                    .catch(console.error);
            }
        };
    }

    const { status } = useSession(sessionOptions);

    if (status === "loading") {
        if (authable.loadingElement) {
            return (
                authable.loadingElement
            );
        }

        return (
            <>
                Loading...
            </>
        );
    }

    return children;
}