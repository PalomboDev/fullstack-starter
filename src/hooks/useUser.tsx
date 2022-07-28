import type { User } from "@prisma/client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function useUser(): User | null {
    const { data: session } = useSession();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (session && session.user) {
            setUser(session.user as User);
        }
    }, [session]);

    return user;
}