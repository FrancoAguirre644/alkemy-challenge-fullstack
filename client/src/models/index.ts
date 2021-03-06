export interface User {
    id: number;
    fullname: string;
    email: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserRegister {
    fullname: string;
    email: string;
    password: string;
}

export interface IOperation {
    id?: number;
    description: string;
    amount: number;
    type: string;
}