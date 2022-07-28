import type { AppRouter } from "@server/router";
import type { AppType } from "next/dist/shared/lib/utils";

import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import { AuthableNextPageType } from "@lib/client/authable-next-page";
import { getBaseUrl } from "@utils/app";
import { Auth } from "@components/auth";

import superjson from "superjson";

const App: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {
    // @ts-ignore
    const authable: AuthableNextPageType | undefined = Component.auth;

    return (
        <SessionProvider session={session}>
            {authable ? (
                <Auth authable={authable}>
                    <Component {...pageProps} />
                </Auth>
            ) : (
                <Component {...pageProps} />
            )}
        </SessionProvider>
    );
};

export default withTRPC<AppRouter>({
    config({ ctx }) {
        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/ssr
         */
        const url = `${getBaseUrl()}/api/trpc`;

        return {
            url,
            transformer: superjson,
            /**
             * @link https://react-query.tanstack.com/reference/QueryClient
             */
            // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
        };
    },
    /**
     * @link https://trpc.io/docs/ssr
     */
    ssr: false,
})(App);
