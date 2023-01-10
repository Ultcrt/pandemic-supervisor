// API响应数据结构
export interface IResponse {
    status: ResponseStatus,
    data?: any
}

// API响应状态
export enum ResponseStatus {
    SUCCESS,
    FAIL
}