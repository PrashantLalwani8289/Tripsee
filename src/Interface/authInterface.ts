import {ReactNode} from "react"


export interface initialState {
    isAuthenticated: boolean;
    user:userData|null;
}

export interface userData{
    id: string;
    name: string;
    email: string;
    token: string;

}

export interface ProtectedRoutesProps {
    isAuthenticated: boolean;
    requiredPermissions: string;
    children?:ReactNode
}

export interface ILoginSchema{
    email?: string;
    password?: string;
}