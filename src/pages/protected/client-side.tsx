import type { AuthableNextPage } from "@lib/client/authable-next-page";
import type { User } from "@prisma/client";

import useUser from "../../hooks/useUser";

type ClientSideProps = {

};

// This page uses AuthableNextPage which will check if the user's session
// is valid and if it's not, auto redirect from this page to sign in.

// You can assume that useUser will almost always be NOT null.
const ClientSide: AuthableNextPage<ClientSideProps> = ({  }) => {
    const user: User | null = useUser();

    if (!user) {
        return null;
    }

    return (
        <>
            Client Side Protected - {user.name}
        </>
    );
};

ClientSide.auth = {
    loadingElement: <>Loading ClientSide...</>,
};

export default ClientSide;
