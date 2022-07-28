import { createRouter } from "./context";
import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";

import superjson from "superjson";

export const appRouter = createRouter()
    .transformer(superjson)
    .merge("example.", exampleRouter)
    .merge("question.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
