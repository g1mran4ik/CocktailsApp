import { LoginFormValues } from "../../components/interface";
import { API_ENPOINTS } from "../../constants/endpoints";
import { get, post } from "../../http";

const { CREATE_ACCOUNT, LOGIN, LOGOUT, USER_ME, VALIDATE_USERNAME } = API_ENPOINTS

export const postUserAccount = (data: LoginFormValues) =>
    post(CREATE_ACCOUNT, data).then((response) => response.data);

export const login = (data: LoginFormValues) =>
    post(LOGIN, data).then((response) => response.data.auth_token);

export const logout = () => 
    post(LOGOUT, {}).then((response) => response.data)

export const userMe = (token: { token: string }) =>
    get(USER_ME).then((response) => response.data);

export const postUsername = (username: string) =>
    post(VALIDATE_USERNAME, { username }).then((response) => response.data);
