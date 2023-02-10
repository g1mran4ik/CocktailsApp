export interface LoginFormValues {
    username: string;
    password: string;
}

export interface CreateAccountFormValues extends LoginFormValues {
    confirmPassword: string;
}