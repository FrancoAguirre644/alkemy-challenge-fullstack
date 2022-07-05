export interface User {
    id: number;
    fullname: string;
    email: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}