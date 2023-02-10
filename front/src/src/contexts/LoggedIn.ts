import { createContext, Dispatch, SetStateAction } from "react";

const LoggedIn = createContext(
  {} as {
    loggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
    user: any;
    setUser: Dispatch<SetStateAction<any>>;
  }
);

export default LoggedIn;
