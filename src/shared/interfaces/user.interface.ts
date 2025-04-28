export interface User {
    id: string;
    username?: string;
    role?: number;
    password?: string;
    can_login?: boolean;
    locked?: boolean;
}