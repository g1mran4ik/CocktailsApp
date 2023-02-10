import { useContext } from "react";
import LoggedIn from "../contexts/LoggedIn";

export const setToken = (token: string) => localStorage.setItem('cocktailToken', token)

export const removeToken = () => localStorage.removeItem('cocktailToken');

export const checkToken = () => !!localStorage.getItem('cocktailToken');

export default function useLoggedIn() {
    const {loggedIn, setLoggedIn, user, setUser} = useContext(LoggedIn);
    
    const setTokenAndLogin = (token: string) => {
        setToken(token);
        setLoggedIn(true);
    }

    const deleteTokenAndLogout = () => {
        removeToken();
        setLoggedIn(false);
    }

    return {loggedIn, setTokenAndLogin, deleteTokenAndLogout, user, setUser}
}