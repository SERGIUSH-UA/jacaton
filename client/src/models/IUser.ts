export interface IUser {
    id: number;
    name: string;
    email: string;
}

export interface IUserAuth {
    email: string;
    password: string;
}

export interface IUserRegister {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface IToken {
    token: string;
}