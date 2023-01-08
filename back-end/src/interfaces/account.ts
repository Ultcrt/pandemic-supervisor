export interface AccountInfo {
    id: string,
    password: string,
    type: AccountType
}

export enum AccountType {
    Student,
    Admin
}