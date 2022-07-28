import { NextComponentType, NextPageContext } from "next/dist/shared/lib/utils";

export declare type AuthableNextPageType = {
    // role: string;
    loadingElement?: JSX.Element;
    unauthorizedRedirect?: string;
};

export declare type AuthableNextPage<P = {  }, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    auth?: AuthableNextPageType;
};