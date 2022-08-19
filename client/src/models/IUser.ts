export interface IUser {
    id: number;
    name: string;
    email: string;
    role: string;
    parish: string;
    bio: string;
    img: string;
    city: string;
    isActivated: boolean;
    teamId: number;
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