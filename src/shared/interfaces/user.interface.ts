export interface User {
    id?: string;
    username?: string;
    role?: string;
    password?: string;
    password_confirmation?: string;
    can_login?: boolean;
    locked?: boolean;
}