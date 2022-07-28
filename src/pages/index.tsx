import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
    const { data, isLoading } = trpc.useQuery([
        "example.hello",
        { text: "from tRPC" },
    ]);

    return (
        <>
           
        </>
    );
};

export default Home;
