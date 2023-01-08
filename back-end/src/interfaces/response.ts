export interface IResponse {
    status: ResponseStatus,
    data?: any
}

export enum ResponseStatus {
    SUCCESS,
    FAIL
}