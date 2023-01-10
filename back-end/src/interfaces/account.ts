// 账户数据
export interface AccountInfo {
    id: string,
    password: string,
    type: AccountType
}

// 账户种类
export enum AccountType {
    Student,
    Admin
}